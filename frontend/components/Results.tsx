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
      <div className="mt-12 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center dark:border-slate-700 dark:bg-slate-800">

  <div className="text-6xl">
    📦
  </div>

  <h2 className="mt-4 text-2xl font-bold dark:text-white">
    No Delivery Apps Found
  </h2>

  <p className="mt-3 text-gray-500 dark:text-gray-300">
    We couldn't find any delivery services for this PIN code.
  </p>

</div>
    );
  }

  const favoriteServices = services.filter((service) =>
    favorites.includes(service)
  );

  const otherServices = services.filter(
    (service) => !favorites.includes(service)
  );

  return (
    <section className="mt-12 flex flex-col gap-8">

      <FavoritesSection
  favorites={favoriteServices}
  isFavorite={isFavorite}
  toggleFavorite={toggleFavorite}
/>

      <h2 className="text-2xl font-bold text-center">
        Available Delivery Services
      </h2>

      <BestAppSummary services={services} />

      <DeliveryInsights services={services} />

      {otherServices.map((service) => (
        <ResultCard
          key={service}
          name={service}
          isFavorite={isFavorite(service)}
          toggleFavorite={toggleFavorite}
        />
      ))}

      <ComparisonTable services={services} />

    </section>
  );
}