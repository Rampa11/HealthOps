from fastapi import APIRouter, Request, HTTPException
import stripe
import os
import logging

from app.db.session import SessionLocal
from app.models.tenant import Tenant
from app.utils.audit import log_action

router = APIRouter(prefix="/webhook", tags=["Webhook"])

logger = logging.getLogger(__name__)


@router.post("/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    if not endpoint_secret:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid Stripe signature")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")

    # ✅ HANDLE CHECKOUT COMPLETED
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        # 🔥 SAFE ACCESS
        customer_id = getattr(session, "customer", None)
        subscription_id = getattr(session, "subscription", None)
        payment_status = getattr(session, "payment_status", None)

        metadata = getattr(session, "metadata", {})
        tenant_id = metadata.get("tenant_id") if metadata else None

        db = SessionLocal()

        try:
            # ❌ Missing tenant_id
            if not tenant_id:
                logger.warning("No tenant_id in metadata")
                return {"status": "ignored"}

            # ❌ Payment not completed
            if payment_status != "paid":
                logger.warning(f"Payment not completed: {payment_status}")
                return {"status": "not_paid"}

            tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()

            # ❌ Tenant not found
            if not tenant:
                logger.error(f"Tenant not found: {tenant_id}")
                return {"status": "tenant_not_found"}

            # 🔁 Prevent duplicate processing
            if tenant.is_active:
                logger.info(f"Tenant {tenant_id} already active")
                return {"status": "already_active"}

            # ✅ ACTIVATE TENANT
            tenant.is_active = True
            tenant.stripe_customer_id = customer_id
            tenant.stripe_subscription_id = subscription_id

            db.commit()

            # ✅ AUDIT LOG
            log_action(
                db=db,
                tenant_id=tenant.id,
                user_id=None,  # webhook has no user context
                action="SUBSCRIPTION_ACTIVATED",
                entity="TENANT",
                entity_id=tenant.id,
            )

            logger.info(f"Tenant {tenant_id} activated successfully")

        finally:
            db.close()

    else:
        logger.info(f"Unhandled event type: {event['type']}")

    return {"status": "success"}
