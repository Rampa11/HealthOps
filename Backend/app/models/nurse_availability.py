from sqlalchemy import Column, String, DateTime, ForeignKey
from app.db.base import Base
import uuid


class NurseAvailability(Base):
    __tablename__ = "nurse_availability"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    nurse_id = Column(String, ForeignKey("nurses.id"), nullable=False)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)

    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)