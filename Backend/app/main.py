from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# DB
from app.db.base import Base
from app.db.session import engine

# Models (IMPORTANT: must be imported)
from app.models import tenant, user, doctor
from app.models import tenant, user, patient, consultation_request

# Routes
from app.api.routes.tenant import router as tenant_route
from app.api.routes.user import router as user_route
from app.api.routes.nurse import router as nurse_route
from app.api.routes.nurse_availability import router as availability_route
from app.api.routes.assignment import router as assignment_route
from app.api.routes.billing import router as billing_route
from app.api.routes.subscription import router as subscription_route
from app.api.routes.webhook import router as webhook_route
from app.api.routes.auth import router as auth_route
from app.api.routes.audit import router as audit_route
from app.api.routes.doctor import router as doctor_route
from app.api.routes.patient import router as patient_route


app = FastAPI(title="Healthcare Operations System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://healthopz.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables on startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


# Root test
@app.get("/")
def root():
    return {"message": "API is running"}


# Register routes
app.include_router(tenant_route)
app.include_router(user_route)
app.include_router(nurse_route)
app.include_router(availability_route)
app.include_router(assignment_route)
app.include_router(billing_route)
app.include_router(subscription_route)
app.include_router(webhook_route)
app.include_router(auth_route)
app.include_router(audit_route)
app.include_router(doctor_route)
app.include_router(patient_route)