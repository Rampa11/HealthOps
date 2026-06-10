from sqlalchemy import Column, String, DateTime
from app.db.base import Base
import uuid
from datetime import datetime


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    tenant_id = Column(String, nullable=False)
    user_id = Column(String, nullable=False)

    action = Column(String, nullable=False)  # e.g. CREATE_USER, CLOCK_IN
    entity = Column(String, nullable=False)  # e.g. USER, ASSIGNMENT

    entity_id = Column(String, nullable=True)

    timestamp = Column(DateTime, default=datetime.utcnow)