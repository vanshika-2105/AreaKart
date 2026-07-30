mock_data = {
    "110001": {
        "city": "New Delhi",
        "state": "Delhi",
        "services": ["Blinkit", "Zepto", "BigBasket"]
    },
    "110002": {
        "city": "New Delhi",
        "state": "Delhi",
        "services": ["Blinkit", "Instamart"]
    },
    "201301": {
        "city": "Noida",
        "state": "Uttar Pradesh",
        "services": ["Blinkit", "Zepto", "Instamart"]
    },
    "201303": {
        "city": "Noida",
        "state": "Uttar Pradesh",
        "services": ["Blinkit", "BigBasket"]
    },
    "122001": {
        "city": "Gurugram",
        "state": "Haryana",
        "services": ["Blinkit", "Zepto", "BigBasket"]
    },
    "250002": {
        "city": "Meerut",
        "state": "Uttar Pradesh",
        "services": ["Blinkit", "Zepto", "Instamart"]
    },
    "400001": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "services": ["Zepto", "BigBasket"]
    },
    "400002": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "services": ["Blinkit", "Zepto"]
    },
    "500001": {
        "city": "Hyderabad",
        "state": "Telangana",
        "services": ["Blinkit", "Instamart"]
    },
    "500081": {
        "city": "Hyderabad",
        "state": "Telangana",
        "services": ["Blinkit", "Zepto", "Instamart"]
    },
    "560001": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "services": ["Zepto", "Instamart"]
    },
    "560103": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "services": ["Blinkit", "Zepto", "BigBasket"]
    },
    "600001": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "services": ["BigBasket", "Zepto"]
    },
    "700001": {
        "city": "Kolkata",
        "state": "West Bengal",
        "services": ["Blinkit", "BigBasket"]
    },
    "380001": {
        "city": "Ahmedabad",
        "state": "Gujarat",
        "services": ["Blinkit", "Zepto"]
    },
    "411001": {
        "city": "Pune",
        "state": "Maharashtra",
        "services": ["Blinkit", "Instamart"]
    },
    "302001": {
        "city": "Jaipur",
        "state": "Rajasthan",
        "services": ["Blinkit", "Zepto"]
    },
    "226001": {
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "services": ["Blinkit", "BigBasket"]
    },
    "682001": {
        "city": "Kochi",
        "state": "Kerala",
        "services": ["Instamart", "BigBasket"]
    },
    "781001": {
        "city": "Guwahati",
        "state": "Assam",
        "services": ["Blinkit", "Zepto"]
    }
}


def search_pincode(pincode: str):
    """Return data for a PIN code."""
    return mock_data.get(pincode)