from services.pincode_service import PincodeService
from data.availability_data import availability_data


def get_delivery_services(city: str):
    """
    Fallback delivery apps based on city.
    """

    city = city.strip().lower()

    metro_cities = [
        "new delhi",
        "delhi",
        "mumbai",
        "bengaluru",
        "bangalore",
        "hyderabad",
        "chennai",
        "kolkata",
        "pune",
        "gurugram",
        "gurgaon",
        "noida",
    ]

    tier2_cities = [
        "meerut",
        "lucknow",
        "jaipur",
        "ahmedabad",
        "kochi",
        "guwahati",
    ]

    if city in metro_cities:
        return [
            "Blinkit",
            "Zepto",
            "Instamart",
            "BigBasket",
            "JioMart",
        ]

    if city in tier2_cities:
        return [
            "Blinkit",
            "Instamart",
            "BigBasket",
        ]

    return [
        "BigBasket",
        "JioMart",
    ]


def search_pincode(pincode: str):

    location = PincodeService.get_location(pincode)

    if location is None:
        return None

    # First try exact PIN-code availability
    services = availability_data.get(pincode)

    # If PIN is not configured yet, use city fallback
    if services is None:
        services = get_delivery_services(location["city"])

    return {
        "city": location["city"],
        "state": location["state"],
        "pincode": location["pincode"],
        "latitude": location["latitude"],
        "longitude": location["longitude"],
        "services": services,
    }