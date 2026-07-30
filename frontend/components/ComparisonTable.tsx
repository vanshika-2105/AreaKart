import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  services: string[];
}

export default function ComparisonTable({ services }: Props) {
  if (services.length === 0) return null;

  return (
    <div className="mt-10 w-full overflow-x-auto">
      <h2 className="mb-6 text-center text-2xl font-bold">
        📊 Delivery App Comparison
      </h2>

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">App</th>
            <th className="px-4 py-3">⭐ Rating</th>
            <th className="px-4 py-3">⏱ ETA</th>
            <th className="px-4 py-3">🚚 Fee</th>
            <th className="px-4 py-3">🛒 Min Order</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => {
            const app = deliveryInfo[service];

            return (
              <tr
                key={service}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-semibold">
                  {service}
                </td>

                <td className="px-4 py-3 text-center">
                  {app.rating}
                </td>

                <td className="px-4 py-3 text-center">
                  {app.eta}
                </td>

                <td className="px-4 py-3 text-center">
                  {app.deliveryFee}
                </td>

                <td className="px-4 py-3 text-center">
                  {app.minOrder}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}