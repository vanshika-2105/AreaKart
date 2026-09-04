from pydantic import BaseModel, Field


class AIRecommendationRequest(BaseModel):
    message: str = Field(..., min_length=3, max_length=500)
    pincode: str = Field(..., min_length=4, max_length=10)


class AIRecommendationResponse(BaseModel):
    recommendation: str
    reason: str
    confidence: float
    alternatives: list[str]
    intent: str
    preference: str
