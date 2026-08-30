from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Header, HTTPException
from app.database.connection import get_db
from app.repositories.user import get_user_by_id
from app.core.security import verify_access_token



router = APIRouter()



@router.get("/me")
async def get_current_user(
    db: Session = Depends(get_db),
    authorization: str = Header(None)
):
    """
    Get current user data from JWT token.
    
    Expected header: Authorization: Bearer <token>
    
    Returns: {user_id, name, email}
    """
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    # Extract token from "Bearer <token>"
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authorization scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    # Verify token and get user_id
    user_id = verify_access_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    # Get user from database
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "user_id": str(user.id),
        "name": user.name,
        "email": user.email
    }