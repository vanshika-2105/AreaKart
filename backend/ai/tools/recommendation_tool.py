from ai.recommender import rank_services


def recommend_services(
    availability: list[dict],
    preference: str,
    intent: str,
) -> dict:
    """
    Agent tool for ranking verified AreaKart services.
    """

    return rank_services(
        availability=availability,
        preference=preference,
        intent=intent,
    )
