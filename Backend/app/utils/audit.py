from app.models.audit_log import AuditLog


def log_action(db, tenant_id, user_id, action, entity, entity_id=None):
    log = AuditLog(
        tenant_id=tenant_id,
        user_id=user_id,
        action=action,
        entity=entity,
        entity_id=entity_id
    )

    db.add(log)
    db.commit()