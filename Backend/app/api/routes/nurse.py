from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.nurse import Nurse
from app.models.user import User
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin, require_staff, require_nurse
from app.utils.audit import log_action

router = APIRouter(prefix="/nurses", tags=["Nurses"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔴 ADMIN ONLY — CREATE NURSE
@router.post("/")
def create_nurse(
    user_id: str,
    specialization: str,
    years_experience: int,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db)
):
    # ✅ VALIDATE EXPERIENCE
    if years_experience < 0:
        raise HTTPException(status_code=400, detail="Invalid experience value")

    # ✅ VALIDATE USER EXISTS AND BELONGS TO TENANT
    target_user = db.query(User).filter(
        User.id == user_id,
        User.tenant_id == tenant.id
    ).first()

    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")

    if target_user.role != "nurse":
        raise HTTPException(status_code=400, detail="User is not a nurse")

    # ✅ PREVENT DUPLICATE NURSE PROFILE
    existing = db.query(Nurse).filter(
        Nurse.user_id == user_id,
        Nurse.tenant_id == tenant.id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Nurse already exists")

    nurse = Nurse(
        user_id=user_id,
        tenant_id=tenant.id,
        specialization=specialization,
        years_experience=years_experience
    )

    db.add(nurse)
    db.commit()
    db.refresh(nurse)

    # ✅ AUDIT LOG
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CREATE_NURSE",
        entity="NURSE",
        entity_id=nurse.id
    )

    return nurse


# 🟡 STAFF + ADMIN — VIEW ALL NURSES
@router.get("/")
def get_nurses(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db)
):
    nurses = db.query(Nurse).filter(
        Nurse.tenant_id == tenant.id
    ).all()

    result = []

    for n in nurses:
        user_obj = db.query(User).filter(User.id == n.user_id).first()

        result.append({
            "id": n.id,
            "full_name": user_obj.full_name,   # 🔥 ADD THIS
            "specialization": n.specialization
        })

    return result


# 🟢 NURSE — VIEW OWN PROFILE ONLY
@router.get("/me")
def get_my_nurse_profile(
    tenant=Depends(get_active_tenant),
    user=Depends(require_nurse),
    db: Session = Depends(get_db)
):
    nurse = db.query(Nurse).filter(
        Nurse.user_id == user.get("user_id"),
        Nurse.tenant_id == tenant.id
    ).first()

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse profile not found")

    return nurse