def extract_intent(message: str) -> dict:
    """
    Lightweight intent extraction for the AreaKart AI agent.

    The result is deliberately constrained to known commerce intents
    so the recommendation layer remains predictable.
    """

    text = message.lower().strip()

    intent = "delivery_search"
    preference = "balanced"

    # --------------------------------
    # Intent detection
    # --------------------------------

    grocery_keywords = [
        "grocery",
        "groceries",
        "food",
        "vegetables",
        "vegetable",
        "milk",
        "fruits",
        "fruit",
        "daily needs",
        "daily essentials",
        "household",
        "ration",
        "supermarket",
    ]

    if any(word in text for word in grocery_keywords):
        intent = "grocery_delivery"

    # --------------------------------
    # Preference detection
    #
    # Order matters:
    # price → free delivery → rating → speed → reliability
    # --------------------------------

    price_keywords = [
        "cheap",
        "cheapest",
        "lowest price",
        "lowest cost",
        "low cost",
        "budget",
        "budget friendly",
        "budget-friendly",
        "affordable",
        "economical",
        "save money",
        "don't want to spend much",
        "do not want to spend much",
    ]

    free_delivery_keywords = [
        "free delivery",
        "free shipping",
        "no delivery fee",
        "no delivery fees",
        "zero delivery fee",
        "zero delivery fees",
        "without any delivery fee",
        "without any delivery fees",
        "without delivery fee",
        "without delivery fees",
        "no extra delivery charge",
        "no delivery charge",
        "without any delivery charge",
        "without delivery charge",
    ]

    rating_keywords = [
        "best rated",
        "best-rated",
        "highest rated",
        "highest-rated",
        "top rated",
        "top-rated",
        "rating",
        "ratings",
        "reviews",
        "reviewed",
        "best reviewed",
        "best-reviewed",
        "good reviews",
    ]

    speed_keywords = [
        "fast",
        "fastest",
        "quick",
        "quickest",
        "quickly",
        "urgent",
        "urgently",
        "as soon as possible",
        "asap",
        "speed",
        "speedy",
        "in a hurry",
        "right away",
    ]

    reliability_keywords = [
        "reliable",
        "reliability",
        "trusted",
        "trustworthy",
        "trust",
        "verified",
        "dependable",
        "safe",
        "consistent",
    ]

    if any(word in text for word in price_keywords):
        preference = "price"

    elif any(word in text for word in free_delivery_keywords):
        preference = "free_delivery"

    elif any(word in text for word in rating_keywords):
        preference = "rating"

    elif any(word in text for word in speed_keywords):
        preference = "speed"

    elif any(word in text for word in reliability_keywords):
        preference = "reliability"

    return {
        "intent": intent,
        "preference": preference,
    }