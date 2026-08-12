from sqlalchemy import Column, String, Boolean, Text
from app.db.base import Base
import uuid


class Tenant(Base):
    __tablename__ = "tenants"

    # ============================================================
    # PRIMARY KEY
    # ============================================================

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    # ============================================================
    # HOSPITAL IDENTITY
    # ============================================================

    name = Column(String, nullable=False)

    # Example:
    # careplus.healthopz.com
    # bamboo.healthopz.com
    slug = Column(String, unique=True, index=True, nullable=False)

    hospital_type = Column(String, nullable=True)

    registration_number = Column(String, nullable=True)

    license_number = Column(String, nullable=True)

    is_verified = Column(Boolean, default=False)

    # ============================================================
    # CONTACT INFORMATION
    # ============================================================

    email = Column(String, unique=True, index=True, nullable=False)

    phone = Column(String, nullable=True)

    website = Column(String, nullable=True)

    address = Column(Text, nullable=True)

    city = Column(String, nullable=True)

    state = Column(String, nullable=True)

    country = Column(String, default="Nigeria")

    contact_person = Column(String, nullable=True)

    contact_position = Column(String, nullable=True)

    # ============================================================
    # LOCATION
    # ============================================================

    latitude = Column(String, nullable=True)

    longitude = Column(String, nullable=True)

    timezone = Column(String, default="Africa/Lagos")

    currency = Column(String, default="NGN")

    # ============================================================
    # BRANDING
    # ============================================================

    logo = Column(String, nullable=True)

    favicon = Column(String, nullable=True)

    hero_image = Column(String, nullable=True)

    primary_color = Column(String, nullable=True)

    secondary_color = Column(String, nullable=True)

    about = Column(Text, nullable=True)

    # ============================================================
    # SOCIAL MEDIA
    # ============================================================

    facebook = Column(String, nullable=True)

    instagram = Column(String, nullable=True)

    linkedin = Column(String, nullable=True)

    twitter = Column(String, nullable=True)

    # ============================================================
    # AUTHENTICATION
    # ============================================================

    password = Column(String, nullable=False)

    is_active = Column(Boolean, default=False)

    # ============================================================
    # SUBSCRIPTION
    # ============================================================

    subscription_plan = Column(String, default="Starter")

    subscription_status = Column(String, default="Trial")

    stripe_customer_id = Column(String, nullable=True)

    stripe_subscription_id = Column(String, nullable=True)
