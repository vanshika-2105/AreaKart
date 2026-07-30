from fastapi import APIRouter

from schemas.search_schema import SearchRequest
from services.availability_service import get_available_services

router = APIRouter()


@router.post("/search")
def search(request: SearchRequest):
    result = get_available_services(request.pincode)

    if result is None:
     return {
        "pincode": request.pincode,
        "city": "",
        "state": "",
        "services": [],
        "message": "No delivery services found for this PIN code."
    }

    return {
        "pincode": request.pincode,
        "city": result["city"],
        "state": result["state"],
        "services": result["services"]
    }