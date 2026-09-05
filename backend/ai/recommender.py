def rank_services(
    availability: list[dict],
    preference: str,
    intent: str,
) -> dict:
    """
    Rank AreaKart services using verified/estimated availability data.

    The engine deliberately does not invent:
    - price
    - delivery time / ETA
    - ratings
    - delivery fees

    Maximum results:
    - 1 recommendation
    - 3 alternatives
    """

    eligible = [
        item
        for item in availability
        if item.get("status") in {"available", "estimated"}
    ]

    if not eligible:
        return {
            "recommendation": "",
            "reason": (
                "No delivery service could be recommended "
                "for this location."
            ),
            "confidence": 0.0,
            "alternatives": [],
        }

    # --------------------------------
    # Preferences requiring live
    # commercial/user-rating data
    # --------------------------------

    if preference == "price":
        return unavailable_preference_response(
            eligible,
            (
                "AreaKart found delivery services for this location, "
                "but live price data is not currently available. "
                "The agent will not make an unsupported cheapest-price claim."
            ),
        )

    if preference == "free_delivery":
        return unavailable_preference_response(
            eligible,
            (
                "AreaKart found delivery services for this location, "
                "but live delivery-fee data is not currently available. "
                "The agent cannot verify which service currently offers "
                "free delivery."
            ),
        )

    if preference == "rating":
        return unavailable_preference_response(
            eligible,
            (
                "AreaKart found delivery services for this location, "
                "but live service-rating data is not currently available. "
                "The agent cannot make an unsupported best-rated claim."
            ),
        )

    # --------------------------------
    # Scoring
    # --------------------------------

    def score(item: dict) -> tuple:
        status = str(item.get("status", "")).lower()
        confidence = str(
            item.get("confidence", "")
        ).lower()
        service_type = str(
            item.get("type", "")
        ).lower()
        verification_level = str(
            item.get("verification_level", "")
        ).lower()

        status_score = {
            "available": 3,
            "estimated": 1,
        }.get(status, 0)

        confidence_score = {
            "high": 3,
            "medium": 2,
            "low": 1,
            "unknown": 0,
        }.get(confidence, 0)

        verification_score = {
            "pincode": 3,
            "pincode_coverage": 3,
            "official": 3,
            "city_coverage": 2,
            "none": 0,
        }.get(verification_level, 0)

        type_score = 0

        if intent == "grocery_delivery":
            if service_type == "grocery":
                type_score = 2
            elif service_type == "quick_commerce":
                type_score = 1

        # ----------------------------
        # Reliability
        # ----------------------------

        if preference == "reliability":
            return (
                confidence_score,
                verification_score,
                status_score,
                type_score,
            )

        # ----------------------------
        # Speed
        # ----------------------------

        if preference == "speed":

            quick_commerce_score = (
                2 if service_type == "quick_commerce" else 0
            )

            return (
                status_score,
                quick_commerce_score,
                confidence_score,
                verification_score,
                type_score,
            )

        # ----------------------------
        # Balanced
        # ----------------------------

        return (
            status_score,
            confidence_score,
            verification_score,
            type_score,
        )

    ranked = sorted(
        eligible,
        key=score,
        reverse=True,
    )

    # Maximum four services shown:
    # 1 recommendation + 3 alternatives
    ranked = ranked[:4]

    best = ranked[0]

    # --------------------------------
    # Recommendation confidence
    # --------------------------------

    confidence_value = str(
        best.get("confidence", "unknown")
    ).lower()

    if best.get("status") == "available":
        confidence = {
            "high": 0.90,
            "medium": 0.80,
            "low": 0.70,
        }.get(
            confidence_value,
            0.75,
        )

    elif confidence_value == "high":
        confidence = 0.75

    elif confidence_value == "medium":
        confidence = 0.65

    elif confidence_value == "low":
        confidence = 0.55

    else:
        confidence = 0.40

    # --------------------------------
    # Recommendation reason
    # --------------------------------

    service_type = str(
        best.get("type", "delivery")
    ).lower()

    status = best.get(
        "status",
        "estimated",
    )

    verification_level = best.get(
        "verification_level",
        "none",
    )

    if preference == "speed":

        if service_type == "quick_commerce":
            reason = (
                f"{best['name']} is recommended as the best match "
                "for your speed preference because it is a "
                "quick-commerce service with "
                f"{status} local availability. "
                "AreaKart does not currently have live ETA data."
            )
        else:
            reason = (
                f"{best['name']} is recommended based on its "
                f"{status} local availability. "
                "AreaKart does not currently have live ETA data."
            )

    elif preference == "reliability":

        reason = (
            f"{best['name']} is recommended for reliability because "
            f"it has {best.get('confidence', 'unknown')} verification "
            f"confidence and a {verification_level} verification level."
        )

    else:

        reason = (
            f"{best['name']} is recommended based on its "
            f"{status} local availability, "
            f"{best.get('confidence', 'unknown')} confidence, "
            "and service suitability."
        )

    return {
        "recommendation": best["name"],
        "reason": reason,
        "confidence": confidence,
        "alternatives": [
            item["name"]
            for item in ranked[1:4]
        ],
    }


def unavailable_preference_response(
    eligible: list[dict],
    reason: str,
) -> dict:
    """
    Return a safe response when the requested preference
    requires data AreaKart does not currently have.
    """

    return {
        "recommendation": "",
        "reason": reason,
        "confidence": 0.0,
        "alternatives": [
            item["name"]
            for item in eligible[:4]
        ],
    }