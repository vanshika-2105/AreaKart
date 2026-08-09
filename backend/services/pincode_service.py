import requests


class PincodeService:

    @staticmethod
    def get_location(pincode: str):

        url = f"https://api.postalpincode.in/pincode/{pincode}"

        try:
            # --------------------------------
            # Get location from India Post
            # --------------------------------

            response = requests.get(
                url,
                timeout=10,
                headers={
                    "User-Agent": "AreaKart/1.0"
                },
            )

            response.raise_for_status()

            data = response.json()

            if not data:
                return None

            if data[0]["Status"] != "Success":
                return None

            if not data[0].get("PostOffice"):
                return None

            office = data[0]["PostOffice"][0]

            city = office["District"]
            state = office["State"]

            # --------------------------------
            # Get coordinates dynamically
            # --------------------------------

            coordinates_url = "https://nominatim.openstreetmap.org/search"

            latitude = None
            longitude = None

            try:

                # First: search using exact PIN code
                params = {
                    "postalcode": pincode,
                    "country": "India",
                    "format": "jsonv2",
                    "limit": 1,
                }

                coordinates_response = requests.get(
                    coordinates_url,
                    params=params,
                    timeout=10,
                    headers={
                        "User-Agent": "AreaKart/1.0"
                    },
                )

                coordinates_response.raise_for_status()

                coordinates_data = coordinates_response.json()

                if coordinates_data:
                    latitude = float(coordinates_data[0]["lat"])
                    longitude = float(coordinates_data[0]["lon"])

                # --------------------------------
                # Fallback: city + state
                # --------------------------------

                if latitude is None or longitude is None:

                    params = {
                        "city": city,
                        "state": state,
                        "country": "India",
                        "format": "jsonv2",
                        "limit": 1,
                    }

                    coordinates_response = requests.get(
                        coordinates_url,
                        params=params,
                        timeout=10,
                        headers={
                            "User-Agent": "AreaKart/1.0"
                        },
                    )

                    coordinates_response.raise_for_status()

                    coordinates_data = coordinates_response.json()

                    if coordinates_data:
                        latitude = float(coordinates_data[0]["lat"])
                        longitude = float(coordinates_data[0]["lon"])

            except requests.exceptions.RequestException as e:
                print("Coordinate API Error:", e)

            # --------------------------------
            # Known PIN fallback coordinates
            # --------------------------------

            fallback_coordinates = {
                "110001": {
                    "latitude": 28.6328,
                    "longitude": 77.2197,
                },

                "250002": {
                    "latitude": 28.9845,
                    "longitude": 77.7064,
                },

                "400001": {
                    "latitude": 18.9388,
                    "longitude": 72.8354,
                },

                "560001": {
                    "latitude": 12.9716,
                    "longitude": 77.5946,
                },
            }

            if latitude is None or longitude is None:

                fallback = fallback_coordinates.get(pincode)

                if fallback:
                    latitude = fallback["latitude"]
                    longitude = fallback["longitude"]

            # --------------------------------
            # Return final location
            # --------------------------------

            return {
                "city": city,
                "state": state,
                "pincode": pincode,
                "latitude": latitude,
                "longitude": longitude,
            }

        except requests.exceptions.RequestException as e:
            print("Pincode API Error:", e)
            return None