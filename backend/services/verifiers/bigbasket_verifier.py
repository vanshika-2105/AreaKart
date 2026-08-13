from data.service_coverage import SERVICE_COVERAGE
from services.verifiers.base_verifier import BaseVerifier


class BigBasketVerifier(BaseVerifier):

    def verify(
        self,
        pincode: str,
        latitude: float,
        longitude: float,
    ):
        """
        Check BigBasket availability using PIN-level coverage data.
        """

        pincode_coverage = SERVICE_COVERAGE.get(pincode, {})

        coverage = pincode_coverage.get("BigBasket")

        if coverage:
            return {
                "status": coverage["status"],
                "confidence": coverage["confidence"],
                "message": "Availability based on PIN-level coverage data.",
            }

        return {
            "status": "estimated",
            "confidence": "unknown",
            "message": (
                "No PIN-specific coverage data found. "
                "Availability is estimated."
            ),
        }