from fastapi import APIRouter

from schemas.search_schema import SearchRequest
from schemas.delivery_schema import SearchResponse
from schemas.location_schema import LocationRequest

from services.availability_service import get_available_services
from services.location_service import get_location_from_coordinates

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
def search(request: SearchRequest):

    result = get_available_services(request.pincode)

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


@router.post("/location", response_model=SearchResponse)
def location(request: LocationRequest):

    result = get_location_from_coordinates(
        request.latitude,
        request.longitude
    )

    if result is None:
        return SearchResponse(
            pincode="",
            city="",
            state="",
            latitude=request.latitude,
            longitude=request.longitude,
            services=[],
            availability=[],
            message="Unable to determine your location."
        )

    return SearchResponse(
        pincode=result.get("pincode", ""),
        city=result.get("city", ""),
        state=result.get("state", ""),
        latitude=result.get("latitude"),
        longitude=result.get("longitude"),
        services=result.get("services", []),
        availability=result.get("availability", []),
        message="Current location detected successfully."
    )