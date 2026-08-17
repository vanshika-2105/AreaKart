from pydantic import BaseModel
from typing import Optional, List


class ServiceAvailability(BaseModel):
    name: str
    type: str
    verification_method: str
    status: str
    confidence: str
    message: str


class SearchResponse(BaseModel):
    pincode: str
    city: str
    state: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    services: List[str]
    availability: List[ServiceAvailability]
    message: Optional[str] = None