"use client";

import { sendLocation } from "@/services/api";

type LocationButtonProps = {
  onLocationFound?: (result: any) => void;
};

export default function LocationButton({
  onLocationFound,
}: LocationButtonProps) {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("GPS coordinates:", {
          latitude,
          longitude,
        });

        try {
          const result = await sendLocation(
            latitude,
            longitude
          );

          console.log(
            "Location API response:",
            result
          );

          onLocationFound?.(result);

        } catch (error) {
          console.warn(
            "Location API error:",
            error
          );

          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert(
              "Unable to determine your current location. Please try again."
            );
          }
        }
      },

      (error) => {
        console.warn(
          "Geolocation error:",
          error
        );

        if (error.code === 1) {
          alert(
            "Location permission was denied. Please allow location access and try again."
          );
        } else if (error.code === 2) {
          alert(
            "We couldn't determine your location. Please try again."
          );
        } else if (error.code === 3) {
          alert(
            "Location request timed out. Please try again."
          );
        } else {
          alert(
            "Unable to determine your location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button onClick={getLocation}>
      📍 Use My Current Location
    </button>
  );
}