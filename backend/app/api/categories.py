from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_categories():
    """Retrieve all store categories."""
    return [
        {"id": "electronics", "name": "Electronics"}, 
        {"id": "fashion", "name": "Fashion"},
        {"id": "home", "name": "Home & Garden"}
    ]
