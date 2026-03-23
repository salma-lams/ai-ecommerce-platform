from pydantic import BaseModel
from typing import List, Optional

class ProductCartItem(BaseModel):
    product_id: str
    quantity: int = 1

class PaymentIntentRequest(BaseModel):
    items: List[ProductCartItem]

class PaymentIntentResponse(BaseModel):
    clientSecret: str
    orderId: str

class OrderResponse(BaseModel):
    id: str
    amount: int
    status: str
    created_at: str
    stripe_payment_intent_id: Optional[str] = None
