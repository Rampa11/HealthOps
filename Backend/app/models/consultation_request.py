# app/models/consultation_request.py
from sqlalchemy import Column, String, Text
from app.db.base import Base
import uuid


class ConsultationRequest(Base):
    __tablename__ = "consultation_requests"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False)

    # ── WHO ───────────────────────────────────────────────────────
    patient_id = Column(String, nullable=False)
    doctor_id = Column(String, nullable=True)      # set when doctor is selected
    specialization = Column(String, nullable=False) # what the patient needs

    # ── DETAILS ───────────────────────────────────────────────────
    notes = Column(Text, nullable=True)            # patient's description of issue
    status = Column(String, default="pending")     # pending | scheduled | completed | cancelled

    # ── SCHEDULING ────────────────────────────────────────────────
    scheduled_date = Column(String, nullable=True)
    scheduled_time = Column(String, nullable=True)

    # ── TIMESTAMPS ────────────────────────────────────────────────
    created_at = Column(String, nullable=True)