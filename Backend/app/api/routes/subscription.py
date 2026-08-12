from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os

from app.core.stripe import stripe
from app.db.session import SessionLocal
from app.models.tenant import Tenant
from app.api.deps_roles import get_current_user
from app.utils.audit import log_action

router = APIRouter(prefix="/subscription", tags=["Subscription"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create-checkout-session")
def create_checkout_session(
    plan: str,
    user=Depends(get_current_user),  # 🔐 JWT payload
    db: Session = Depends(get_db),
):
    # 🔥 GET TENANT FROM DB
    tenant = db.query(Tenant).filter(Tenant.id == user.get("tenant_id")).first()

    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")

    # 🔒 OPTIONAL: BLOCK IF ALREADY ACTIVE
    if tenant.is_active:
        raise HTTPException(status_code=400, detail="Subscription already active")

    # 🔥 PLAN MAPPING
    price_map = {
        "starter": os.getenv("STRIPE_STARTER_PRICE_ID"),
        "growth": os.getenv("STRIPE_GROWTH_PRICE_ID"),
        "pro": os.getenv("STRIPE_PRO_PRICE_ID"),
    }

    price_id = price_map.get(plan.lower())

    if not price_id:
        raise HTTPException(status_code=400, detail="Invalid plan")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            # 🔐 SAFE TENANT LINK
            metadata={"tenant_id": tenant.id},
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )

        # ✅ AUDIT
        log_action(
            db=db,
            tenant_id=tenant.id,
            user_id=user.get("user_id"),
            action="CREATE_SUBSCRIPTION_SESSION",
            entity="SUBSCRIPTION",
            entity_id=tenant.id,
        )

        return {"url": session.url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
