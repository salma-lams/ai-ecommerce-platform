import stripe
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.core.database import get_db
from app.core.config import settings
from app.models.order import Order
from app.schemas.order import PaymentIntentRequest, PaymentIntentResponse, OrderResponse

router = APIRouter()

# Initialize Stripe API Key
stripe.api_key = settings.STRIPE_API_KEY

@router.post("/create-payment-intent", response_model=PaymentIntentResponse, summary="Create a Stripe PaymentIntent for a cart")
async def create_payment_intent(req: PaymentIntentRequest, db: AsyncSession = Depends(get_db)):
    # Very basic static price calculation (In reality, we'd query the DB)
    num_items = sum(item.quantity for item in req.items)
    amount = 9900 * num_items if num_items > 0 else 9900 # Default £99

    try:
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="gbp",
            # automatic_payment_methods is enabled by default in latest API versions
            automatic_payment_methods={"enabled": True}, 
        )

        # Create localized order tracking record
        new_order = Order(
            stripe_payment_intent_id=intent.id,
            amount=amount,
            currency="gbp",
            status="pending"
        )
        db.add(new_order)
        await db.commit()
        await db.refresh(new_order)

        return PaymentIntentResponse(
            clientSecret=intent.client_secret,
            orderId=new_order.id
        )
    except stripe.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/webhook", summary="Stripe Webhook endpoint to fulfill orders securely")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the checkout session completed event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent_id = event['data']['object']['id']
        # Mark order as paid in DB
        await db.execute(
            update(Order).where(Order.stripe_payment_intent_id == payment_intent_id).values(status='paid')
        )
        await db.commit()
        
    return {"status": "success"}
