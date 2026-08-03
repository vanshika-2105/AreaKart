import ResultCard from "./ResultCard";

interface Props {
  favorites: string[];
  isFavorite: (app: string) => boolean;
  toggleFavorite: (app: string) => void;
}

export default function FavoritesSection({
  favorites,
  isFavorite,
  toggleFavorite,
}: Props) {
  if (favorites.length === 0) {
  return (
    <section className="mb-10 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <h2 className="text-2xl font-bold">
        ❤️ Favorite Apps
      </h2>

      <p className="mt-3 text-gray-500">
        You haven't added any favorite apps yet.
      </p>

      <p className="text-sm text-gray-400">
        Click the ❤️ icon on any delivery app to save it here.
      </p>
    </section>
  );
}

  return (
    <section className="mb-10">
      <h2 className="mb-6 text-3xl font-bold text-center">
        ❤️ Favorite Apps ({favorites.length})
      </h2>
      {favorites.length >= 3 && (
  <div className="rounded-2xl bg-green-100 p-5 text-center">
    🎉 Awesome!

    You have selected your favorite delivery apps.
  </div>
)}

      <div className="flex flex-col gap-6">
        {favorites.map((app) => (
          <ResultCard
            key={app}
            name={app}
            isFavorite={isFavorite(app)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}