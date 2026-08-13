from data.service_coverage import (
    SERVICE_COVERAGE,
    CITY_SERVICE_COVERAGE,
)
from services.verifiers.base_verifier import BaseVerifier


class CoverageVerifier(BaseVerifier):

    def __init__(self, service_name: str):
        self.service_name = service_name

    def verify(
        self,
        pincode: str,
        latitude: float,
        longitude: float,
        city: str = "",
    ):
        """
        Check service availability using:
        1. PIN-level coverage
        2. City-level coverage
        3. Fallback estimate
        """

        # -----------------------------
        # 1. Check PIN-level coverage
        # -----------------------------
        pincode_coverage = SERVICE_COVERAGE.get(pincode, {})
        coverage = pincode_coverage.get(self.service_name)

        if coverage:
            return {
                "status": coverage["status"],
                "confidence": coverage["confidence"],
                "message": "Availability based on PIN-level coverage data.",
            }

        # -----------------------------
        # 2. Check city-level coverage
        # -----------------------------
        city_key = city.strip().lower()

        city_coverage = CITY_SERVICE_COVERAGE.get(city_key, {})
        coverage = city_coverage.get(self.service_name)

        if coverage:
            return {
                "status": coverage["status"],
                "confidence": coverage["confidence"],
                "message": "Availability based on city-level coverage data.",
            }

        # -----------------------------
        # 3. Fallback
        # -----------------------------
        return {
            "status": "estimated",
            "confidence": "unknown",
            "message": (
                "No PIN-specific or city-level coverage data found. "
                "Availability is estimated."
            ),
        }