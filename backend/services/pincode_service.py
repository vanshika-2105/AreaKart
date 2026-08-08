import requests


class PincodeService:

    @staticmethod
    def get_location(pincode: str):

        url = f"https://api.postalpincode.in/pincode/{pincode}"

        try:
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

            office = data[0]["PostOffice"][0]

            city = office["District"]
            state = office["State"]

            # --------------------------------
            # Get coordinates dynamically
            # --------------------------------

            coordinates_url = "https://nominatim.openstreetmap.org/search"

            params = {
                "city": city,
                "state": state,
                "country": "India",
                "postalcode": pincode,
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

            latitude = None
            longitude = None

            if coordinates_data:
                latitude = float(coordinates_data[0]["lat"])
                longitude = float(coordinates_data[0]["lon"])

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