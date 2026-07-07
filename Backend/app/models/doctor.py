# app/models/doctor.py
from sqlalchemy import Column, String, Integer, Float
from app.db.base import Base
import uuid


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False)
    user_id = Column(String, nullable=False)

    specialization = Column(String, nullable=False)
    years_experience = Column(Integer, nullable=False, default=0)

    # 🔥 ACCOUNTS HOOK — fixed consultation charge, editable only by the doctor
    consultation_fee = Column(Float, nullable=False, default=0.0)