from sqlalchemy import Column, String, Boolean, ForeignKey
from app.db.base import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)

    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String)

    password = Column(String, nullable=False)  

    role = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)