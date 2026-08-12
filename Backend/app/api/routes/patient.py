# app/api/routes/patient.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

from app.db.session import SessionLocal
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.user import User
from app.models.consultation_request import ConsultationRequest
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin, require_staff, get_current_user
from app.core.hash import hash_password, verify_password
from app.core.security import create_access_token
from app.utils.audit import log_action

router = APIRouter(prefix="/patients", tags=["Patients"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ── REQUEST SCHEMAS ───────────────────────────────────────────────


class PatientSelfRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    blood_group: Optional[str] = None
    genotype: Optional[str] = None
    allergies: Optional[str] = None
    medical_history: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    nin: Optional[str] = None


class PatientAdminCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    blood_group: Optional[str] = None
    genotype: Optional[str] = None
    allergies: Optional[str] = None
    medical_history: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    nin: Optional[str] = None
    payment_status: Optional[str] = "pending"


class PatientUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    blood_group: Optional[str] = None
    genotype: Optional[str] = None
    allergies: Optional[str] = None
    medical_history: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    payment_status: Optional[str] = None
    nin: Optional[str] = None


class PatientLogin(BaseModel):
    email: EmailStr
    password: str


class ConsultationRequestCreate(BaseModel):
    specialization: str
    notes: Optional[str] = None
    doctor_id: Optional[str] = None


# ── PUBLIC — PATIENT SELF REGISTRATION (no auth needed) ──────────


@router.post("/register")
def patient_self_register(data: PatientSelfRegister, db: Session = Depends(get_db)):
    existing = db.query(Patient).filter(Patient.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    patient = Patient(
        full_name=data.full_name,
        email=data.email,
        password=hash_password(data.password),
        phone=data.phone,
        date_of_birth=data.date_of_birth,
        gender=data.gender,
        address=data.address,
        nin=data.nin,
        blood_group=data.blood_group,
        genotype=data.genotype,
        allergies=data.allergies,
        medical_history=data.medical_history,
        emergency_contact_name=data.emergency_contact_name,
        emergency_contact_phone=data.emergency_contact_phone,
        registered_by="self",
        payment_status="pending",
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return {
        "message": "Registration successful",
        "patient_id": patient.id,
        "full_name": patient.full_name,
        "email": patient.email,
    }


# ── PUBLIC — PATIENT LOGIN ────────────────────────────────────────


@router.post("/login")
def patient_login(data: PatientLogin, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.email == data.email).first()

    if not patient or not verify_password(data.password, patient.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not patient.is_active:
        raise HTTPException(status_code=403, detail="Account inactive")

    token = create_access_token(
        {
            "patient_id": patient.id,
            "role": "patient",
            "tenant_id": patient.tenant_id or "guest",
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "patient",
        "patient_id": patient.id,
        "full_name": patient.full_name,
    }


# ── ADMIN — CREATE PATIENT ────────────────────────────────────────


@router.post("/")
def admin_create_patient(
    data: PatientAdminCreate,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    existing = db.query(Patient).filter(Patient.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=400, detail="Patient with this email already exists"
        )

    patient = Patient(
        tenant_id=tenant.id,
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        date_of_birth=data.date_of_birth,
        gender=data.gender,
        address=data.address,
        nin=data.nin,
        blood_group=data.blood_group,
        genotype=data.genotype,
        allergies=data.allergies,
        medical_history=data.medical_history,
        emergency_contact_name=data.emergency_contact_name,
        emergency_contact_phone=data.emergency_contact_phone,
        payment_status=data.payment_status or "pending",
        registered_by="admin",
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="CREATE_PATIENT",
        entity="PATIENT",
        entity_id=patient.id,
    )

    return patient


# ── ADMIN — GET ALL PATIENTS ──────────────────────────────────────


@router.get("/")
def get_all_patients(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    patients = db.query(Patient).filter(Patient.tenant_id == tenant.id).all()
    return patients


# ── ADMIN — UPDATE PATIENT ────────────────────────────────────────


@router.patch("/{patient_id}")
def update_patient(
    patient_id: str,
    data: PatientUpdate,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    patient = (
        db.query(Patient)
        .filter(Patient.id == patient_id, Patient.tenant_id == tenant.id)
        .first()
    )

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(patient, field, value)

    db.commit()
    db.refresh(patient)

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=user.get("user_id"),
        action="UPDATE_PATIENT",
        entity="PATIENT",
        entity_id=patient.id,
    )

    return patient


# ── PATIENT — VIEW OWN PROFILE ────────────────────────────────────


@router.get("/me")
def get_my_profile(
    current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user.get("role") != "patient":
        raise HTTPException(status_code=403, detail="Patient access required")

    patient = (
        db.query(Patient).filter(Patient.id == current_user.get("patient_id")).first()
    )

    if not patient:
        raise HTTPException(status_code=404, detail="Patient profile not found")

    return patient


# ── PUBLIC — GET DOCTORS BY SPECIALIZATION ────────────────────────


@router.get("/doctors/by-specialization")
def get_doctors_by_specialization(specialization: str, db: Session = Depends(get_db)):
    doctors = db.query(Doctor).filter(Doctor.specialization == specialization).all()

    result = []
    for d in doctors:
        user_obj = db.query(User).filter(User.id == d.user_id).first()
        result.append(
            {
                "id": d.id,
                "full_name": user_obj.full_name if user_obj else "Unknown",
                "specialization": d.specialization,
                "years_experience": d.years_experience,
                "consultation_fee": d.consultation_fee,
            }
        )

    return result


# ── PATIENT — REQUEST CONSULTATION ───────────────────────────────


@router.post("/consultation-request")
def request_consultation(
    data: ConsultationRequestCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.get("role") != "patient":
        raise HTTPException(status_code=403, detail="Patient access required")

    patient = (
        db.query(Patient).filter(Patient.id == current_user.get("patient_id")).first()
    )

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    request = ConsultationRequest(
        tenant_id=patient.tenant_id or "guest",
        patient_id=patient.id,
        doctor_id=data.doctor_id,
        specialization=data.specialization,
        notes=data.notes,
        status="pending",
        created_at=datetime.utcnow().isoformat(),
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    # 🔔 NOTIFICATION HOOK — admin + doctor get notified
    # In production: send email/websocket here
    # For now: stored in consultation_requests table
    # Admin queries GET /consultation-requests/
    # Doctor queries GET /consultation-requests/mine

    return {
        "message": "Consultation request submitted successfully",
        "request_id": request.id,
        "specialization": request.specialization,
        "status": request.status,
        "doctor_id": request.doctor_id,
    }


# ── ADMIN — VIEW ALL CONSULTATION REQUESTS ────────────────────────


@router.get("/consultation-requests/all")
def get_all_consultation_requests(
    tenant=Depends(get_active_tenant),
    user=Depends(require_staff),
    db: Session = Depends(get_db),
):
    requests = (
        db.query(ConsultationRequest)
        .filter(ConsultationRequest.tenant_id == tenant.id)
        .all()
    )

    result = []
    for r in requests:
        patient = db.query(Patient).filter(Patient.id == r.patient_id).first()
        result.append(
            {
                "id": r.id,
                "patient_name": patient.full_name if patient else "Unknown",
                "patient_email": patient.email if patient else "",
                "specialization": r.specialization,
                "notes": r.notes,
                "status": r.status,
                "doctor_id": r.doctor_id,
                "scheduled_date": r.scheduled_date,
                "scheduled_time": r.scheduled_time,
                "created_at": r.created_at,
            }
        )

    return result


# ── ADMIN — SCHEDULE A CONSULTATION REQUEST ───────────────────────


@router.patch("/consultation-requests/{request_id}/schedule")
def schedule_consultation(
    request_id: str,
    doctor_id: str,
    scheduled_date: str,
    scheduled_time: str,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db),
):
    req = (
        db.query(ConsultationRequest)
        .filter(
            ConsultationRequest.id == request_id,
            ConsultationRequest.tenant_id == tenant.id,
        )
        .first()
    )

    if not req:
        raise HTTPException(status_code=404, detail="Request not found")

    req.doctor_id = doctor_id
    req.scheduled_date = scheduled_date
    req.scheduled_time = scheduled_time
    req.status = "scheduled"

    db.commit()
    db.refresh(req)

    return {
        "message": "Consultation scheduled",
        "request_id": req.id,
        "status": req.status,
        "scheduled_date": req.scheduled_date,
        "scheduled_time": req.scheduled_time,
    }
