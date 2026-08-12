from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.tenant import Tenant
from app.models.doctor import Doctor
from app.models.user import User


router = APIRouter(prefix="/api/public", tags=["Public"])


# ============================================================
# PUBLIC — HOSPITAL DIRECTORY
# ============================================================

@router.get("/hospitals")
def get_hospitals(db: Session = Depends(get_db)):

    hospitals = (
        db.query(Tenant)
        .filter(Tenant.is_active == True)
        .order_by(Tenant.name)
        .all()
    )

    return [
        {
            "name": hospital.name,
            "slug": hospital.slug,
            "logo": hospital.logo,
            "hospital_type": hospital.hospital_type,
            "city": hospital.city,
            "state": hospital.state,
            "primary_color": hospital.primary_color,
            "verified": hospital.is_verified,
        }
        for hospital in hospitals
    ]


# ============================================================
# PUBLIC — SINGLE HOSPITAL
# ============================================================

@router.get("/tenant/{slug}")
def get_tenant(
    slug: str,
    db: Session = Depends(get_db),
):

    tenant = (
        db.query(Tenant)
        .filter(Tenant.slug == slug)
        .first()
    )

    if tenant is None:
        raise HTTPException(
            status_code=404,
            detail="Hospital not found",
        )

    return {
        "id": tenant.id,
        "name": tenant.name,
        "slug": tenant.slug,
        "logo": tenant.logo,
        "hero_image": tenant.hero_image,
        "website": tenant.website,
        "hospital_type": tenant.hospital_type,
        "address": tenant.address,
        "city": tenant.city,
        "state": tenant.state,
        "country": tenant.country,
        "phone": tenant.phone,
        "email": tenant.email,
        "about": tenant.about,
        "primary_color": tenant.primary_color,
        "secondary_color": tenant.secondary_color,
        "facebook": tenant.facebook,
        "instagram": tenant.instagram,
        "linkedin": tenant.linkedin,
        "twitter": tenant.twitter,
        "verified": tenant.is_verified,
    }


# ============================================================
# PUBLIC — DOCTORS DIRECTORY
# ============================================================

@router.get("/doctors")
def get_public_doctors(
    db: Session = Depends(get_db),
):

    doctors = (
        db.query(Doctor)
        .join(User, Doctor.user_id == User.id)
        .order_by(User.full_name)
        .all()
    )

    result = []

    for doctor in doctors:

        user = (
            db.query(User)
            .filter(User.id == doctor.user_id)
            .first()
        )

        if not user:
            continue

        result.append(
            {
                "id": doctor.id,
                "user_id": doctor.user_id,

                "name": user.full_name,

                "email": user.email,

                "specialization": doctor.specialization,

                "experience_years": doctor.experience_years,

                "consultation_fee": doctor.consultation_fee,

                "tenant_id": doctor.tenant_id,
            }
        )

    return result


# ============================================================
# PUBLIC — SINGLE DOCTOR
# ============================================================

@router.get("/doctors/{doctor_id}")
def get_public_doctor(
    doctor_id: str,
    db: Session = Depends(get_db),
):

    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found",
        )

    user = (
        db.query(User)
        .filter(User.id == doctor.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Doctor user profile not found",
        )

    return {
        "id": doctor.id,
        "user_id": doctor.user_id,
        "name": user.full_name,
        "email": user.email,
        "specialization": doctor.specialization,
        "experience_years": doctor.experience_years,
        "consultation_fee": doctor.consultation_fee,
        "tenant_id": doctor.tenant_id,
    }