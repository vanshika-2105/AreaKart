class VerificationResult:

    @staticmethod
    def verified(message: str):
        return {
            "status": "verified",
            "confidence": "high",
            "message": message,
        }

    @staticmethod
    def estimated(message: str, confidence: str = "medium"):
        return {
            "status": "estimated",
            "confidence": confidence,
            "message": message,
        }

    @staticmethod
    def unavailable(message: str):
        return {
            "status": "unavailable",
            "confidence": "high",
            "message": message,
        }

    @staticmethod
    def unknown(message: str):
        return {
            "status": "unknown",
            "confidence": "unknown",
            "message": message,
        }