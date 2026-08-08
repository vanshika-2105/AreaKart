import ResultCard from "./ResultCard";
import BestAppSummary from "./BestAppSummary";
import ComparisonTable from "./ComparisonTable";
import DeliveryInsights from "./DeliveryInsights";
import FavoritesSection from "./FavoritesSection";

interface Props {
  services: string[];
  hasSearched: boolean;
  favorites: string[];
  isFavorite: (app: string) => boolean;
  toggleFavorite: (app: string) => void;
}

export default function Results({
  services,
  hasSearched,
  favorites,
  isFavorite,
  toggleFavorite,
}: Props) {
  if (!hasSearched) {
    return null;
  }

  if (services.length === 0) {
    return (
      <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
        <div className="text-6xl">📦</div>

        <h2 className="mt-4 text-3xl font-bold">
          No Delivery Apps Found
        </h2>

        <p className="mt-4 text-gray-500">
          We couldn't find any delivery services for this location.
        </p>
      </section>
    );
  }

  const favoriteServices = services.filter((service) =>
    favorites.includes(service)
  );

  const otherServices = services.filter(
    (service) => !favorites.includes(service)
  );

  return (
    <section className="mt-12 space-y-8">

      <FavoritesSection
        favorites={favoriteServices}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />

      <h2 className="text-center text-3xl font-bold">
        Available Delivery Services
      </h2>

      <BestAppSummary services={services} />

      <DeliveryInsights services={services} />

      <div className="mx-auto grid w-full max-w-6xl justify-center gap-6 md:grid-cols-2">
        {otherServices.map((service) => (
          <ResultCard
            key={service}
            name={service}
            isFavorite={isFavorite(service)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <ComparisonTable services={services} />

    </section>
  );
}