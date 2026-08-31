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

  const bestRated = [...apps].sort(
    (a, b) => b.rating - a.rating
  )[0];

  const fastest = [...apps].sort(
    (a, b) => parseInt(a.eta) - parseInt(b.eta)
  )[0];

  const cheapest = [...apps].sort((a, b) => {
    const feeA =
      a.deliveryFee === "Free"
        ? 0
        : parseInt(a.deliveryFee.replace(/\D/g, ""));

    const feeB =
      b.deliveryFee === "Free"
        ? 0
        : parseInt(b.deliveryFee.replace(/\D/g, ""));

    return feeA - feeB;
  })[0];

  let coverage = "Poor";

  if (services.length >= 5) coverage = "Excellent";
  else if (services.length >= 3) coverage = "Good";
  else if (services.length >= 2) coverage = "Average";

  return (
    <div className="mt-8 w-full max-w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 sm:p-6">

      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-left sm:text-3xl">
        📊 Delivery Insights
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">

        <div className="rounded-2xl bg-gray-100 p-5 text-center transition-all duration-300 hover:shadow-lg dark:bg-slate-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Apps Available
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {services.length}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-5 text-center transition-all duration-300 hover:shadow-lg dark:bg-slate-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Coverage
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {coverage}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-5 text-center transition-all duration-300 hover:shadow-lg dark:bg-slate-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            🏆 Best Rated
          </p>

          <p className="mt-2 text-xl font-bold text-yellow-600">
            {bestRated.name}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            ⭐ {bestRated.rating}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-5 text-center transition-all duration-300 hover:shadow-lg dark:bg-slate-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            ⚡ Fastest
          </p>

          <p className="mt-2 text-xl font-bold text-green-600">
            {fastest.name}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            {fastest.eta}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-5 text-center transition-all duration-300 hover:shadow-lg dark:bg-slate-700 md:col-span-2">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            💰 Cheapest
          </p>

          <p className="mt-2 text-xl font-bold text-blue-600">
            {cheapest.name}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            {cheapest.deliveryFee}
          </p>
        </div>

      </div>
    </div>
  );
}