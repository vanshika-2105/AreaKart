from services.pincode_service import PincodeService


def get_delivery_services(city: str):
    """
    Return delivery apps based on the city.
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

    services = get_delivery_services(location["city"])

    return {
        "city": location["city"],
        "state": location["state"],
        "pincode": location["pincode"],
        "latitude": location["latitude"],
        "longitude": location["longitude"],
        "services": services,
    }