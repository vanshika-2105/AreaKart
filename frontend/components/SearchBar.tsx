"use client";

import { useState } from "react";
import { searchPincode } from "@/services/api";
import Results from "./Results";
import SearchHistory from "./SearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";

export default function SearchBar() {
  const [pincode, setPincode] = useState("");
  const [services, setServices] = useState<string[]>([]);
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
        className="rounded-xl bg-green-600 px-8 py-4 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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

      <Results
  services={services}
  hasSearched={hasSearched}
/>
    </div>
  );
}