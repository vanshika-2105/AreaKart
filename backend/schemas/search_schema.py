from pydantic import BaseModel


class SearchRequest(BaseModel):
    pincode: str