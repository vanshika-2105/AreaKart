import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  services: string[];
}

export default function DeliveryInsights({ services }: Props) {
  if (services.length === 0) return null;

  const apps = services
    .map((name) => ({
      name,
      ...deliveryInfo[name],
    }))
    .filter(Boolean);

  const bestRated = [...apps].sort((a, b) => b.rating - a.rating)[0];

  const fastest = [...apps].sort(
    (a, b) =>
      parseInt(a.eta) - parseInt(b.eta)
  )[0];

  const cheapest = [...apps].sort((a, b) => {
    const feeA = a.deliveryFee === "Free" ? 0 : parseInt(a.deliveryFee.replace("₹", ""));
    const feeB = b.deliveryFee === "Free" ? 0 : parseInt(b.deliveryFee.replace("₹", ""));
    return feeA - feeB;
  })[0];

  let coverage = "Poor";

  if (services.length >= 5) coverage = "Excellent";
  else if (services.length >= 3) coverage = "Good";
  else if (services.length >= 2) coverage = "Average";

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        📊 Delivery Insights
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-gray-500">Apps Available</p>
          <p className="text-xl font-bold">
            {services.length}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-gray-500">Coverage</p>
          <p className="text-xl font-bold">
            {coverage}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-gray-500">🏆 Best Rated</p>
          <p className="font-bold">
            {bestRated.name}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-gray-500">⚡ Fastest</p>
          <p className="font-bold">
            {fastest.name}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 md:col-span-2">
          <p className="text-gray-500">💰 Cheapest</p>
          <p className="font-bold">
            {cheapest.name}
          </p>
        </div>

      </div>
    </div>
  );
}