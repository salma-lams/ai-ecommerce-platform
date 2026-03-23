import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartShop API"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    # Fallback to local SQLite instance since no Supabase configuration exists natively
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./smartshop.db")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "local-jwt-fallback-key")
    STRIPE_API_KEY: str = os.getenv("STRIPE_API_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
