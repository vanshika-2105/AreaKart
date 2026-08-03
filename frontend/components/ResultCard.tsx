import Image from "next/image";
import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  name: string;
  isFavorite: boolean;
  toggleFavorite: (app: string) => void;
}

export default function ResultCard({
  name,
  isFavorite,
  toggleFavorite,
}: Props) {
  const info = deliveryInfo[name];

  if (!info) return null;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={info.logo}
            alt={name}
            width={80}
            height={80}
            className="h-auto rounded-xl object-contain"
          />

          <div>
            <h2 className={`text-3xl font-bold ${info.color}`}>
              {name}
            </h2>

            <p className="mt-1 text-gray-500">
              {info.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleFavorite(name)}
            title={
              isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
            className="text-3xl transition-all duration-300 hover:scale-125"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          <div className="text-xl font-bold text-yellow-500">
            ⭐ {info.rating}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6 flex flex-wrap gap-3">
        {info.bestChoice && (
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            🏆 Best Choice
          </span>
        )}

        {info.deliveryFee === "Free" && (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🚚 Free Delivery
          </span>
        )}

        {parseInt(info.eta) <= 15 && (
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            ⚡ Fast Delivery
          </span>
        )}
      </div>

      {/* Information Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-gray-100 p-4 text-center transition hover:bg-gray-200">
          <p className="text-sm text-gray-500">⭐ Rating</p>
          <p className="mt-1 font-bold">{info.rating}</p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 text-center transition hover:bg-gray-200">
          <p className="text-sm text-gray-500">⚡ ETA</p>
          <p className="mt-1 font-bold">{info.eta}</p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 text-center transition hover:bg-gray-200">
          <p className="text-sm text-gray-500">🚚 Delivery Fee</p>
          <p className="mt-1 font-bold">{info.deliveryFee}</p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 text-center transition hover:bg-gray-200">
          <p className="text-sm text-gray-500">🛒 Min Order</p>
          <p className="mt-1 font-bold">{info.minOrder}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
          ✅ Available
        </span>

        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 px-8 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
        >
          Open {name}
        </a>
      </div>
    </div>
  );
}