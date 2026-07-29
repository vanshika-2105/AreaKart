"use client";

import { useState } from "react";
import { searchPincode } from "@/services/api";
import Results from "./Results";
import SearchHistory from "./SearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";

export default function SearchBar() {
  const [pincode, setPincode] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { history, addSearch, clearHistory } = useSearchHistory();

  async function handleSearch(pin?: string) {
    const searchPin = pin ?? pincode;

    if (!searchPin.trim()) {
      alert("Please enter a PIN code.");
      return;
    }

    setLoading(true);

    try {
      const data = await searchPincode(searchPin);

      setPincode(searchPin);
      setServices(data.services);
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

  return (
    <div 
    id="search"
    className="mt-10 flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter your PIN Code"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="w-full max-w-lg rounded-xl border border-gray-300 px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-green-500"
      />

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

      <Results
  services={services}
  hasSearched={hasSearched}
/>
    </div>
  );
}