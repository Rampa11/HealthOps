# HealthOpz Premium Redesign

## What changed

- Premium mobile-first public navigation, footer and design foundation.
- Cohesive landing page with clear marketplace and hospital-operations pathways.
- Redesigned Nursing and Traditional Medicine experiences with original African care imagery.
- Improved public search, cards, buttons, focus states, responsive spacing and empty-state behavior.
- Removed dead links from the desktop services menu.
- Public marketplace routes remain separate from private hospital workspace routes.
- Pricing and backend business logic were not changed.

## Run locally

Frontend:

1. Open PowerShell in `healthcare-frontend`.
2. Run `npm install`.
3. Run `npm run dev`.

Backend:

1. Open PowerShell in `Backend`.
2. Create and activate a Python virtual environment.
3. Run `pip install -r requirements.txt`.
4. Configure the project's existing environment variables.
5. Run `uvicorn app.main:app --reload`.

## Verification completed

- Frontend production build: passed.
- Backend Python syntax compilation: passed.
- Responsive browser review: passed at desktop and 390 × 844 mobile viewport.

The frontend build reports a non-blocking JavaScript chunk-size advisory. Route-level lazy loading can be added later if smaller initial bundles are required.
