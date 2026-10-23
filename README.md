# HealthOpz

**Connected healthcare operations, provider discovery, and care coordination.**

**Live platform:** https://healthopz.onrender.com  

HealthOpz is a healthcare operations platform designed to connect healthcare providers and patients while giving participating organizations tools to coordinate people, schedules, services, and financial workflows. Its architecture supports multiple organizations (tenants) within one application, with organization-specific accounts and branding.

> **Project status:** Active development. The repository contains working backend routes and frontend workflows alongside features that may still require configuration, integration, testing, or operational review before production use.

## Platform capabilities

### Provider discovery and onboarding

The frontend includes dedicated experiences for:

- Hospitals and healthcare facilities, including searchable directories, organization pages, and multi-step onboarding
- Doctors and nurses, with provider directories and onboarding workflows
- Pharmacies and laboratories, with service-specific pages and onboarding
- Traditional medicine providers, with a dedicated discovery and onboarding experience
- Patients, including registration, sign-in, and patient-facing pages

### Healthcare operations

- **Multi-tenant administration:** Organization records, branded profiles, unique slugs, and organization-scoped access
- **Workforce management:** Staff and nurse records, availability tracking, and assignment management
- **Care scheduling:** Assignment start/end times, nurse-specific assignment views, and clock-in/clock-out endpoints
- **Patient and clinician workflows:** Patient and doctor APIs, administrative screens, and appointment-related frontend pages
- **Financial operations:** Billing, account records, medical charges, and subscription checkout integration
- **Accountability:** Role-aware API dependencies and tenant-scoped audit logs
- **Dashboards and reporting:** Administrative views for scheduling, HR, accounts, billing, and reports

The presence of a page or route does not by itself guarantee a fully integrated or production-ready workflow.

## Who HealthOpz is for

| Audience | Primary use |
| --- | --- |
| Hospitals and healthcare organizations | Establish a digital presence and coordinate operational activities |
| Home healthcare agencies | Organize nurses, availability, care assignments, and shift activity |
| Doctors and nurses | Participate in provider-facing onboarding and care workflows |
| Pharmacies and laboratories | Join provider discovery and onboarding experiences |
| Traditional medicine practitioners | Access a dedicated category for provider discovery |
| Patients | Discover providers and use available patient-facing services |

## Technology

| Layer | Stack |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Routing and data | React Router, TanStack Query, Axios |
| Backend API | Python, FastAPI, Uvicorn |
| Persistence | PostgreSQL, SQLAlchemy, Alembic |
| Authentication and access | Password hashing, token-based authentication, role-aware dependencies |
| Payments | Stripe subscription integration |
| Deployment | Docker, Nginx, Supervisor; Render-compatible container |

## Repository structure

```text
HealthOps/
├── Backend/
│   ├── app/
│   │   ├── api/routes/       # Healthcare, tenant, billing and auth endpoints
│   │   ├── core/             # Configuration and security
│   │   ├── db/               # Database sessions and metadata
│   │   ├── models/           # SQLAlchemy models
│   │   └── main.py           # FastAPI application
│   ├── alembic/              # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── healthcare-frontend/
│   ├── src/                  # React UI, pages and components
│   ├── package.json
│   └── Dockerfile
├── Dockerfile                # Combined React + Nginx + API image
└── docker-compose.yml        # PostgreSQL and application services
```

## Local development

The commands below describe the repository's development entry points. **Use synthetic data only** in local development.

### Prerequisites

- Git
- Python 3.11 or a compatible Python environment
- Node.js and npm
- PostgreSQL
- Docker and Docker Compose (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Rampa11/HealthOps.git
cd HealthOps
```

### 2. Configure the backend

Create `Backend/.env` with local development values. At minimum, the backend requires a `DATABASE_URL` pointing to your PostgreSQL database. Other authentication and payment settings depend on the functionality being exercised.

**Do not commit `.env` files, secret keys, real patient information, or production database exports.**

### 3. Start the backend

```bash
cd Backend
python -m venv .venv
```

Activate the environment:

```bash
# macOS / Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1
```

Then:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API is available locally at `http://localhost:8000`, with interactive API documentation at `http://localhost:8000/docs` when enabled.

**Database note:** The application currently initializes model tables on startup. The repository also contains Alembic migrations; review the migration history and your target database before applying schema changes. Avoid treating automatic table creation as a substitute for a controlled production migration process.

### 4. Start the frontend

In a second terminal, from the repository root:

```bash
cd healthcare-frontend
npm ci
npm run dev
```

Vite ordinarily serves the frontend at `http://localhost:5173`. Ensure the frontend's API configuration targets the local backend when developing.

### 5. Build the frontend

```bash
cd healthcare-frontend
npm run build
```

## Docker deployment

The root Dockerfile builds the React frontend and packages it with Nginx and FastAPI for a combined container. The Compose file additionally provisions PostgreSQL.

For local Docker Compose use, configure:

- `POSTGRES_PASSWORD` in the environment used by Compose
- `Backend/.env` with a valid `DATABASE_URL` and other required application settings
- The database hostname as `db` when connecting between Compose services

Then, from the repository root:

```bash
docker compose up --build
```

The Compose configuration maps host port **80** to the application's internal port **10000**. Make sure port 80 is available, and verify the application and database logs if startup fails.

For managed hosting, configure secrets, persistent database storage, domains, HTTPS, and service health checks in the hosting environment rather than committing credentials.

## Security, privacy, and clinical responsibility

HealthOpz handles workflows that can involve sensitive personal and health-related information. Deployers should:

- Enforce least-privilege access, strong authentication, and tenant isolation
- Use HTTPS and protect credentials and signing keys
- Maintain audit trails, backups, retention rules, and incident-response procedures
- Avoid placing patient data in logs, screenshots, sample payloads, or public issues
- Review relevant privacy and healthcare regulations in every deployment jurisdiction
- Complete security, clinical, and operational validation before handling live patient records

**Important:** This repository README does not represent a claim of HIPAA certification, NDPA compliance, medical-device approval, or production security certification.

## Live application

Visit **[healthopz.onrender.com](https://healthopz.onrender.com)** to explore the deployed application.

## Project information

HealthOpz is maintained in the **[Rampa11/HealthOps](https://github.com/Rampa11/HealthOps)** GitHub repository. For technical collaboration or deployment inquiries, use the repository's available contact and issue channels.

---

*HealthOpz — building connected healthcare operations.*
