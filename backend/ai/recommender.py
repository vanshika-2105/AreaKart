def rank_services(
    availability: list[dict],
    preference: str,
    intent: str,
) -> dict:
    """
    Rank services using AreaKart's verified availability data.

    The engine deliberately does not invent price, delivery-time,
    or other unavailable commercial attributes.
    """

    eligible = [
        item
        for item in availability
        if item.get("status") in {"available", "estimated"}
    ]

    if not eligible:
        return {
            "recommendation": "",
            "reason": "No delivery service could be recommended for this location.",
            "confidence": 0.0,
            "alternatives": [],
        }

    def score(item: dict) -> tuple:
        status = item.get("status", "")
        confidence = str(item.get("confidence", "")).lower()
        service_type = str(item.get("type", "")).lower()

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

        type_score = 0

        if intent == "grocery_delivery":
            if service_type == "grocery":
                type_score = 2
            elif service_type == "quick_commerce":
                type_score = 1

        if preference == "reliability":
            return (
                confidence_score,
                status_score,
                type_score,
            )

        if preference == "speed":
            if service_type == "quick_commerce":
                type_score += 2

            return (
                status_score,
                type_score,
                confidence_score,
            )

        # Price preference cannot be measured because AreaKart
        # currently has no price dataset. Prefer verified availability
        # without making a false price claim.
        return (
            status_score,
            confidence_score,
            type_score,
        )

    ranked = sorted(
        eligible,
        key=score,
        reverse=True,
    )

    best = ranked[0]

    confidence_value = str(
        best.get("confidence", "unknown")
    ).lower()

    if best.get("status") == "available":
        confidence = {
            "high": 0.90,
            "medium": 0.80,
            "low": 0.70,
        }.get(confidence_value, 0.75)
    else:
        confidence = 0.65

    if preference == "price":
        reason = (
            f"{best['name']} is the best verified match available. "
            "AreaKart does not currently have live price data, "
            "so the agent does not make an unsupported cheapest-price claim."
        )

    elif preference == "speed":
        reason = (
            f"{best['name']} is recommended because it is "
            f"{best.get('status', 'available')} for this location "
            "and quick-commerce services are preferred for speed."
        )

    elif preference == "reliability":
        reason = (
            f"{best['name']} is recommended based on its "
            f"{best.get('status', 'available')} status and "
            f"{best.get('confidence', 'unknown')} verification confidence."
        )

    else:
        reason = (
            f"{best['name']} is recommended based on verified "
            "local availability and service suitability."
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
