class VerificationResult:

    @staticmethod
    def verified(
        message: str,
        verification_level: str = "pincode",
    ):
        return {
            "status": "verified",
            "confidence": "high",
            "verification_level": verification_level,
            "message": message,
        }

    @staticmethod
    def estimated(
        message: str,
        confidence: str = "medium",
        verification_level: str = "coverage",
    ):
        return {
            "status": "estimated",
            "confidence": confidence,
            "verification_level": verification_level,
            "message": message,
        }

    @staticmethod
    def unavailable(
        message: str,
        verification_level: str = "pincode",
    ):
        return {
            "status": "unavailable",
            "confidence": "high",
            "verification_level": verification_level,
            "message": message,
        }

    @staticmethod
    def unknown(message: str):
        return {
            "status": "unknown",
            "confidence": "unknown",
            "verification_level": "none",
            "message": message,
        }