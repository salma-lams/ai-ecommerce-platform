from sqlalchemy import Column, String, Float, Boolean, DateTime, Text, Integer, JSON
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    image_url = Column(String, nullable=True)
    stock = Column(Integer, default=0)
    category_id = Column(String, nullable=True)
    features = Column(JSON, default=list) # e.g. ["Premium Material", "Trendy Winter Styling"]
    created_at = Column(DateTime(timezone=True), server_default=func.now())
