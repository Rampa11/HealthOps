from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.session import SessionLocal
from app.models.user import User
from app.models.tenant import Tenant
from app.core.hash import verify_password
from app.core.security import create_access_token
from app.utils.audit import log_action

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ REQUEST SCHEMA
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ✅ LOGIN (SECURE + AUDIT)
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    # 🔥 FIND USER
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # 🔥 GET TENANT
    tenant = db.query(Tenant).filter(Tenant.id == user.tenant_id).first()

    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")

    # 🔒 BLOCK IF SUBSCRIPTION INACTIVE
    if not tenant.is_active:
        raise HTTPException(
            status_code=403,
            detail="Subscription inactive. Please subscribe."
        )

    # 🔥 CREATE TOKEN (WITH ROLE)
    token = create_access_token({
        "tenant_id": tenant.id,
        "user_id": user.id,
        "role": user.role
    })

    # ✅ AUDIT LOG
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.id,
        action="LOGIN",
        entity="AUTH",
        entity_id=user.id
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "is_active": tenant.is_active
    }