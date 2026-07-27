"use client";

import { useState } from "react";
import { searchPincode } from "@/services/api";

export default function SearchBar() {
  const [pincode, setPincode] = useState("");

  async function handleSearch() {
    if (!pincode.trim()) {
      alert("Please enter a PIN code.");
      return;
    }

    try {
      const data = await searchPincode(pincode);

      console.log(data);

      alert(
        `Available Services:\n\n${data.services.join("\n")}`
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <input
        type="text"
        placeholder="Enter your PIN Code"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="w-full max-w-lg border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition"
      >
        Search
      </button>
    </div>
  );
}