from data.official_city_coverage import OFFICIAL_CITY_COVERAGE
from data.official_pincode_coverage import OFFICIAL_PINCODE_COVERAGE
from services.verifiers.base_verifier import BaseVerifier
from services.verifiers.verification_result import VerificationResult


class OfficialVerifier(BaseVerifier):

    def __init__(self, service_name: str):
        self.service_name = service_name

    def verify(
        self,
        pincode: str,
        latitude=None,
        longitude=None,
        city: str = None,
    ):
        # --------------------------------
        # 1. Official PIN-level verification
        # --------------------------------
        pincode_service_data = OFFICIAL_PINCODE_COVERAGE.get(
            self.service_name
        )

        if pincode_service_data:
            if pincode in pincode_service_data.get(
                "verified_pincodes", []
            ):
                return VerificationResult.verified(
                    f"{self.service_name} is officially verified "
                    f"for PIN code {pincode}."
                )

            if pincode in pincode_service_data.get(
                "unavailable_pincodes", []
            ):
                return VerificationResult.unavailable(
                    f"{self.service_name} is officially unavailable "
                    f"for PIN code {pincode}."
                )

        # --------------------------------
        # 2. Official city-level verification
        # --------------------------------
        service_data = OFFICIAL_CITY_COVERAGE.get(self.service_name)

        if service_data:
            city_key = city.strip().lower() if city else ""
            official_cities = service_data.get("cities", [])

            if city_key in official_cities:
                return VerificationResult.verified(
                    f"{self.service_name} is listed in official "
                    "city coverage data."
                )

        # --------------------------------
        # 3. No official verification found
        # --------------------------------
        return VerificationResult.unknown(
            f"{self.service_name} has not been verified "
            "from an official source."
        )