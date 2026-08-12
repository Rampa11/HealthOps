from logging.config import fileConfig
import os

from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

load_dotenv()

# -----------------------------
# Import SQLAlchemy Base
# -----------------------------
from app.db.base import Base

# -----------------------------
# Import ALL models so they are
# registered with Base.metadata
# -----------------------------
from app.models import (
    tenant,
    user,
    nurse,
    nurse_availability,
    assignment,
    billing,
    audit_log,
    doctor,
    patient,
    consultation_request,
)

config = context.config

# Use DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")
config.set_main_option("sqlalchemy.url", DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Tell Alembic where SQLAlchemy metadata lives
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in offline mode."""

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in online mode."""

    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
