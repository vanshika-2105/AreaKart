import requests

from data.city_aliases import normalize_city
from data.official_city_coverage import OFFICIAL_CITY_COVERAGE
from data.service_coverage import CITY_SERVICE_COVERAGE
from services.availability_service import get_available_services
from services.service_registry import SERVICE_REGISTRY
from services.verifiers.verifier_registry import VERIFIER_REGISTRY


def get_location_from_coordinates(latitude: float, longitude: float):
    """
    Determine delivery-service availability primarily from
    the user's GPS-derived locality.

    PIN is used as a fallback/supporting location identifier.
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
        # 1. Get PIN
        # --------------------------------
        pincode = address.get("postcode")

        if pincode:
            pincode = pincode.strip()

        # --------------------------------
        # 2. Get the most useful locality
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
        # 3. GPS-FIRST SERVICE RESOLUTION
        # --------------------------------
        availability = []
        services = []

        # Try official city coverage first
        for service_name, service_data in OFFICIAL_CITY_COVERAGE.items():

            official_cities = service_data.get("cities", [])

            if city in [
                normalize_city(c)
                for c in official_cities
            ]:

                service_info = SERVICE_REGISTRY.get(
                    service_name
                )

                verifier = VERIFIER_REGISTRY.get(
                    service_name
                )

                if service_info is None or verifier is None:
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
        # 4. Try city-level coverage data
        # --------------------------------
        city_coverage = CITY_SERVICE_COVERAGE.get(
            city,
            {}
        )

        for service_name, coverage_data in city_coverage.items():

            if service_name in services:
                continue

            service_info = SERVICE_REGISTRY.get(
                service_name
            )

            verifier = VERIFIER_REGISTRY.get(
                service_name
            )

            if service_info is None or verifier is None:
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
        # 5. PIN fallback
        # --------------------------------
        if not services and pincode:

            pin_result = get_available_services(
                pincode
            )

            if pin_result is not None:

                pin_result["latitude"] = latitude
                pin_result["longitude"] = longitude

                return pin_result

        # --------------------------------
        # 6. Return GPS-based result
        # --------------------------------
        return {
            "pincode": pincode or "",
            "city": city,
            "state": state,
            "latitude": latitude,
            "longitude": longitude,
            "services": services,
            "availability": availability,
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