import { deliveryInfo } from "@/lib/deliveryServices";

interface Props {
  services: string[];
}

export default function ComparisonTable({ services }: Props) {
  if (services.length === 0) return null;

  return (
    <div className="mt-10 w-full overflow-x-auto rounded-3xl border border-gray-200 bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="border-b border-gray-200 px-6 py-5 text-center text-3xl font-bold text-gray-900 dark:text-white dark:border-slate-700 dark:text-white">
        📊 Delivery App Comparison
      </h2>

      <table className="min-w-full">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">App</th>
            <th className="px-6 py-4 text-center">⭐ Rating</th>
            <th className="px-6 py-4 text-center">⚡ ETA</th>
            <th className="px-6 py-4 text-center">🚚 Delivery Fee</th>
            <th className="px-6 py-4 text-center">🛒 Min Order</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service, index) => {
            const app = deliveryInfo[service];

            return (
              <tr
                key={service}
                className={`transition-all duration-300 hover:bg-green-50 dark:hover:bg-slate-700 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800 dark:bg-slate-800"
                    : "bg-gray-50 dark:bg-slate-900"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white dark:text-white">
                  {service}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  ⭐ {app.rating}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  {app.eta}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  {app.deliveryFee}
                </td>

                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 dark:text-gray-300">
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