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
      alert("Geolocation is not supported by your browser.");
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

          console.error(
            "Location error:",
            error
          );

          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert(
              "Unable to determine your current location."
            );
          }
        }
      },

      (error) => {

        console.error(
          "Geolocation error:",
          error
        );

        switch (error.code) {

          case error.PERMISSION_DENIED:
            alert(
              "Location permission was denied. Please allow location access."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            alert(
              "Your location is currently unavailable. Please try again."
            );
            break;

          case error.TIMEOUT:
            alert(
              "Location request timed out. Please try again."
            );
            break;

          default:
            alert(
              "Unable to retrieve your current location."
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