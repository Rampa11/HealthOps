# app/api/routes/doctor.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.session import SessionLocal
from app.models.doctor import Doctor
from app.models.user import User
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin, require_staff, require_doctor
from app.utils.audit import log_action

router = APIRouter(prefix="/doctors", tags=["Doctors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class FeeUpdate(BaseModel):
    consultation_fee: float


# 🔴 ADMIN ONLY — CREATE DOCTOR
@router.post("/")
def create_doctor(
    user_id: str,
    specialization: str,
    years_experience: int,
    consultation_fee: float = 0.0,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    if years_experience < 0:
        raise HTTPException(status_code=400, detail="Invalid experience value")

    if consultation_fee < 0:
        raise HTTPException(status_code=400, detail="Invalid consultation fee")

    target_user = (
        db.query(User).filter(User.id == user_id, User.tenant_id == tenant.id).first()
    )

    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")

    if target_user.role != "doctor":
        raise HTTPException(status_code=400, detail="User is not a doctor")

    existing = (
        db.query(Doctor)
        .filter(Doctor.user_id == user_id, Doctor.tenant_id == tenant.id)
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Doctor already exists")

    doctor = Doctor(
        user_id=user_id,
        tenant_id=tenant.id,
        specialization=specialization,
        years_experience=years_experience,
        consultation_fee=consultation_fee,
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CREATE_DOCTOR",
        entity="DOCTOR",
        entity_id=doctor.id,
    )

    return doctor


# 🟡 STAFF + ADMIN — VIEW ALL DOCTORS
@router.get("/")
def get_doctors(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    doctors = db.query(Doctor).filter(Doctor.tenant_id == tenant.id).all()

    result = []

    for d in doctors:
        user_obj = db.query(User).filter(User.id == d.user_id).first()

        result.append(
            {
                "id": d.id,
                "full_name": user_obj.full_name,
                "specialization": d.specialization,
                "years_experience": d.years_experience,
                "consultation_fee": d.consultation_fee,
            }
        )

    return result


# 🟢 DOCTOR — VIEW OWN PROFILE
@router.get("/me")
def get_my_doctor_profile(
    tenant=Depends(get_active_tenant),
    user=Depends(require_doctor),
    db: Session = Depends(get_db),
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.user_id == user.get("user_id"), Doctor.tenant_id == tenant.id)
        .first()
    )

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    return doctor


# 🟢 DOCTOR — UPDATE OWN CONSULTATION FEE ONLY
@router.patch("/me/fee")
def update_my_fee(
    data: FeeUpdate,
    tenant=Depends(get_active_tenant),
    user=Depends(require_doctor),
    db: Session = Depends(get_db),
):
    if data.consultation_fee < 0:
        raise HTTPException(status_code=400, detail="Invalid consultation fee")

    doctor = (
        db.query(Doctor)
        .filter(Doctor.user_id == user.get("user_id"), Doctor.tenant_id == tenant.id)
        .first()
    )

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    doctor.consultation_fee = data.consultation_fee
    db.commit()
    db.refresh(doctor)

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="UPDATE_DOCTOR_FEE",
        entity="DOCTOR",
        entity_id=doctor.id,
    )

    return doctor
