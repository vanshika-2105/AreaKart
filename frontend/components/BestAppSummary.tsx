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
    <div className="w-full max-w-3xl rounded-2xl border border-yellow-300 bg-yellow-50 p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        🏆 Best App Summary
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xl">⚡</p>
          <h3 className="font-semibold">Fastest</h3>
          <p>{fastest.name}</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xl">⭐</p>
          <h3 className="font-semibold">Highest Rated</h3>
          <p>{highestRated.name}</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xl">💰</p>
          <h3 className="font-semibold">Cheapest</h3>
          <p>{cheapest.name}</p>
        </div>
      </div>
    </div>
  );
}