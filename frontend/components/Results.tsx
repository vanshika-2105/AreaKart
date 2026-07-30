import ResultCard from "./ResultCard";
import BestAppSummary from "./BestAppSummary";

interface Props {
  services: string[];
   hasSearched: boolean;
}

export default function Results({ 
  services, hasSearched }: Props) {
 if (!hasSearched) {
  return null;
}

if (services.length === 0) {
  return (
    <p className="text-center text-gray-500 mt-8">
      No delivery services found for this PIN code.
    </p>
  );
}

  return (
    <section className="mt-12 flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold">
        Available Delivery Services
      </h2>
      <BestAppSummary services={services} />

      {services.map((service) => (
        <ResultCard key={service} name={service} />
      ))}
    </section>
  );
}