from services.search_service import search_pincode


def get_available_services(pincode: str):
    return search_pincode(pincode)