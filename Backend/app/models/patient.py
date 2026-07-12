# app/models/patient.py
from sqlalchemy import Column, String, Boolean, Text, Date
from app.db.base import Base
import uuid


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=True)  # nullable for self-registered guests

    # ── IDENTITY ─────────────────────────────────────────────────
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    date_of_birth = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    nin = Column(String, nullable=True, unique=True)    

    # ── MEDICAL INFO ──────────────────────────────────────────────
    blood_group = Column(String, nullable=True)       # e.g. A+, O-
    genotype = Column(String, nullable=True)           # e.g. AA, AS, SS
    allergies = Column(Text, nullable=True)
    medical_history = Column(Text, nullable=True)
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)

    # ── ACCOUNT ───────────────────────────────────────────────────
    password = Column(String, nullable=True)           # set on registration
    is_active = Column(Boolean, default=True)

    # ── PAYMENT STATUS ────────────────────────────────────────────
    payment_status = Column(String, default="pending")  # pending | paid | overdue

    # ── REGISTRATION SOURCE ───────────────────────────────────────
    registered_by = Column(String, default="self")     # self | admin