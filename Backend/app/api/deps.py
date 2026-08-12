from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.tenant import Tenant
from app.api.deps_roles import get_current_user


# 🔐 DB SESSION HANDLER
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ GET CURRENT TENANT (SAFE)
def get_current_tenant(user=Depends(get_current_user), db: Session = Depends(get_db)):
    tenant_id = user.get("tenant_id")

    if not tenant_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()

    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")

    return tenant


# ✅ ACTIVE TENANT CHECK
def get_active_tenant(tenant=Depends(get_current_tenant)):
    if not tenant.is_active:
        raise HTTPException(
            status_code=403, detail="Subscription inactive. Please subscribe."
        )
    return tenant
