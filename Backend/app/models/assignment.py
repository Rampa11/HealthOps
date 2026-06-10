from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean
from app.db.base import Base
import uuid


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    nurse_id = Column(String, ForeignKey("nurses.id"), nullable=False)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)

    patient_name = Column(String, nullable=False)

    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)

    # Clock system
    clock_in_time = Column(DateTime, nullable=True)
    clock_out_time = Column(DateTime, nullable=True)

    is_completed = Column(Boolean, default=False)
