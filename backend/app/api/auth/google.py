import os

from fastapi import APIRouter, Request, Depends, HTTPException, Header
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.repositories.oauth_account import get_user_id_by_provider, create_oauth_account
from app.repositories.user import create_user, get_user_by_id
from app.database.connection import get_db
from app.core.security import create_access_token, verify_access_token

load_dotenv()
router = APIRouter()
oauth = OAuth()

oauth.register(

    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url=(
        "https://accounts.google.com/.well-known/openid-configuration"
    ),

    client_kwargs={
        "scope": "openid email profile"
    }
)


@router.get("/google")
async def google_login(
    request: Request,
    redirect: str
):
    """
    Start Google OAuth.

    Example:

    /google?redirect=http://localhost:5173/oauth/callback
    """

    # Save the React callback URL in the session.
    request.session["frontend_redirect"] = redirect

    # This is the callback Google will use.
    redirect_uri = os.getenv("GOOGLE_CALLBACK_URL")

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )


@router.get("/google/callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Google redirects here after authentication.
    """

    try:
        # Exchange authorization code for token.
        token = await oauth.google.authorize_access_token(
            request
        )

        # Get Google user information.
        user = token.get("userinfo")
        

        if not user:
            return {
                "error": "Could not retrieve Google user information"
            }

        # Get the React callback URL saved earlier.
        frontend_redirect = request.session.get(
            "frontend_redirect"
        )
        
        if not frontend_redirect:
            return {
                "error": "Frontend redirect URL missing"
            }
        
        user_id = get_user_id_by_provider(
            db=db,
            provider="google",
            provider_user_id=user.get("sub")
        )

        if not user_id:
            new_user = create_user(
                db=db,
                email=user.get("email"),
                name=user.get("name")
            )
            user_id = new_user.id

            # Create a new OAuth account for the user.
            create_oauth_account(
                db=db,
                user_id=new_user.id,
                provider="google",
                provider_user_id=user.get("sub")
            )
        token = create_access_token(user_id=user_id)

        return RedirectResponse(
            url=(
                f"{frontend_redirect}"
                f"?access_token={token}"
            )

        )

        



       

    except Exception as e:

        return {
            "error": "Google OAuth failed",
            "detail": str(e)
        }



