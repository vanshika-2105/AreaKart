from services.verifiers.base_verifier import BaseVerifier


class BigBasketVerifier(BaseVerifier):

    def verify(
        self,
        pincode: str,
        latitude: float,
        longitude: float,
    ):
        """
        Verify BigBasket availability for a pincode.

        Currently returns estimated status until a reliable
        official verification mechanism is available.
        """

        return {
            "status": "estimated",
            "confidence": "unknown",
            "message": (
                "BigBasket availability requires direct "
                "pincode/address verification."
            ),
        }