from services.location_service import get_location_from_coordinates


def resolve_location(latitude: float, longitude: float) -> dict:
    """
    Agent tool for resolving a user's coordinates into a location.
    """

    result = get_location_from_coordinates(
        latitude,
        longitude,
    )

    if result is None:
        return {
            "success": False,
            "message": "Unable to determine the user's location.",
        }

    return {
        "success": True,
        "pincode": result.get("pincode", ""),
        "city": result.get("city", ""),
        "state": result.get("state", ""),
        "latitude": result.get("latitude"),
        "longitude": result.get("longitude"),
        "services": result.get("services", []),
        "availability": result.get("availability", []),
    }
