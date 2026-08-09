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
            "latitude": None,
            "longitude": None,
            "services": [],
            "availability": [],
            "message": "No delivery services found for this PIN code."
        }

    return {
        "pincode": result["pincode"],
        "city": result["city"],
        "state": result["state"],
        "latitude": result["latitude"],
        "longitude": result["longitude"],
        "services": [
            service["name"]
            for service in result["services"]
        ],
        "availability": result["services"],
    }