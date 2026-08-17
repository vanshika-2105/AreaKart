from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    pincode: str = Field(
        ...,
        min_length=6,
        max_length=6,
        pattern=r"^\d{6}$",
        description="PIN code must contain exactly 6 digits"
    )