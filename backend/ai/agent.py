from ai.intent import extract_intent
from ai.recommender import rank_services
from services.availability_service import get_available_services


def run_agent(message: str, pincode: str) -> dict:
    """
    Execute the AreaKart AI recommendation workflow.

    The agent:
    1. Understands the user's request.
    2. Retrieves verified local service availability.
    3. Ranks eligible services.
    4. Produces an explainable recommendation.
    """

    intent_data = extract_intent(message)

    location_result = get_available_services(pincode)

    if location_result is None:
        return {
            "recommendation": "",
            "reason": "Unable to find delivery services for this PIN code.",
            "confidence": 0.0,
            "alternatives": [],
            "intent": intent_data["intent"],
            "preference": intent_data["preference"],
        }

    result = rank_services(
        availability=location_result.get("availability", []),
        preference=intent_data["preference"],
        intent=intent_data["intent"],
    )

    return {
        **result,
        "intent": intent_data["intent"],
        "preference": intent_data["preference"],
    }
