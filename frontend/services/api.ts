const API_URL = "http://localhost:8000";

export async function searchPincode(pincode: string) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pincode,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}