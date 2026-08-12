from sqlalchemy import Column, String, Integer, ForeignKey
from app.db.base import Base
import uuid


class Nurse(Base):
    __tablename__ = "nurses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)

    license_number = Column(String)
    specialization = Column(String)
    years_experience = Column(Integer)

    rating = Column(Integer, default=0)
