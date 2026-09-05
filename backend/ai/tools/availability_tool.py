from services.availability_service import get_available_services


def check_availability(pincode: str) -> dict:
    """
    Agent tool for checking verified delivery availability.
    """

    result = get_available_services(pincode)

    if result is None:
        return {
            "success": False,
            "pincode": pincode,
            "services": [],
            "availability": [],
            "message": "No delivery services found for this PIN code.",
        }

    return {
        "success": True,
        "pincode": result.get("pincode", pincode),
        "city": result.get("city", ""),
        "state": result.get("state", ""),
        "services": result.get("services", []),
        "availability": result.get("availability", []),
    }
