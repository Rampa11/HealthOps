from sqlalchemy import Column, String, Boolean
from app.db.base import Base
import uuid


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)

    # 🔥 AUTH FIELDS
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # 🔥 OPTIONAL INFO
    phone = Column(String, nullable=True)

    # 🔥 SYSTEM FIELDS
    is_active = Column(Boolean, default=False)

    # 🔥 STRIPE
    stripe_customer_id = Column(String, nullable=True)
    stripe_subscription_id = Column(String, nullable=True)