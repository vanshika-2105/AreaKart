from fastapi import APIRouter

from schemas.search_schema import SearchRequest
from schemas.delivery_schema import SearchResponse
from services.availability_service import get_available_services

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
def search(request: SearchRequest):

    result = get_available_services(request.pincode)

    # If no data is found for the PIN code
    if result is None:
        return SearchResponse(
            pincode=request.pincode,
            city="",
            state="",
            latitude=None,
            longitude=None,
            services=[],
            availability=[],
            message="No delivery services found for this PIN code."
        )

    # Return normal search result
    return SearchResponse(
        pincode=result.get("pincode", request.pincode),
        city=result.get("city", ""),
        state=result.get("state", ""),
        latitude=result.get("latitude"),
        longitude=result.get("longitude"),
        services=result.get("services", []),
        availability=result.get("availability", []),
        message=result.get(
            "message",
            "Delivery services found successfully."
        )
    )