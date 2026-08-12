from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.session import SessionLocal
from app.models.user import User
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin, require_staff
from app.core.hash import hash_password
from app.utils.audit import log_action

router = APIRouter(prefix="/users", tags=["Users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ REQUEST SCHEMA
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str


# 🔴 ADMIN ONLY — CREATE USER
@router.post("/")
def create_user(
    data: UserCreate,
    tenant=Depends(get_active_tenant),  # 🔐 REQUIRED
    user=Depends(require_admin),  # 🔐 REQUIRED
    db: Session = Depends(get_db),
):
    existing = (
        db.query(User)
        .filter(User.email == data.email, User.tenant_id == tenant.id)
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        tenant_id=tenant.id,
        full_name=data.full_name,
        email=data.email,
        password=hash_password(data.password),  # 🔥 IMPORTANT
        role=data.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# 🟡 STAFF + ADMIN — GET USERS
@router.get("/")
def get_users(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    return db.query(User).filter(User.tenant_id == tenant.id).all()
