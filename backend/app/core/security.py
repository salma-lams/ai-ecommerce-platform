from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os

security = HTTPBearer()

def verify_supabase_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verifies the JWT token issued by Supabase Auth."""
    token = credentials.credentials
    jwt_secret = os.getenv("SUPABASE_KEY", "your-supabase-jwt-secret")
    
    try:
        # Supabase signs JWTs using the project JWT secret
        decoded_token = jwt.decode(
            token, 
            jwt_secret, 
            algorithms=["HS256"], 
            options={"verify_aud": False} 
        )
        return decoded_token
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(token: dict = Depends(verify_supabase_jwt)):
    # The 'sub' claim contains the user ID
    user_id = token.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return {"id": user_id, "role": token.get("role", "authenticated")}

def require_admin(user: dict = Depends(get_current_user)):
    """Optional dependency to restrict routes to Admins only."""
    # Assuming role mapping is passed in token
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return user
