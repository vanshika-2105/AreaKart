from data.service_coverage import (
    SERVICE_COVERAGE,
    CITY_SERVICE_COVERAGE,
)
from data.city_aliases import normalize_city

from services.verifiers.base_verifier import BaseVerifier
from services.verifiers.verification_result import VerificationResult


class CoverageVerifier(BaseVerifier):

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
        # 1. PIN-level coverage
        # --------------------------------
        pincode_coverage = SERVICE_COVERAGE.get(pincode, {})

        if self.service_name in pincode_coverage:
            data = pincode_coverage[self.service_name]

            return VerificationResult.estimated(
            "Availability based on PIN-level coverage data.",
             data.get("confidence", "medium"),
             "pincode_coverage"
)

        # --------------------------------
        # 2. City-level coverage
        # --------------------------------
        city_key = normalize_city(city)
        city_coverage = CITY_SERVICE_COVERAGE.get(city_key, {})

        if self.service_name in city_coverage:
            data = city_coverage[self.service_name]

            return VerificationResult.estimated(
    "Availability based on city-level coverage data.",
    data.get("confidence", "medium"),
    "city_coverage"
)


        # --------------------------------
        # 3. No coverage data
        # --------------------------------
        return VerificationResult.unknown(
            "No PIN-specific or city-level coverage data found. "
            "Availability is unknown."
        )