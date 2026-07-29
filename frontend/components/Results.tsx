import ResultCard from "./ResultCard";

interface Props {
  services: string[];
}

export default function Results({ services }: Props) {
 if (services.length === 0) {
  return (
    <div className="mt-10 text-center text-gray-500">
      No delivery services found for this PIN code.
    </div>
  );
}

  return (
    <section className="mt-12 flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold">
        Available Delivery Services
      </h2>

      {services.map((service) => (
        <ResultCard key={service} name={service} />
      ))}
    </section>
  );
}