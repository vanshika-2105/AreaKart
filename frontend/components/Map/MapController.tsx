"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  latitude: number;
  longitude: number;
}

export default function MapController({
  latitude,
  longitude,
}: Props) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], 14, {
      animate: true,
      duration: 2,
    });
  }, [latitude, longitude, map]);

  return null;
}