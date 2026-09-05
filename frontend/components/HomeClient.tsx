"use client";

import { useState } from "react";

import SearchBar from "./SearchBar";
import AIRecommendation from "./AIRecommendation";

interface Props {
  initialPincode?: string;
}

export default function HomeClient({
  initialPincode = "",
}: Props) {
  const [pincode, setPincode] = useState(initialPincode);

  return (
    <>
      <SearchBar
        initialPincode={initialPincode}
        onPincodeChange={setPincode}
      />

      <AIRecommendation
        pincode={pincode}
      />
    </>
  );
}