import Image from "next/image";
import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  name: string;
}

export default function ResultCard({ name }: Props) {
  const info = deliveryInfo[name];

  if (!info) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col gap-5">

      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Image
            src={info.logo}
            alt={name}
            width={70}
            height={70}
            className="rounded-xl object-contain"
          />

          <div>
            <h2 className={`text-4xl font-bold ${info.color}`}>
              {name}
            </h2>

            <p className="text-gray-500">
              {info.description}
            </p>
          </div>
        </div>

        <div className="text-yellow-500 font-bold text-lg">
          ⭐ {info.rating}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 text-sm">

        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-gray-500">Delivery</p>
          <p className="font-semibold">
            🚚 {info.deliveryFee}
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-gray-500">ETA</p>
          <p className="font-semibold">
            ⏱ {info.eta}
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-gray-500">Min Order</p>
          <p className="font-semibold">
            💰 {info.minOrder}
          </p>
        </div>

      </div>

      {info.bestChoice && (
        <div className="bg-yellow-100 text-yellow-800 font-semibold rounded-full px-4 py-2 w-fit">
          🏆 Best Choice
        </div>
      )}

      {/* Bottom */}
      <div className="flex justify-between items-center">

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          ✅ Available
        </span>

        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl text-white font-semibold"
        >
          Open App
        </a>

      </div>

    </div>
  );
}