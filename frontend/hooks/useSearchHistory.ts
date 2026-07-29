"use client";

import { useEffect, useState } from "react";

export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  function addSearch(pin: string) {
    const updated = [
      pin,
      ...history.filter((item) => item !== pin),
    ].slice(0, 5);

    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  }

  return {
    history,
    addSearch,
    clearHistory,
  };
}