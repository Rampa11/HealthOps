from sqlalchemy import Column, String, Float, ForeignKey, Boolean
from app.db.base import Base
import uuid


class Billing(Base):
    __tablename__ = "billings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    assignment_id = Column(String, ForeignKey("assignments.id"), nullable=False)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)

    amount = Column(Float, nullable=False)
    is_paid = Column(Boolean, default=False)
