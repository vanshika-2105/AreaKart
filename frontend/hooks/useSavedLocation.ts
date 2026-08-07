"use client";

import { useEffect, useState } from "react";

interface SavedLocation {
  label: string;
  pincode: string;
}

export default function useSavedLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedLocations");

    if (saved) {
      setLocations(JSON.parse(saved));
    }
  }, []);

  function saveLocation(label: string, pincode: string) {
    const updated = [
      ...locations.filter((l) => l.pincode !== pincode),
      { label, pincode },
    ];

    setLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
  }

  function deleteLocation(pin: string) {
    const updated = locations.filter((l) => l.pincode !== pin);

    setLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
  }

  return {
    locations,
    saveLocation,
    deleteLocation,
  };
}