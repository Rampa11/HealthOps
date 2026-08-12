from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from pydantic import BaseModel
from datetime import datetime

from app.db.session import SessionLocal
from app.models.assignment import Assignment
from app.models.billing import Billing
from app.models.nurse import Nurse
from app.models.user import User
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_staff, require_nurse, require_admin
from app.utils.audit import log_action


class AssignmentCreate(BaseModel):
    nurse_id: str
    patient_name: str
    start_time: datetime
    end_time: datetime


router = APIRouter(prefix="/assignments", tags=["Assignments"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.put("/{assignment_id}")
def update_assignment(
    assignment_id: str,
    data: dict,
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    assignment = (
        db.query(Assignment)
        .filter(Assignment.id == assignment_id, Assignment.tenant_id == tenant.id)
        .first()
    )

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    # 🔥 UPDATE TIMES
    assignment.start_time = data.get("start_time", assignment.start_time)
    assignment.end_time = data.get("end_time", assignment.end_time)

    db.commit()
    db.refresh(assignment)

    return assignment


# 🔴 STAFF + ADMIN — CREATE ASSIGNMENT
@router.post("/")
def create_assignment(
    data: AssignmentCreate,
    tenant=Depends(get_active_tenant),
    db: Session = Depends(get_db),
):
    try:
        assignment = Assignment(
            nurse_id=data.nurse_id,
            tenant_id=tenant.id,
            patient_name=data.patient_name,
            start_time=data.start_time,
            end_time=data.end_time,
        )

        db.add(assignment)
        db.commit()
        db.refresh(assignment)

        return assignment

    except Exception as e:
        print("🔥 ERROR:", e)  # 👈 ADD THIS
        raise HTTPException(status_code=500, detail=str(e))


# 🟡 STAFF + ADMIN — VIEW ALL ASSIGNMENTS
@router.get("/")
def get_assignments(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    assignments = db.query(Assignment).filter(Assignment.tenant_id == tenant.id).all()

    result = []

    for a in assignments:
        nurse = db.query(Nurse).filter(Nurse.id == a.nurse_id).first()
        user_obj = None

        if nurse:
            user_obj = db.query(User).filter(User.id == nurse.user_id).first()

        result.append(
            {
                "id": a.id,
                "patient_name": a.patient_name,
                "start_time": a.start_time,
                "end_time": a.end_time,
                "nurse_name": user_obj.full_name if user_obj else "Unknown",
                "nurse_id": a.nurse_id,
            }
        )

    return result


# 🟢 NURSE — VIEW OWN ASSIGNMENTS
@router.get("/my")
def get_my_assignments(
    tenant=Depends(get_active_tenant),
    user=Depends(require_nurse),
    db: Session = Depends(get_db),
):
    nurse = (
        db.query(Nurse)
        .filter(Nurse.user_id == user.get("user_id"), Nurse.tenant_id == tenant.id)
        .first()
    )

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")

    return (
        db.query(Assignment)
        .filter(Assignment.nurse_id == nurse.id, Assignment.tenant_id == tenant.id)
        .all()
    )


# 🟢 NURSE — CLOCK IN
@router.post("/{assignment_id}/clock-in")
def clock_in(
    assignment_id: str,
    tenant=Depends(get_active_tenant),
    user=Depends(require_nurse),
    db: Session = Depends(get_db),
):
    nurse = (
        db.query(Nurse)
        .filter(Nurse.user_id == user.get("user_id"), Nurse.tenant_id == tenant.id)
        .first()
    )

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")

    assignment = (
        db.query(Assignment)
        .filter(
            Assignment.id == assignment_id,
            Assignment.nurse_id == nurse.id,
            Assignment.tenant_id == tenant.id,
        )
        .first()
    )

    if not assignment:
        raise HTTPException(status_code=403, detail="Not your assignment")

    if assignment.clock_in_time:
        raise HTTPException(status_code=400, detail="Already clocked in")

    assignment.clock_in_time = datetime.utcnow()

    db.commit()
    db.refresh(assignment)

    # ✅ AUDIT
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CLOCK_IN",
        entity="ASSIGNMENT",
        entity_id=assignment.id,
    )

    return assignment


# 🟢 NURSE — CLOCK OUT + BILLING
@router.post("/{assignment_id}/clock-out")
def clock_out(
    assignment_id: str,
    tenant=Depends(get_active_tenant),
    user=Depends(require_nurse),
    db: Session = Depends(get_db),
):
    nurse = (
        db.query(Nurse)
        .filter(Nurse.user_id == user.get("user_id"), Nurse.tenant_id == tenant.id)
        .first()
    )

    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")

    assignment = (
        db.query(Assignment)
        .filter(
            Assignment.id == assignment_id,
            Assignment.nurse_id == nurse.id,
            Assignment.tenant_id == tenant.id,
        )
        .first()
    )

    if not assignment:
        raise HTTPException(status_code=403, detail="Not your assignment")

    if not assignment.clock_in_time:
        raise HTTPException(status_code=400, detail="Must clock in first")

    if assignment.clock_out_time:
        raise HTTPException(status_code=400, detail="Already clocked out")

    assignment.clock_out_time = datetime.utcnow()
    assignment.is_completed = True

    duration = (
        assignment.clock_out_time - assignment.clock_in_time
    ).total_seconds() / 3600

    amount = duration * 25.0

    billing = Billing(assignment_id=assignment.id, tenant_id=tenant.id, amount=amount)

    db.add(billing)
    db.commit()
    db.refresh(billing)

    # ✅ AUDIT
    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CLOCK_OUT",
        entity="ASSIGNMENT",
        entity_id=assignment.id,
    )

    return {"assignment": assignment, "billing": billing}


# 🔴 ADMIN — REPORTS
@router.get("/reports/summary")
def shift_summary(
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    total_shifts = (
        db.query(Assignment).filter(Assignment.tenant_id == tenant.id).count()
    )

    completed_shifts = (
        db.query(Assignment)
        .filter(Assignment.tenant_id == tenant.id, Assignment.is_completed == True)
        .count()
    )

    return {"total_shifts": total_shifts, "completed_shifts": completed_shifts}


@router.get("/reports/revenue")
def revenue_report(
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    total_revenue = (
        db.query(func.sum(Billing.amount))
        .filter(Billing.tenant_id == tenant.id)
        .scalar()
    )

    return {"total_revenue": total_revenue or 0}
