CITY_ALIASES = {
    "gautam buddha nagar": "noida",
    "bangalore": "bengaluru",
    "gurgaon": "gurugram",
    "new delhi": "delhi",
}


def normalize_city(city: str) -> str:
    """
    Normalize city names so aliases use one standard name.
    """

    if not city:
        return ""

    city_key = city.strip().lower()

    return CITY_ALIASES.get(city_key, city_key)