from ai.planner import plan_and_execute


def run_agent(message: str, pincode: str) -> dict:
    """
    Execute the AreaKart agentic recommendation workflow.
    """

    return plan_and_execute(
        message=message,
        pincode=pincode,
    )
