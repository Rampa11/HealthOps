from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.session import SessionLocal
from app.models.tenant import Tenant
from app.models.user import User
from app.core.hash import hash_password
from app.utils.audit import log_action

router = APIRouter(prefix="/tenants", tags=["Tenants"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ REQUEST SCHEMA
class TenantCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# ✅ CREATE TENANT (SIGNUP)
@router.post("/")
def create_tenant(data: TenantCreate, db: Session = Depends(get_db)):

    # 🔥 CHECK IF EMAIL EXISTS (TENANT)
    existing_tenant = db.query(Tenant).filter(
        Tenant.email == data.email
    ).first()

    if existing_tenant:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 🔥 CREATE TENANT (NO PASSWORD HERE)
    tenant = Tenant(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        is_active=False  # 🔐 must subscribe first
    )

    db.add(tenant)
    db.commit()
    db.refresh(tenant)

    # 🔥 CREATE ADMIN USER
    admin_user = User(
        tenant_id=tenant.id,
        full_name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="admin"
    )

    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)

    # ✅ AUDIT LOG
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=admin_user.id,
        action="CREATE_TENANT",
        entity="TENANT",
        entity_id=tenant.id
    )

    return {
        "tenant_id": tenant.id,
        "admin_user_id": admin_user.id,
        "email": admin_user.email,
        "is_active": tenant.is_active
    }


# 🔒 BLOCK PUBLIC TENANT LIST
@router.get("/")
def get_tenants():
    raise HTTPException(
        status_code=403,
        detail="Access not allowed"
    )