const API_URL = "http://localhost:8000";

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
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to connect to the server.");
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
        data.detail || data.message || "Unable to send your location."
      );
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to connect to the server.");
  }
}