def get_available_services(pincode: str):
    sample_database = {
        "250002": [
            "Blinkit",
            "Zepto",
            "Instamart"
        ],
        "110001": [
            "Blinkit",
            "BigBasket"
        ],
        "560001": [
            "Zepto",
            "Swiggy Instamart"
        ]
    }

    return sample_database.get(pincode, [])