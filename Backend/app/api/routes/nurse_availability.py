from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.session import SessionLocal
from app.models.nurse_availability import NurseAvailability
from app.models.nurse import Nurse
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_staff, require_nurse
from app.utils.audit import log_action

router = APIRouter(prefix="/availability", tags=["Nurse Availability"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🟡 STAFF + ADMIN — CREATE AVAILABILITY
@router.post("/")
def create_availability(
    nurse_id: str,
    start_time: datetime,
    end_time: datetime,
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db)
):
    if end_time <= start_time:
        raise HTTPException(status_code=400, detail="Invalid time range")

    nurse = db.query(Nurse).filter(
        Nurse.id == nurse_id,
        Nurse.tenant_id == tenant.id
    ).first()

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")

    availability = NurseAvailability(
        nurse_id=nurse_id,
        tenant_id=tenant.id,
        start_time=start_time,
        end_time=end_time
    )

    db.add(availability)
    db.commit()
    db.refresh(availability)

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CREATE_AVAILABILITY",
        entity="AVAILABILITY",
        entity_id=availability.id
    )

    return availability


# 🟡 STAFF + ADMIN — VIEW ALL AVAILABILITY
@router.get("/")
def get_availability(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db)
):
    return db.query(NurseAvailability).filter(
        NurseAvailability.tenant_id == tenant.id
    ).all()


# 🟢 NURSE — VIEW OWN AVAILABILITY
@router.get("/my")
def get_my_availability(
    tenant=Depends(get_active_tenant),
    user=Depends(require_nurse),
    db: Session = Depends(get_db)
):
    nurse = db.query(Nurse).filter(
        Nurse.user_id == user.get("user_id"),
        Nurse.tenant_id == tenant.id
    ).first()

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")

    return db.query(NurseAvailability).filter(
        NurseAvailability.nurse_id == nurse.id,
        NurseAvailability.tenant_id == tenant.id
    ).all()