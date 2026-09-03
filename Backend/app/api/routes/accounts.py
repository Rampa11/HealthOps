from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.medical_charge import MedicalCharge
from app.models.doctor import Doctor
from app.api.deps import get_active_tenant
from app.api.deps_roles import get_current_user, require_admin

router = APIRouter(prefix="/accounts", tags=["Accounts"])

def get_db():
    db=SessionLocal()
    try: yield db
    finally: db.close()

class ChargeCreate(BaseModel):
    patient_id: str
    description: str
    amount: float
    consultation_request_id: str | None = None

class ChargeStatus(BaseModel):
    status: str

@router.get("/charges")
def list_charges(tenant=Depends(get_active_tenant), user=Depends(get_current_user), db: Session=Depends(get_db)):
    if user.get("role") not in ["admin", "staff", "accounts", "hrm", "doctor"]:
        raise HTTPException(status_code=403, detail="Accounts access required")
    q=db.query(MedicalCharge).filter(MedicalCharge.tenant_id==tenant.id)
    if user.get("role")=="doctor":
        doctor=db.query(Doctor).filter(Doctor.user_id==user.get("user_id"), Doctor.tenant_id==tenant.id).first()
        q=q.filter(MedicalCharge.doctor_id==doctor.id) if doctor else q.filter(False)
    return q.all()

@router.post("/charges")
def create_doctor_charge(data: ChargeCreate, tenant=Depends(get_active_tenant), user=Depends(get_current_user), db: Session=Depends(get_db)):
    if user.get("role") != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can create flexible medical charges")
    if data.amount < 0: raise HTTPException(status_code=400, detail="Invalid charge amount")
    doctor=db.query(Doctor).filter(Doctor.user_id==user.get("user_id"), Doctor.tenant_id==tenant.id).first()
    if not doctor: raise HTTPException(status_code=404, detail="Doctor profile not found")
    charge=MedicalCharge(tenant_id=tenant.id, patient_id=data.patient_id, doctor_id=doctor.id, consultation_request_id=data.consultation_request_id, charge_type="medical", description=data.description, amount=data.amount, status="pending", created_by=user.get("user_id"))
    db.add(charge); db.commit(); db.refresh(charge); return charge

@router.patch("/charges/{charge_id}/status")
def update_charge_status(charge_id: str, data: ChargeStatus, tenant=Depends(get_active_tenant), user=Depends(require_admin), db: Session=Depends(get_db)):
    if data.status not in ["pending","directed","paid","waived"]: raise HTTPException(status_code=400, detail="Invalid status")
    charge=db.query(MedicalCharge).filter(MedicalCharge.id==charge_id, MedicalCharge.tenant_id==tenant.id).first()
    if not charge: raise HTTPException(status_code=404, detail="Charge not found")
    charge.status=data.status; db.commit(); db.refresh(charge); return charge
