from fastapi import APIRouter

from schemas.search_schema import SearchRequest
from services.availability_service import get_available_services

router = APIRouter()


@router.post("/search")
def search(request: SearchRequest):

    services = get_available_services(request.pincode)

    return {
        "pincode": request.pincode,
        "services": services
    }