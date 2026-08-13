from services.verifiers.coverage_verifier import CoverageVerifier


VERIFIER_REGISTRY = {
    "Blinkit": CoverageVerifier("Blinkit"),
    "Zepto": CoverageVerifier("Zepto"),
    "Instamart": CoverageVerifier("Instamart"),
    "BigBasket": CoverageVerifier("BigBasket"),
    "JioMart": CoverageVerifier("JioMart"),
}