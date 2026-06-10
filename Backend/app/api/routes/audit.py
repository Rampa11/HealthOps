from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.audit_log import AuditLog
from app.api.deps import get_active_tenant
from app.api.deps_roles import require_admin

router = APIRouter(prefix="/audit", tags=["Audit Logs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔴 ADMIN ONLY — VIEW LOGS (WITH PAGINATION + FILTER)
@router.get("/")
def get_logs(
    limit: int = 50,
    offset: int = 0,
    action: str = None,
    tenant=Depends(get_active_tenant),
    user=Depends(require_admin),
    db: Session = Depends(get_db)
):
    query = db.query(AuditLog).filter(
        AuditLog.tenant_id == tenant.id
    )

    # 🔍 OPTIONAL FILTER
    if action:
        query = query.filter(AuditLog.action == action)

    return query.order_by(
        AuditLog.timestamp.desc()
    ).offset(offset).limit(limit).all()