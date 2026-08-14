from services.verifiers.smart_verifier import SmartVerifier


VERIFIER_REGISTRY = {
    "Blinkit": SmartVerifier("Blinkit"),
    "Zepto": SmartVerifier("Zepto"),
    "Instamart": SmartVerifier("Instamart"),
    "BigBasket": SmartVerifier("BigBasket"),
    "JioMart": SmartVerifier("JioMart"),
}