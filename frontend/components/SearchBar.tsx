"use client";

import { useState } from "react";
import { searchPincode } from "@/services/api";
import Results from "./Results";
import SearchHistory from "./SearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";
import { deliveryInfo } from "@/lib/deliveryServices";
import useFavorites from "@/hooks/useFavorites";
import dynamic from "next/dynamic";
import SkeletonCard from "./SkeletonCard";
import useSavedLocations from "@/hooks/useSavedLocation";
import SavedLocations from "./SavedLocations";
import ShareSearch from "./ShareSearch";
import { useEffect } from "react";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import { locationCoordinates } from "@/lib/locationCoordinates";


const MapView = dynamic(
  () => import("@/components/Map/MapView"),
  {
    ssr: false,
  }
);


interface Props {
  initialPincode?: string;
   onPincodeChange?: (pincode: string) => void;
}

export default function SearchBar({
  initialPincode = "",
  onPincodeChange,
}: Props)  {
  const [pincode, setPincode] = useState(initialPincode);
  const [services, setServices] = useState<string[]>([]);
 const [availability, setAvailability] = useState<
  {
    name: string;
    type: string;
    verification_method: string;
    status: string;
    confidence: string;
    verification_level: string;
    message: string;
    url?: string;
  }[]
>([]);  const [sortBy, setSortBy] = useState<
  "default" | "rating" | "eta" | "fee"
>("default");
  const [filters, setFilters] = useState({
  freeDelivery: false,
  bestChoice: false,
  rating45: false,
  eta15: false,
});
  const [location, setLocation] = useState({
  city: "",
  state: "",
  pincode: "",
  latitude: null as number | null,
  longitude: null as number | null,
});

  const TOTAL_APPS = 6;
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const { history, addSearch, clearHistory } = useSearchHistory();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
  locations,
  saveLocation,
  deleteLocation,
} = useSavedLocations();
useEffect(() => {
  if (
    initialPincode &&
    initialPincode.length === 6
  ) {
    handleSearch(initialPincode);
  }
}, []);
  async function handleSearch(pin?: string) {
    const searchPin = pin ?? pincode;

    setError("");

if (!searchPin.trim()) {
  setError("Please enter a PIN code.");
  return;
}

if (!/^\d+$/.test(searchPin)) {
  setError("PIN code must contain only digits.");
  return;
}

if (searchPin.length !== 6) {
  setError("PIN code must be exactly 6 digits.");
  return;
}
    setLoading(true);

    try {
      const data = await searchPincode(searchPin);
      setError("");

      setPincode(searchPin);
      onPincodeChange?.(searchPin);
setLocation({
  city: data.city,
  state: data.state,
  pincode: data.pincode,
  latitude: data.latitude,
  longitude: data.longitude,
});


setServices(data.services ?? []);
setAvailability(data.availability ?? []);
setHasSearched(true);
      const label = prompt(
  "Enter a name for this location (e.g. Home, Office):"
);

if (label && label.trim()) {
  saveLocation(label.trim(), searchPin);
}
      // Save successful search
      addSearch(searchPin);
    } catch (error: any) {
  console.error(error);

  if (error instanceof Error) {
   toast.error(error.message);
  } else {
    toast.error("Unknown error");
  }

  setServices([]);
  setAvailability([]);
}
  finally {
      setLoading(false);
    }
  }
  const coverageScore = Math.round(
  (services.length / TOTAL_APPS) * 100
);
const sortedServices = [...services];

if (sortBy === "rating") {
  sortedServices.sort(
    (a, b) => deliveryInfo[b].rating - deliveryInfo[a].rating
  );
}

if (sortBy === "eta") {
  sortedServices.sort(
    (a, b) =>
      parseInt(deliveryInfo[a].eta) -
      parseInt(deliveryInfo[b].eta)
  );
}

if (sortBy === "fee") {
  sortedServices.sort((a, b) => {
    const feeA =
      deliveryInfo[a].deliveryFee === "Free"
        ? 0
        : parseInt(deliveryInfo[a].deliveryFee.replace(/\D/g, ""));

    const feeB =
      deliveryInfo[b].deliveryFee === "Free"
        ? 0
        : parseInt(deliveryInfo[b].deliveryFee.replace(/\D/g, ""));

    return feeA - feeB;
  });
}
let filteredServices = [...sortedServices];

if (filters.freeDelivery) {
  filteredServices = filteredServices.filter(
    (service) => deliveryInfo[service].deliveryFee === "Free"
  );
}

if (filters.bestChoice) {
  filteredServices = filteredServices.filter(
    (service) => deliveryInfo[service].bestChoice
  );
}

if (filters.rating45) {
  filteredServices = filteredServices.filter(
    (service) => deliveryInfo[service].rating >= 4.5
  );
}

