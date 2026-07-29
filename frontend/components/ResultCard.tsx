import { deliveryInfo } from "@/lib/deliveryServices";
import Image from "next/image";
interface Props {
  name: string;
}

export default function ResultCard({ name }: Props) {
  const info = deliveryInfo[name] || {
    color: "text-gray-600",
    icon: "📦",
    description: "Delivery Service",
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center gap-4">
        <Image
  src={info.logo}
  alt={name}
  width={64}
  height={64}
  className="rounded-lg object-contain"
/>

        <div>
          <h2 className={`text-3xl font-bold ${info.color}`}>
            {name}
          </h2>

          <p className="text-gray-500">
            {info.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          ✅ Available
        </span>

        <a
  href={info.url}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
>
  Open App
</a>

      </div>

    </div>
  );
}