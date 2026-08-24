import requests

from data.city_aliases import normalize_city
from services.service_registry import SERVICE_REGISTRY
from services.verifiers.verifier_registry import VERIFIER_REGISTRY
from services.availability_service import get_available_services


def get_location_from_coordinates(
    latitude: float,
    longitude: float,
):
    """
    Resolve a user's GPS coordinates and determine
    delivery-service availability.

    Priority:
        1. GPS-derived city/locality
        2. Official city verification
        3. Coverage verification
        4. PIN-based fallback
    """

    url = "https://nominatim.openstreetmap.org/reverse"

    params = {
        "lat": latitude,
        "lon": longitude,
        "format": "jsonv2",
        "zoom": 18,
        "addressdetails": 1,
    }

    try:
        # --------------------------------
        # 1. Reverse geocoding
        # --------------------------------

        response = requests.get(
            url,
            params=params,
            timeout=10,
            headers={
                "User-Agent": "AreaKart/1.0"
            },
        )

        response.raise_for_status()

        data = response.json()

        address = data.get("address", {})

        # --------------------------------
        # 2. Get PIN
        # --------------------------------

        pincode = address.get("postcode")

        if pincode:
            pincode = pincode.strip()

        # --------------------------------
        # 3. Determine locality/city
        # --------------------------------

        raw_city = (
            address.get("city")
            or address.get("town")
            or address.get("municipality")
            or address.get("village")
            or address.get("suburb")
            or address.get("county")
            or ""
        )

        city = normalize_city(raw_city)

        state = address.get("state", "")

        # --------------------------------
        # 4. GPS-FIRST VERIFICATION
        # --------------------------------

        services = []
        availability = []

        for service_name, service_info in SERVICE_REGISTRY.items():

            verifier = VERIFIER_REGISTRY.get(service_name)

            if verifier is None:
                continue

            result = verifier.verify(
                pincode=pincode or "",
                latitude=latitude,
                longitude=longitude,
                city=city,
            )

            services.append(service_name)

            availability.append(
                {
                    "name": service_name,
                    "type": service_info["type"],
                    "verification_method": service_info[
                        "verification_method"
                    ],
                    "status": result["status"],
                    "confidence": result["confidence"],
                    "message": result["message"],
                }
            )

        # --------------------------------
        # 5. Return GPS-based result
        # --------------------------------

        if services:
            return {
                "pincode": pincode or "",
                "city": city,
                "state": state,
                "latitude": latitude,
                "longitude": longitude,
                "services": services,
                "availability": availability,
            }

        # --------------------------------
        # 6. PIN FALLBACK
        # --------------------------------

        if pincode:

            pin_result = get_available_services(
                pincode
            )

            if pin_result is not None:

                pin_result["latitude"] = latitude
                pin_result["longitude"] = longitude

                return pin_result

        # --------------------------------
        # 7. Nothing found
        # --------------------------------

        return {
            "pincode": pincode or "",
            "city": city,
            "state": state,
            "latitude": latitude,
            "longitude": longitude,
            "services": [],
            "availability": [],
        }

    except requests.exceptions.RequestException as e:

        print(
            "Reverse Geocoding Error:",
            e
        )

        return None

    except Exception as e:

        print(
            "Location Service Error:",
            e
        )

        return None