const API_URL = "http://127.0.0.1:8000";

const REQUEST_TIMEOUT = 10000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = REQUEST_TIMEOUT
) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}


export async function searchPincode(pincode: string) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/search`, {
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
        data.detail ||
          data.message ||
          "Unable to process your request. Please try again."
      );
    }

    return data;

  } catch (error) {

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "The request took too long. Please try again."
      );
    }

    if (
      error instanceof TypeError &&
      error.message === "Failed to fetch"
    ) {
      throw new Error(
        "Unable to connect to AreaKart. Please check your internet connection or make sure the server is running."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Something went wrong. Please try again."
    );
  }
}


export async function sendLocation(
  latitude: number,
  longitude: number
) {
  try {

    // Validate coordinates before sending them
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error(
        "We couldn't determine a valid location. Please try again."
      );
    }

    const response = await fetchWithTimeout(`${API_URL}/location`, {
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
        data.detail ||
          data.message ||
          "Unable to determine your location."
      );
    }

    return data;

  } catch (error) {

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "The location request took too long. Please try again."
      );
    }

    if (
      error instanceof TypeError &&
      error.message === "Failed to fetch"
    ) {
      throw new Error(
        "Unable to connect to AreaKart. Please check your internet connection or make sure the server is running."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Unable to determine your location. Please try again."
    );
  }
}