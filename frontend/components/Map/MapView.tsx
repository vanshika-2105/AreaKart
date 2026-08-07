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
} from "react-leaflet";

import L from "leaflet";
import MapController from "./MapController";

interface Props {
  latitude: number;
  longitude: number;
  city: string;
  pincode: string;
}

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

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        toast.error("Unable to access your location.");
      }
    );
  }

  return (
    <div className="mt-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 shadow-xl dark:border-slate-700">

      <div className="mb-4 flex justify-end">
        <button
          onClick={getCurrentLocation}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          📍 Locate Me
        </button>
      </div>

      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom
        className="h-[450px] w-full"
      >
        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Search Result Marker */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">
                📍 {city}
              </h3>

              <p>PIN: {pincode}</p>
            </div>
          </Popup>
        </Marker>

        {/* User Current Location */}
        {userLocation && (
          <>
            <Marker
              position={[
                userLocation.lat,
                userLocation.lng,
              ]}
            >
              <Popup>
                📍 You are here
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