"use client";

export default function LocationButton() {

  const getLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        alert(
          `Latitude: ${position.coords.latitude}
Longitude: ${position.coords.longitude}`
        );

      },
      () => {
        alert("Unable to retrieve location.");
      }
    );

  };

  return (

    <button
      onClick={getLocation}
      className="
      mt-5
      bg-white
      border
      border-green-600
      text-green-600
      px-6
      py-3
      rounded-xl
      hover:bg-green-50
      transition
      "
    >
      📍 Use My Current Location
    </button>

  );

}