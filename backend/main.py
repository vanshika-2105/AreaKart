from fastapi import FastAPI

app = FastAPI(
    title="Areakart API",
    description="Backend API for Areakart",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Areakart 🚀",
        "status": "Backend Running Successfully"
    }