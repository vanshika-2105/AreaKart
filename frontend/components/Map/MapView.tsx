"use client";

import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";

import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";

// Fix default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


interface Props {
  latitude: number;
  longitude: number;
  city: string;
  pincode: string;
}


// -----------------------------------------
// Component to move map to a location
// -----------------------------------------

function MapController({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  map.flyTo(
    [latitude, longitude],
    15,
    {
      animate: true,
      duration: 1.5,
    }
  );

  return null;
}


// -----------------------------------------
// Main Map
// -----------------------------------------

export default function MapView({
  latitude,
  longitude,
  city,
  pincode,
}: Props) {

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);


  // -----------------------------------------
  // Locate current user
  // -----------------------------------------

  function getCurrentLocation() {

    if (!navigator.geolocation) {

      toast.error(
        "Geolocation is not supported by your browser."
      );

      return;
    }


    toast.loading(
      "Detecting your location...",
      {
        id: "location",
      }
    );


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;


        console.log(
          "Current GPS location:",
          {
            latitude: lat,
            longitude: lng,
          }
        );


        setUserLocation({
          lat,
          lng,
        });


        toast.success(
          "Location detected successfully.",
          {
            id: "location",
          }
        );
      },


      (error) => {

        console.error(
          "Geolocation error:",
          error
        );


        toast.error(
          "Unable to access your location. Please allow location permission.",
          {
            id: "location",
          }
        );
      },


      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }


  // -----------------------------------------
  // Decide what location map should display
  // -----------------------------------------

  const mapLatitude =
    userLocation?.lat ?? latitude;

  const mapLongitude =
    userLocation?.lng ?? longitude;


  return (

    <div className="mt-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 shadow-xl dark:border-slate-700">


      {/* Locate button */}

      <div className="mb-4 flex justify-end">

        <button
          onClick={getCurrentLocation}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          📍 Locate Me
        </button>

      </div>


      <MapContainer
        center={[
          latitude,
          longitude,
        ]}
        zoom={13}
        scrollWheelZoom
        className="h-[450px] w-full"
      >


        {/* Move map whenever location changes */}

        <MapController
          latitude={mapLatitude}
          longitude={mapLongitude}
        />


        {/* OpenStreetMap */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* -------------------------------- */}
        {/* Search result marker */}
        {/* -------------------------------- */}

        <Marker
          position={[
            latitude,
            longitude,
          ]}
        >

          <Popup>

            <div className="text-center">

              <h3 className="font-bold">
                📍 {city}
              </h3>

              <p>
                PIN: {pincode}
              </p>

            </div>

          </Popup>

        </Marker>


        {/* -------------------------------- */}
        {/* User GPS marker */}
        {/* -------------------------------- */}

        {userLocation && (

          <>

            <Marker
              position={[
                userLocation.lat,
                userLocation.lng,
              ]}
            >

              <Popup>

                <div className="text-center">

                  <h3 className="font-bold">
                    📍 You are here
                  </h3>

                  <p>
                    Current GPS location
                  </p>

                </div>

              </Popup>

            </Marker>


            <Circle
              center={[
                userLocation.lat,
                userLocation.lng,
              ]}
              radius={120}
            />

          </>

        )}

      </MapContainer>

    </div>

  );
}