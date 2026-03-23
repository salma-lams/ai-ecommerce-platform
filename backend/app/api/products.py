from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse
from app.core.security import require_admin, get_current_user

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def list_products(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    """Retrieve products, optionally filtered by category."""
    query = select(Product)
    if category:
        query = query.filter(Product.category_id == category)
        
    result = await db.execute(query)
    products = result.scalars().all()
    return products

@router.post("/", response_model=ProductResponse)
async def create_product(
    product_in: ProductCreate, 
    db: AsyncSession = Depends(get_db),
    # current_user: dict = Depends(require_admin) # Guarded endpoint for admins
):
    """Create a new product."""
    new_product = Product(**product_in.model_dump())
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return new_product

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str, db: AsyncSession = Depends(get_db)):
    """Retrieve specific product."""
    result = await db.execute(select(Product).filter(Product.id == product_id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
