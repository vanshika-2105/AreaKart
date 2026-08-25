"use client";

import Image from "next/image";
import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  name: string;
  isFavorite: boolean;
  toggleFavorite: (app: string) => void;
  availability?: Availability;
  url?: string;
}
interface Availability {
  name: string;
  type: string;
  verification_method: string;
  status: string;
  confidence: string;
  verification_level: string;
  message: string;
  url?: string;
}
export default function ResultCard({
  name,
  isFavorite,
  toggleFavorite,
   availability,
}: Props) {
  const info = deliveryInfo[name];

  if (!info) {
    return (
      <div className="rounded-3xl border border-red-300 bg-red-50 p-6 text-red-600">
        Data not found for: {name}
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          
          <Image
            src={info.logo}
            alt={name}
            width={64}
            height={64}
            className="rounded-xl object-contain"
          />

          <div className="min-w-0">
            <h2 className={`text-2xl font-bold ${info.color}`}>
              {name}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              {info.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(name)}
            className="text-2xl transition hover:scale-110"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          <span className="font-bold text-yellow-500">
            ⭐ {info.rating}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6 flex flex-wrap gap-2">
        {info.bestChoice && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            🏆 Best Choice
          </span>
        )}

        {info.deliveryFee === "Free" && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            🚚 Free Delivery
          </span>
        )}

        {parseInt(info.eta) <= 15 && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            ⚡ Fast Delivery
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            ⭐ Rating
          </p>
          <p className="mt-1 font-bold dark:text-white">
            {info.rating}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            ⚡ ETA
          </p>
          <p className="mt-1 font-bold dark:text-white">
            {info.eta}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            🚚 Delivery Fee
          </p>
          <p className="mt-1 font-bold dark:text-white">
            {info.deliveryFee}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            🛒 Min Order
          </p>
          <p className="mt-1 font-bold dark:text-white">
            {info.minOrder}
          </p>
        </div>
      </div>

      {/* Footer */}
<div className="mt-6 flex flex-col gap-3">

  {/* Availability Status */}
  {availability?.status === "verified" ? (
    <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
      <div className="font-semibold text-green-700">
        ✅ Verified Available
      </div>

      <p className="mt-1 text-sm text-green-600">
        {availability.verification_level === "pincode"
          ? "Verified specifically for this PIN code."
          : availability.message}
      </p>
    </div>

  ) : availability?.status === "estimated" ? (
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4">
      <div className="font-semibold text-yellow-700">
        ⚠️ Estimated Availability
      </div>

      <p className="mt-1 text-sm text-yellow-700">
        {availability.verification_level === "pincode_coverage"
          ? "Based on PIN-level coverage data."
          : availability.verification_level === "city_coverage"
          ? "Based on city-level coverage data."
          : availability.message}
      </p>
    </div>

  ) : availability?.status === "unavailable" ? (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
      <div className="font-semibold text-red-700">
        ❌ Unavailable
      </div>

      <p className="mt-1 text-sm text-red-600">
        {availability.message}
      </p>
    </div>

  ) : (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 px-5 py-4">
      <div className="font-semibold text-gray-700">
        ℹ️ Availability Unknown
      </div>

      <p className="mt-1 text-sm text-gray-600">
        {availability?.message ||
          "No reliable coverage information is available."}
      </p>
    </div>
  )}

  {/* Open App */}
  {availability?.url ? (
    <a
      href={availability.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
    >
      Open {name}
    </a>
  ) : (
    <button
      type="button"
      disabled
      className="cursor-not-allowed rounded-xl bg-gray-400 px-6 py-3 text-center font-semibold text-white"
    >
      App Link Unavailable
    </button>
  )}

</div>