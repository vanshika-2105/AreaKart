import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router


app = FastAPI(
    title="Areakart API",
    version="1.0.0"
)


allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://areakart-frontend-production.up.railway.app",
]

frontend_url = os.getenv("FRONTEND_URL")

if frontend_url and frontend_url not in allowed_origins:
    allowed_origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Areakart API"
    }