if (filters.eta15) {
  filteredServices = filteredServices.filter(
    (service) =>
      parseInt(deliveryInfo[service].eta) <= 15
  );
}

 return (
  <div
    id="search"
    className="mt-10 flex flex-col items-center gap-6 transition-colors duration-300"
  >
    {/* Search Input */}
    <input
      type="text"
      placeholder="Enter your PIN Code"
      value={pincode}
      maxLength={6}
      inputMode="numeric"
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setPincode(value);
      }}
      className="w-full max-w-lg rounded-xl border border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white px-5 py-4 text-lg outline-none transition focus:ring-2 focus:ring-green-500"
    />

    {error && (
      <p className="font-medium text-red-500">
        {error}
      </p>
    )}

    {/* Search Button */}
    <button
      onClick={() => handleSearch()}
      disabled={loading}
      className="rounded-lg bg-green-600 px-6 py-3 text-white transition-all duration-300 hover:bg-green-700"
    >
      {loading ? "Searching..." : "Search"}
    </button>

    <SearchHistory
      history={history}
      onSelect={(pin) => handleSearch(pin)}
      onClear={clearHistory}
    />
    <SavedLocations
  locations={locations}
  onSelect={(pin) => handleSearch(pin)}
  onDelete={deleteLocation}
/>

    {/* Location */}
    {hasSearched && location.city && (
      <div className="w-full max-w-lg rounded-xl border border-green-200 bg-green-50 p-4 text-center transition-colors duration-300 dark:border-green-700 dark:bg-slate-800">
        <p className="text-lg font-semibold dark:text-white">
          📍 {location.city}, {location.state}
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          PIN: {location.pincode}
        </p>
      </div>
    )}
    

    {/* Filters */}
    {hasSearched && services.length > 0 && (
      <div className="mt-4 flex flex-wrap justify-center gap-3">

        <button
          onClick={() =>
            setFilters({
              ...filters,
              freeDelivery: !filters.freeDelivery,
            })
          }
          className={`rounded-lg px-4 py-2 transition ${
            filters.freeDelivery
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          }`}
        >
          🚚 Free Delivery
        </button>

        <button
          onClick={() =>
            setFilters({
              ...filters,
              bestChoice: !filters.bestChoice,
            })
          }
          className={`rounded-lg px-4 py-2 transition ${
            filters.bestChoice
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          }`}
        >
          ⭐ Best Choice
        </button>

        <button
          onClick={() =>
            setFilters({
              ...filters,
              rating45: !filters.rating45,
            })
          }
          className={`rounded-lg px-4 py-2 transition ${
            filters.rating45
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          }`}
        >
          ⭐ Rating 4.5+
        </button>

        <button
          onClick={() =>
            setFilters({
              ...filters,
              eta15: !filters.eta15,
            })
          }
          className={`rounded-lg px-4 py-2 transition ${
            filters.eta15
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          }`}
        >
          ⚡ ETA &lt; 15 mins
        </button>

        <button
          onClick={() => {
            setFilters({
              freeDelivery: false,
              bestChoice: false,
              rating45: false,
              eta15: false,
            });

            setSortBy("default");
          }}
          className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
          🔄 Clear Filters & Sorting
        </button>
      </div>
    )}

    {/* Coverage */}
    {hasSearched && (
      <div className="w-full max-w-lg rounded-xl border border-blue-200 bg-blue-50 p-4 transition-colors duration-300 dark:border-blue-700 dark:bg-slate-800">
        <h3 className="text-center text-lg font-semibold dark:text-white">
          Coverage Score
        </h3>

        <div className="mt-3 h-4 w-full rounded-full bg-gray-300 dark:bg-slate-700">
          <div
            className="h-4 rounded-full bg-green-600 transition-all duration-500"
            style={{ width: `${coverageScore}%` }}
          />
        </div>

        <p className="mt-2 text-center text-lg font-bold dark:text-white">
          {coverageScore}%
        </p>
      </div>
    )}

    {/* Sorting */}
    {hasSearched && services.length > 0 && (
      <div className="mt-6 flex flex-wrap justify-center gap-3">

        <button
          onClick={() => setSortBy("default")}
          className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          Default
        </button>

        <button
          onClick={() => setSortBy("rating")}
          className={`rounded-lg px-4 py-2 transition ${
            sortBy === "rating"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-300 hover:bg-yellow-400"
          }`}
        >
          ⭐ Highest Rated
        </button>

        <button
          onClick={() => setSortBy("eta")}
          className={`rounded-lg px-4 py-2 transition ${
            sortBy === "eta"
              ? "bg-blue-700 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ⚡ Fastest
        </button>

        <button
          onClick={() => setSortBy("fee")}
          className={`rounded-lg px-4 py-2 transition ${
            sortBy === "fee"
              ? "bg-green-800 text-white"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          💰 Cheapest
        </button>
      </div>
    )}
    {hasSearched &&
  typeof location.latitude === "number" &&
  typeof location.longitude === "number" && (
    <MapView
      latitude={location.latitude}
      longitude={location.longitude}
      city={location.city}
      pincode={location.pincode}
    />
  )}
{hasSearched && (
  <ShareSearch
    pincode={location.pincode}
    city={location.city}
  />
)}
{loading && (
  <div className="flex w-full flex-col items-center gap-6 mt-8">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
)}


    {filteredServices.length === 0 && hasSearched ? (
  <EmptyState pincode={location.pincode} />
) : (
 <Results
  services={filteredServices}
  availability={availability}
  hasSearched={hasSearched}
  favorites={favorites}
  isFavorite={isFavorite}
  toggleFavorite={toggleFavorite}
/>
)}
  </div>
);
}
