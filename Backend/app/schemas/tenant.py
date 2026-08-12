from pydantic import BaseModel, ConfigDict
from typing import Optional


class TenantResponse(BaseModel):
    id: str
    name: str
    slug: Optional[str]

    logo: Optional[str]
    website: Optional[str]

    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]

    primary_color: Optional[str]
    secondary_color: Optional[str]

    favicon: Optional[str]
    hero_image: Optional[str]

    about: Optional[str]

    facebook: Optional[str]
    instagram: Optional[str]
    linkedin: Optional[str]
    twitter: Optional[str]

    is_verified: bool

    subscription_plan: Optional[str]
    subscription_status: Optional[str]

    model_config = ConfigDict(from_attributes=True)
