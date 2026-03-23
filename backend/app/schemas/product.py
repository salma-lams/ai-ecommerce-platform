from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    name: str = Field(..., max_length=150)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    image_url: Optional[str] = None
    stock: int = Field(default=0, ge=0)
    category_id: Optional[str] = None
    features: List[str] = []

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    features: Optional[List[str]] = None

class ProductResponse(ProductBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
