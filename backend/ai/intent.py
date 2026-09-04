def extract_intent(message: str) -> dict:
    """
    Lightweight intent extraction for the AreaKart AI agent.

    The result is deliberately constrained to known commerce intents
    so the recommendation layer remains predictable.
    """

    text = message.lower().strip()

    intent = "delivery_search"
    preference = "balanced"

    if any(word in text for word in [
        "grocery",
        "groceries",
        "food",
        "vegetables",
        "milk",
        "daily needs",
    ]):
        intent = "grocery_delivery"

    if any(word in text for word in [
        "cheap",
        "cheapest",
        "lowest price",
        "budget",
        "affordable",
    ]):
        preference = "price"

    elif any(word in text for word in [
        "fast",
        "fastest",
        "quick",
        "quickest",
        "urgent",
    ]):
        preference = "speed"

    elif any(word in text for word in [
        "reliable",
        "trusted",
        "verified",
    ]):
        preference = "reliability"

    return {
        "intent": intent,
        "preference": preference,
    }
