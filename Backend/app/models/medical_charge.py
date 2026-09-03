from sqlalchemy import Column, String, Float, Boolean
from app.db.base import Base
import uuid

class MedicalCharge(Base):
    __tablename__ = "medical_charges"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    patient_id = Column(String, nullable=False, index=True)
    doctor_id = Column(String, nullable=True)
    consultation_request_id = Column(String, nullable=True)
    charge_type = Column(String, nullable=False, default="medical")  # consultation | medical
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False, default="pending")  # pending | directed | paid | waived
    created_by = Column(String, nullable=True)
