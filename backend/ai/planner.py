from ai.intent import extract_intent
from ai.tools.availability_tool import check_availability
from ai.tools.recommendation_tool import recommend_services


def plan_and_execute(
    message: str,
    pincode: str,
) -> dict:
    """
    AreaKart agent planner.

    The planner decides which AreaKart tools are required,
    executes them, and returns both the result and an
    explainable execution trace.
    """

    steps = []

    # Step 1: Understand the user's request
    intent_data = extract_intent(message)

    steps.append({
        "step": 1,
        "action": "understand_request",
        "result": {
            "intent": intent_data["intent"],
            "preference": intent_data["preference"],
        },
    })

    # Step 2: Check local availability
    steps.append({
        "step": 2,
        "action": "check_availability",
        "tool": "check_availability",
        "input": {
            "pincode": pincode,
        },
    })

    availability_result = check_availability(pincode)

    steps[-1]["result"] = {
        "success": availability_result["success"],
        "city": availability_result.get("city", ""),
        "service_count": len(
            availability_result.get("services", [])
        ),
    }

    if not availability_result["success"]:
        return {
            "recommendation": "",
            "reason": availability_result["message"],
            "confidence": 0.0,
            "alternatives": [],
            "intent": intent_data["intent"],
            "preference": intent_data["preference"],
            "agent_steps": steps,
        }

    # Step 3: Rank available services
    steps.append({
        "step": 3,
        "action": "rank_services",
        "tool": "recommend_services",
        "input": {
            "preference": intent_data["preference"],
            "intent": intent_data["intent"],
        },
    })

    recommendation = recommend_services(
        availability=availability_result["availability"],
        preference=intent_data["preference"],
        intent=intent_data["intent"],
    )

    steps[-1]["result"] = {
        "recommendation": recommendation["recommendation"],
        "alternatives": recommendation["alternatives"],
    }

    # Step 4: Produce final decision
    steps.append({
        "step": 4,
        "action": "produce_recommendation",
        "result": {
            "recommendation": recommendation["recommendation"],
            "confidence": recommendation["confidence"],
        },
    })

    return {
        **recommendation,
        "intent": intent_data["intent"],
        "preference": intent_data["preference"],
        "agent_steps": steps,
    }
