from services.verifiers.base_verifier import BaseVerifier
from services.verifiers.coverage_verifier import CoverageVerifier
from services.verifiers.official_verifier import OfficialVerifier


class SmartVerifier(BaseVerifier):

    def __init__(self, service_name: str):
        self.service_name = service_name
        self.coverage_verifier = CoverageVerifier(service_name)
        self.official_verifier = OfficialVerifier(service_name)

    def verify(
        self,
        pincode: str,
        latitude=None,
        longitude=None,
        city: str = None,
    ):
        # First check official verification
        official_result = self.official_verifier.verify(
            pincode=pincode,
            latitude=latitude,
            longitude=longitude,
            city=city,
        )

        # If officially verified, use that result
        if official_result["status"] in ["verified", "unavailable"]:
            return official_result

        # Otherwise use our coverage-based verification
        return self.coverage_verifier.verify(
            pincode=pincode,
            latitude=latitude,
            longitude=longitude,
            city=city,
        )