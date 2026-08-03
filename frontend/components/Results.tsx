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
      <p className="mt-8 text-center text-gray-500">
        No delivery services found for this PIN code.
      </p>
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