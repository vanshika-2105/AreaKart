const API_URL = "http://127.0.0.1:8000";

export async function searchPincode(pincode: string) {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pincode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error("Please enter a valid 6-digit PIN code.");
      }

      throw new Error(
        data.detail || data.message || "Something went wrong. Please try again."
      );
    }

    return data;
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
}

export async function sendLocation(
  latitude: number,
  longitude: number
) {
  try {
    const response = await fetch(`${API_URL}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || data.message || "Failed to send location."
      );
    }

    return data;
  } catch (error) {
    console.error("Location API error:", error);
    throw error;
  }
}