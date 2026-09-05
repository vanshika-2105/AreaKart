"use client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function LocationButton() {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

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

          if (!response.ok) {
            throw new Error("Failed to send location");
          }

          const data = await response.json();

          console.log("Backend response:", data);

          alert(
            `Location sent successfully!\nLatitude: ${data.latitude}\nLongitude: ${data.longitude}`
          );
        } catch (error) {
          console.error("Location API error:", error);
          alert("Failed to send your location to AreaKart.");
        }
      },
      (error) => {
        console.error("Location error:", error);
        alert("Unable to retrieve your location. Please allow location permission.");
      }
    );
  };

  return (
    <button onClick={getLocation}>
      📍 Use My Current Location
    </button>
  );
}