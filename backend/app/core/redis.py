import redis.asyncio as aioredis
import os
import logging

logger = logging.getLogger(__name__)
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

async def get_redis_client():
    """
    FastAPI dependency yielding an asynchronous Redis interface.
    Designed for rapid session management and shopping cart object storage.
    """
    redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)
    try:
        # Pinging to verify connection early would go here
        yield redis_client
    finally:
        await redis_client.close()
