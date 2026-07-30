"use client";

import { useState } from "react";
import { searchPincode } from "@/services/api";
import Results from "./Results";
import SearchHistory from "./SearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";
import { deliveryInfo } from "@/lib/deliveryServices";

export default function SearchBar() {
  const [pincode, setPincode] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
  "default" | "rating" | "eta" | "fee"
>("default");
  const [location, setLocation] = useState({
  city: "",
  state: "",
  pincode: "",
});
  const TOTAL_APPS = 6;
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const { history, addSearch, clearHistory } = useSearchHistory();

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

setLocation({
  city: data.city,
  state: data.state,
  pincode: data.pincode,
});

setServices(data.services ?? []);
setHasSearched(true);
      // Save successful search
      addSearch(searchPin);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setServices([]);
    } finally {
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

  return (
    <div 
    id="search"
    className="mt-10 flex flex-col items-center gap-4">
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
  className="w-full max-w-lg rounded-xl border border-gray-300 px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-green-500"
/>
      {error && (
  <p className="text-red-600 font-medium">
    {error}
  </p>
)}

      <button
        onClick={() => handleSearch()}
        disabled={loading}
        className={`rounded-lg px-4 py-2 transition ${
  sortBy === "default"
    ? "bg-green-600 text-white"
    : "bg-gray-200 hover:bg-gray-300"
}`}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <SearchHistory
        history={history}
        onSelect={(pin) => handleSearch(pin)}
        onClear={clearHistory}
      />

      {hasSearched && location.city && (
  <div className="w-full max-w-lg rounded-xl bg-green-50 border border-green-200 p-4 text-center">
    <p className="text-lg font-semibold">
      📍 {location.city}, {location.state}
    </p>
    <p className="text-gray-600">
      PIN: {location.pincode}
    </p>
  </div>
)}
{hasSearched && (
  <div className="w-full max-w-lg rounded-xl border border-blue-200 bg-blue-50 p-4">
    <h3 className="text-lg font-semibold text-center">
      Coverage Score
    </h3>

    <div className="mt-3 h-4 w-full rounded-full bg-gray-200">
      <div
        className="h-4 rounded-full bg-green-600 transition-all duration-500"
        style={{ width: `${coverageScore}%` }}
      />
    </div>

    <p className="mt-2 text-center text-lg font-bold">
      {coverageScore}%
    </p>
  </div>
)}
{hasSearched && services.length > 0 && (
  <div className="mt-6 flex flex-wrap justify-center gap-3">
    <button
      onClick={() => setSortBy("default")}
      className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
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

      <Results
  services={sortedServices}
  hasSearched={hasSearched}
/>
    </div>
  );
}