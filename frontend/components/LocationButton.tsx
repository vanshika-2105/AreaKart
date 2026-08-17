"use client";

import { sendLocation } from "@/services/api";

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
          const result = await sendLocation(latitude, longitude);

          console.log("Location API response:", result);

          alert(result.message || "Location received successfully");
        } catch (error) {
          console.error("Location error:", error);

          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert("Unable to send your location.");
          }
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
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