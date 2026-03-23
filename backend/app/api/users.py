from fastapi import APIRouter, Depends
from app.core.security import get_current_user, require_admin

router = APIRouter()

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """Retrieve currently authenticated user profile."""
    return {"user_id": user["id"], "role": user["role"]}

@router.get("/")
async def list_users(admin: dict = Depends(require_admin)):
    """Admin only: list all users."""
    return [{"user_id": "123", "role": "client"}]
