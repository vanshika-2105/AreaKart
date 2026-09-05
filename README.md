# AreaKart

AreaKart is a location-based delivery service discovery platform that helps users identify which grocery and instant-delivery services are available for a given PIN code.

The project also includes an AI-powered agentic recommendation system that understands a user's delivery preference, checks service availability, ranks eligible services, and provides a recommendation with an explanation and alternatives.

---

## Key Features

### Location & Service Discovery

- Search delivery availability using a PIN code
- Detect location information associated with supported PIN codes
- Display available delivery services
- Provide service verification and availability information
- Support multiple delivery platforms

### AI Agentic Recommendation

Users can express requests such as:

- "I need the fastest grocery delivery"
- "I want a reliable grocery service"
- "I want cheap groceries"
- "I want delivery without any delivery fee"
- "Which app is best rated?"

The AI recommendation pipeline:

1. Understands the user's request
2. Identifies the delivery intent and preference
3. Checks service availability
4. Ranks eligible services
5. Produces a recommendation and explanation
6. Provides alternatives where appropriate

The system is designed to avoid unsupported claims when live commercial data is unavailable.

For example, the system does not claim that a service is the cheapest, highest-rated, or offers free delivery unless the required data is available.

---

## AI Recommendation Architecture

```text
User Request
     |
     v
Intent Understanding
     |
     v
Agent Planner
     |
     v
Availability Tool
     |
     v
Recommendation Tool
     |
     v
Service Ranking Engine
     |
     v
Recommendation + Reason + Confidence + Alternatives


AGENT COMPONENTS


backend/
└── ai/
    ├── agent.py
    ├── intent.py
    ├── planner.py
    ├── recommender.py
    ├── schemas.py
    └── tools/
        ├── availability_tool.py
        ├── location_tool.py
        └── recommendation_tool.py


CURRENT DATA MODEL 



AreaKart currently uses verified or estimated service coverage information.

The recommendation engine deliberately does not invent:

Delivery prices
Delivery fees
Live ETA
Service ratings
Other unavailable commercial data

When a requested preference requires unavailable live data, the system returns a transparent response instead of making an unsupported claim.

Example

User preference: Price

Result:

Live price data is not currently available.

No unsupported cheapest-price claim is made.

Available services are returned as alternatives.



TECHNOLOGY STACK 



Frontend
#  Next.js
#  TypeScript
#  Tailwind CSS
Backend
#  Python
#  FastAPI
#  Pydantic
#  SQLAlchemy
Database
#  PostgreSQL
Testing
#  pytest
#  FastAPI TestClient
Deployment
#  Vercel
#  Railway


PROJECT STRUCTURE


AreaKart/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── AIRecommendation.tsx
│   │   ├── HomeClient.tsx
│   │   └── SearchBar.tsx
│   └── ...
│
├── backend/
│   ├── ai/
│   │   ├── agent.py
│   │   ├── intent.py
│   │   ├── planner.py
│   │   ├── recommender.py
│   │   ├── schemas.py
│   │   └── tools/
│   │
│   ├── api/
│   ├── data/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── tests/
│   ├── main.py
│   └── requirements.txt
│
├── docs/
├── assets/
├── .gitignore
└── README.md


BACKEND SETUP  


Navigate to the backend:

cd backend

Create the virtual environment:

python -m venv venv

Activate the virtual environment:

.\venv\Scripts\Activate.ps1

Install dependencies:

python -m pip install -r requirements.txt

Run the backend:

python -m uvicorn main:app --reload

The API runs at:

http://127.0.0.1:8000


FRONTEND SETUP 



Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend can then be accessed through the local Next.js development URL.


API EXAMPLES


Search Service Availability

Endpoint:

POST /search

Example request:

{
  "pincode": "250002"
}

The response includes information such as:

PIN code
City
State
Coordinates
Available services
Availability information
Verification information



AI RECOMMANDATION


Endpoint:

POST /ai/recommend

Example request:

{
  "message": "I need the fastest grocery delivery",
  "pincode": "250002"
}

Example response:

{
  "recommendation": "Blinkit",
  "reason": "Blinkit is recommended as the best match for your speed preference because it is a quick-commerce service with estimated local availability. AreaKart does not currently have live ETA data.",
  "confidence": 0.65,
  "alternatives": [
    "Instamart",
    "BigBasket"
  ],
  "intent": "grocery_delivery",
  "preference": "speed"
}


AI SAFETY AND TRANSPENCY 



AreaKart follows a conservative recommendation strategy.

If required information is unavailable, the recommendation engine does not fabricate a result.

For example:

Price Preference
       |
       v
Is live price data available?
       |
   +---+---+
   |       |
  Yes      No
   |       |
   v       v
 Rank    Do not claim
services cheapest service

The same principle is applied to:

Price
Delivery fees
Ratings
Live delivery ETA

This allows the recommendation system to remain transparent about the limitations of its current data.



TESTING


Backend tests are located in:

backend/tests/
Run Backend Tests

Navigate to the backend:

cd backend

Activate the virtual environment:

.\venv\Scripts\Activate.ps1

Run the test suite:

python -m pytest -q
Current Verification
9 passed
Additional Backend Validation

Compile the backend modules:

python -m compileall ai api services schemas models data main.py

Expected result:

Compilation successful
Backend Import Verification
python -c "from main import app; print('Backend import successful')"

Expected result:

Backend import successful
Frontend Production Build

Navigate to the frontend:

cd frontend

Run:

npm run build

The production build completes successfully.



SUPPORTED RECOMMENDATION PREFERENCES



Preference	                         Behavior
Speed	                            Prioritizes quick-commerce services and availability
Reliability	                       Prioritizes verification confidence and verification level
Price	                           Safely declines unsupported cheapest-price claims without live price data
Free Delivery	                   Safely declines unsupported free-delivery claims without live fee data
Rating	                           Safely declines unsupported rating claims without live rating data
Balanced	                       Uses availability, confidence, verification, and service suitability



DATA LIMITATIONS



The current implementation uses service coverage and verification data rather than live commercial APIs.

Therefore:

Availability may be estimated
Delivery ETA is not currently live
Prices are not currently live
Delivery fees are not currently live
Service ratings are not currently live

These limitations are intentionally communicated to the user rather than hidden.



GIT WORKFLOW



The project uses feature branches for development.

Current AI Recommendation Branch
feature/ai-agentic-recommendation

The completed AI recommendation work and backend testing changes have been committed and pushed to the remote repository.

Recent Development Milestones

The AI recommendation implementation includes:

Agentic request processing
Intent detection
Preference detection
Availability verification
Service ranking
Explainable recommendations
Confidence scoring
Alternative service suggestions
Safe handling of unavailable commercial data
Backend automated tests



PROJECT GOAL




AreaKart aims to reduce the effort required to discover suitable delivery services in a user's locality.

Instead of manually checking multiple delivery applications, users can:

Enter their PIN code
Discover supported services
Describe what they need in natural language
Receive an explainable recommendation
Compare available alternatives
Future Improvements

Potential future improvements include:

Live delivery ETA integration
Live pricing comparison
Live delivery-fee comparison
Real-time service ratings
More delivery platforms
More PIN-code coverage
Real-time availability verification
Improved recommendation scoring
Production deployment of the AI recommendation service



AUTHOR

Vanshika

