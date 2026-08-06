"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";


interface Props {
  latitude: number;
  longitude: number;
  city: string;
  pincode: string;
}

// Fix default marker icons
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
  return (
    <div className="mt-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 shadow-xl dark:border-slate-700">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[450px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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
      </MapContainer>
    </div>
  );
}