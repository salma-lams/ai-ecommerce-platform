from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import products, categories, users, orders
from app.services.ai_recommendations import get_ai_recommendations
from app.core.config import settings
from app.core.database import engine, Base

# Import models to ensure they are registered with SQLAlchemy Base
import app.models.user
import app.models.product
import app.models.order

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the database schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for SmartShop E-commerce Application",
    version="1.0.0",
    lifespan=lifespan,
)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])

# Required Local Realtime Imports
from app.api import realtime
app.include_router(realtime.router, prefix="/api/realtime", tags=["realtime"])

@app.get("/api/ai/recommendations")
async def ai_recommendations(user_id: str = "default_user"):
    return get_ai_recommendations(user_id=user_id)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
