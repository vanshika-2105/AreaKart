import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  services: string[];
}

export default function BestAppSummary({ services }: Props) {
  if (services.length === 0) return null;

  const apps = services
    .map((name) => ({
      name,
      ...deliveryInfo[name],
    }))
    .filter((app) => app.rating !== undefined);

  const fastest = [...apps].sort(
    (a, b) => parseInt(a.eta) - parseInt(b.eta)
  )[0];

  const highestRated = [...apps].sort(
    (a, b) => b.rating - a.rating
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

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-yellow-300 bg-yellow-50 p-6 shadow-lg transition-all duration-300 dark:border-yellow-700 dark:bg-slate-800">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        🏆 Best App Summary
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Fastest */}
        <div className="rounded-2xl bg-white  p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-700">
          <p className="text-4xl">⚡</p>

          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            Fastest
          </h3>

          <p className="mt-2 text-green-600 font-semibold">
            {fastest.name}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            ETA: {fastest.eta}
          </p>
        </div>

        {/* Highest Rated */}
        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-700">
          <p className="text-4xl">⭐</p>

          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            Highest Rated
          </h3>

          <p className="mt-2 text-yellow-600 font-semibold">
            {highestRated.name}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Rating: {highestRated.rating}
          </p>
        </div>

        {/* Cheapest */}
        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-700">
          <p className="text-4xl">💰</p>

          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white ">
            Cheapest
          </h3>

          <p className="mt-2 text-blue-600 font-semibold">
            {cheapest.name}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Fee: {cheapest.deliveryFee}
          </p>
        </div>

      </div>
    </div>
  );
}
