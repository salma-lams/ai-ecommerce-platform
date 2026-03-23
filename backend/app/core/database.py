from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

DATABASE_URL = settings.DATABASE_URL

# Fallback to SQLite if no Supabase URL is provided
if not DATABASE_URL or DATABASE_URL == "":
    logger.warning("No DATABASE_URL found. Falling back to local SQLite database.")
    DATABASE_URL = "sqlite+aiosqlite:///./smartshop.db"

# Create the Async Engine
engine = create_async_engine(
    DATABASE_URL, 
    echo=False,
    # SQLite requires check_same_thread=False, Postgres does not use it
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for SQLAlchemy models
Base = declarative_base()

async def get_db():
    """Dependency for resolving database sessions in FastAPI routes."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
