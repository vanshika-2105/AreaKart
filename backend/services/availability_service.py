from services.search_service import search_pincode
from services.service_registry import SERVICE_REGISTRY


def get_available_services(pincode: str):
    result = search_pincode(pincode)

    if result is None:
        return None

    services = []

    for service in result["services"]:
        registry = SERVICE_REGISTRY.get(service)

        if registry is None:
            continue

        services.append({
            "name": registry["name"],
            "type": registry["type"],
            "verification_method": registry["verification_method"],
            "status": "estimated",
        })

    return {
        "pincode": result["pincode"],
        "city": result["city"],
        "state": result["state"],
        "latitude": result["latitude"],
        "longitude": result["longitude"],
        "services": services,
    }