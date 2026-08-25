from services.search_service import search_pincode
from services.service_registry import SERVICE_REGISTRY
from services.verifiers.verifier_registry import VERIFIER_REGISTRY


def get_available_services(pincode: str):
    """
    Get delivery services and their availability
    for a given pincode.
    """

    location = search_pincode(pincode)

    if location is None:
        return None

    services = location["services"]

    availability = []

    for service in services:

        service_info = SERVICE_REGISTRY.get(service)

        verifier = VERIFIER_REGISTRY.get(service)

        if service_info is None:
            continue

        if verifier is None:
            result = {
                "status": "estimated",
                "confidence": "unknown",
                "message": "No verifier configured for this service.",
            }
        else:
            result = verifier.verify(
                pincode=location["pincode"],
                latitude=location["latitude"],
                longitude=location["longitude"],
                city=location["city"],
            )

        availability.append(
    {
        "name": service,
        "type": service_info["type"],
        "verification_method": service_info["verification_method"],
        "status": result["status"],
        "confidence": result["confidence"],
        "verification_level": result["verification_level"],
        "message": result["message"],
        "url": service_info["url"],
    }
)

    return {
        "pincode": location["pincode"],
        "city": location["city"],
        "state": location["state"],
        "latitude": location["latitude"],
        "longitude": location["longitude"],
        "services": services,
        "availability": availability,
    }