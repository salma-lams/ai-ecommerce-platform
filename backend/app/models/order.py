import uuid
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, index=True, nullable=True) # Optional for guest checkouts
    stripe_payment_intent_id = Column(String, unique=True, index=True)
    amount = Column(Integer, nullable=False) # Store in cents
    currency = Column(String, default="gbp")
    status = Column(String, default="pending") # pending, paid, failed, shipped

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
