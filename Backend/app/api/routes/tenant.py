from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.session import get_db
from app.models.tenant import Tenant
from app.models.user import User
from app.core.hash import hash_password
from app.utils.audit import log_action
from app.utils.slug import generate_unique_slug

router = APIRouter(prefix="/tenants", tags=["Tenants"])


# ===========================
# REQUEST SCHEMA
# ===========================


class TenantCreate(BaseModel):
    # ==============================
    # BASIC DETAILS
    # ==============================
    name: str
    email: EmailStr
    password: str

    phone: str | None = None

    # ==============================
    # HOSPITAL INFORMATION
    # ==============================
    hospital_type: str | None = None

    website: str | None = None

    address: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = "Nigeria"

    contact_person: str | None = None
    contact_position: str | None = None

    registration_number: str | None = None
    license_number: str | None = None

    # ==============================
    # BRANDING
    # ==============================
    primary_color: str | None = None
    secondary_color: str | None = None
    about: str | None = None

    facebook: str | None = None
    instagram: str | None = None
    linkedin: str | None = None
    twitter: str | None = None

    logo: str | None = None
    favicon: str | None = None
    hero_image: str | None = None
    latitude: str | None = None
    longitude: str | None = None
    timezone: str | None = "Africa/Lagos"
    currency: str | None = "NGN"


# ===========================
# CREATE TENANT
# ===========================


@router.post("/")
def create_tenant(data: TenantCreate, db: Session = Depends(get_db)):

    existing_tenant = db.query(Tenant).filter(Tenant.email == data.email).first()

    if existing_tenant:
        raise HTTPException(status_code=400, detail="Email already registered")

    tenant = Tenant(
        # ===========================
        # BASIC
        # ===========================
        name=data.name,
        slug=generate_unique_slug(
            db=db,
            model=Tenant,
            name=data.name,
        ),
        email=data.email,
        password=hash_password(data.password),
        phone=data.phone,
        logo=data.logo,
        favicon=data.favicon,
        hero_image=data.hero_image,
        latitude=data.latitude,
        longitude=data.longitude,
        timezone=data.timezone,
        currency=data.currency,
        # ===========================
        # HOSPITAL
        # ===========================
        hospital_type=data.hospital_type,
        website=data.website,
        address=data.address,
        city=data.city,
        state=data.state,
        country=data.country,
        contact_person=data.contact_person,
        contact_position=data.contact_position,
        registration_number=data.registration_number,
        license_number=data.license_number,
        # ===========================
        # BRANDING
        # ===========================
        primary_color=data.primary_color,
        secondary_color=data.secondary_color,
        about=data.about,
        facebook=data.facebook,
        instagram=data.instagram,
        linkedin=data.linkedin,
        twitter=data.twitter,
        # ===========================
        # ACCOUNT
        # ===========================
        is_active=False,
        is_verified=False,
        subscription_plan="Starter",
        subscription_status="Trial",
    )

    db.add(tenant)
    db.commit()
    db.refresh(tenant)

    # -------------------------
    # Create Admin User
    # -------------------------

    admin_user = User(
        tenant_id=tenant.id,
        full_name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="admin",
    )

    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)

    # -------------------------
    # Audit Log
    # -------------------------

    log_action(
        db=db,
        tenant_id=tenant.id,
        user_id=admin_user.id,
        action="CREATE_TENANT",
        entity="TENANT",
        entity_id=tenant.id,
    )

    return {
        "tenant_id": tenant.id,
        "tenant_name": tenant.name,
        "slug": tenant.slug,
        "admin_user_id": admin_user.id,
        "email": admin_user.email,
        "is_active": tenant.is_active,
    }


# ===========================
# BLOCK PUBLIC LIST
# ===========================


@router.get("/")
def get_tenants():
    raise HTTPException(status_code=403, detail="Access not allowed")
