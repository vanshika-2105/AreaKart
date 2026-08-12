from services.verifiers.base_verifier import BaseVerifier
from services.verifiers.bigbasket_verifier import BigBasketVerifier

class EstimatedVerifier(BaseVerifier):
    """
    Temporary fallback verifier.

    Used when we do not yet have a reliable
    official verification mechanism for a service.
    """

    def verify(
        self,
        pincode: str,
        latitude: float,
        longitude: float,
    ):
        return {
            "status": "estimated",
            "confidence": "unknown",
            "message": "Availability has not been verified directly with the service.",
        }


VERIFIER_REGISTRY = {
    "Blinkit": EstimatedVerifier(),
    "Zepto": EstimatedVerifier(),
    "Instamart": EstimatedVerifier(),
    "BigBasket": BigBasketVerifier(),
    "JioMart": EstimatedVerifier(),
}