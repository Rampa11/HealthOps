from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.billing import Billing
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin
from app.utils.audit import log_action

router = APIRouter(prefix="/billing", tags=["Billing"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔴 ADMIN ONLY — VIEW ALL BILLS
@router.get("/")
def get_bills(
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return db.query(Billing).filter(Billing.tenant_id == tenant.id).all()


# 🔴 ADMIN ONLY — MARK AS PAID
@router.post("/{billing_id}/pay")
def pay_bill(
    billing_id: str,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    bill = (
        db.query(Billing)
        .filter(Billing.id == billing_id, Billing.tenant_id == tenant.id)  # 🔐 CRITICAL
        .first()
    )

    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    if bill.is_paid:
        raise HTTPException(status_code=400, detail="Bill already paid")

    bill.is_paid = True

    db.commit()
    db.refresh(bill)

    # ✅ AUDIT LOG
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="PAY_BILL",
        entity="BILLING",
        entity_id=bill.id,
    )

    return bill
