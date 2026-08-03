import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  function toggleFavorite(app: string) {
    let updated: string[];

    if (favorites.includes(app)) {
      updated = favorites.filter((item) => item !== app);
    } else {
      updated = [...favorites, app];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  function isFavorite(app: string) {
    return favorites.includes(app);
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}