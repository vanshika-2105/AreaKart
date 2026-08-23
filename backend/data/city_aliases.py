CITY_ALIASES = {
    # NCR
    "greater noida": "greater noida",
    "noida": "noida",
    "gautam buddha nagar": "greater noida",
    "gautam buddh nagar": "greater noida",
    "dadri": "greater noida",

    # Delhi
    "new delhi": "new delhi",
    "central delhi": "new delhi",
    "south delhi": "new delhi",
    "north delhi": "new delhi",
    "east delhi": "new delhi",
    "west delhi": "new delhi",

    # Gurgaon
    "gurgaon": "gurugram",
    "gurugram": "gurugram",

    # Bangalore
    "bangalore": "bengaluru",
    "bengaluru": "bengaluru",

    # Mumbai
    "mumbai": "mumbai",
}


def normalize_city(city: str | None) -> str:
    """
    Normalize a city name using the configured aliases.
    """

    if not city:
        return ""

    city_key = city.strip().lower()

    return CITY_ALIASES.get(city_key, city_key)