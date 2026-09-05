from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


# ---------------------------------------------------------
# SEARCH ENDPOINT
# ---------------------------------------------------------


def test_search_valid_pincode():
    response = client.post(
        "/search",
        json={"pincode": "250002"},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["pincode"] == "250002"
    assert data["city"] == "Meerut"
    assert data["state"] == "Uttar Pradesh"

    assert "services" in data
    assert "availability" in data

    assert "Blinkit" in data["services"]
    assert "Instamart" in data["services"]
    assert "BigBasket" in data["services"]


def test_search_invalid_pincode():
    response = client.post(
        "/search",
        json={"pincode": "999999"},
    )

    assert response.status_code in {200, 404}


# ---------------------------------------------------------
# AI RECOMMENDATION — SPEED
# ---------------------------------------------------------


def test_ai_recommend_fastest_grocery_delivery():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I need the fastest grocery delivery",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendation"] == "Blinkit"
    assert data["intent"] == "grocery_delivery"
    assert data["preference"] == "speed"

    assert data["confidence"] == 0.65

    assert "Instamart" in data["alternatives"]
    assert "BigBasket" in data["alternatives"]

    assert len(data["agent_steps"]) == 4


# ---------------------------------------------------------
# AI RECOMMENDATION — RELIABILITY
# ---------------------------------------------------------


def test_ai_recommend_reliable_grocery_service():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I want a reliable grocery service",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendation"] == "BigBasket"
    assert data["intent"] == "grocery_delivery"
    assert data["preference"] == "reliability"

    assert data["confidence"] == 0.65

    assert "Blinkit" in data["alternatives"]
    assert "Instamart" in data["alternatives"]

    assert len(data["agent_steps"]) == 4


# ---------------------------------------------------------
# AI SAFETY — PRICE
# ---------------------------------------------------------


def test_ai_does_not_invent_cheapest_price():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I want cheap groceries",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendation"] == ""
    assert data["preference"] == "price"
    assert data["confidence"] == 0.0

    assert "live price data" in data["reason"]

    assert "Blinkit" in data["alternatives"]
    assert "Instamart" in data["alternatives"]
    assert "BigBasket" in data["alternatives"]


# ---------------------------------------------------------
# AI SAFETY — FREE DELIVERY
# ---------------------------------------------------------


def test_ai_does_not_invent_free_delivery():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I want delivery without any delivery fee",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendation"] == ""
    assert data["preference"] == "free_delivery"
    assert data["confidence"] == 0.0

    assert "delivery-fee data" in data["reason"]


# ---------------------------------------------------------
# AI SAFETY — RATINGS
# ---------------------------------------------------------


def test_ai_does_not_invent_best_rating():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "Which app is best rated?",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendation"] == ""
    assert data["preference"] == "rating"
    assert data["confidence"] == 0.0

    assert "service-rating data" in data["reason"]


# ---------------------------------------------------------
# AGENT WORKFLOW
# ---------------------------------------------------------


def test_agent_steps_are_present():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I need the fastest grocery delivery",
            "pincode": "250002",
        },
    )

    assert response.status_code == 200

    steps = response.json()["agent_steps"]

    assert len(steps) == 4

    assert steps[0]["step"] == 1
    assert steps[0]["action"] == "understand_request"

    assert steps[1]["step"] == 2
    assert steps[1]["action"] == "check_availability"

    assert steps[2]["step"] == 3
    assert steps[2]["action"] == "rank_services"

    assert steps[3]["step"] == 4
    assert steps[3]["action"] == "produce_recommendation"


# ---------------------------------------------------------
# UNSUPPORTED LOCATION
# ---------------------------------------------------------


def test_ai_unknown_pincode():
    response = client.post(
        "/ai/recommend",
        json={
            "message": "I need the fastest grocery delivery",
            "pincode": "999999",
        },
    )

    assert response.status_code in {200, 404}

    if response.status_code == 200:
        data = response.json()

        assert data["recommendation"] == ""
        assert data["confidence"] == 0.0