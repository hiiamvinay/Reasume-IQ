from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
import os
from app.api.auth.google import router as google_router
from app.api.me import router as me_router
from app.api.resume_scan import router as resume_router
from app.database.base import Base
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine
from app.models import User, Resume, Scan, OAuthAccount


Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="ResumeIQ API",
    version="1.0.0"
)


app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET"),
    same_site="lax",
    https_only=False,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    google_router,
    prefix="/api/v1/auth/oauth"
)
app.include_router(
    me_router,
    prefix="/api/v1/auth"
)
app.include_router(
    router=resume_router,
    prefix="/api/v1"
)


@app.get("/")
def root():
    return {
        "message": "ResumeIQ API is running"
    }