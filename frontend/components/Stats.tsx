export default function Stats() {
  const stats = [
    { number: "10+", label: "Delivery Apps" },
    { number: "500+", label: "PIN Codes" },
    { number: "50+", label: "Cities Covered" },
    { number: "24×7", label: "Availability" },
  ];

  return (
    <section className="mx-auto max-w-6xl bg-white px-6 py-16 transition-colors duration-300 dark:bg-slate-900">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <h2 className="text-4xl font-bold text-green-600">
              {stat.number}
            </h2>

            <p className="mt-2 font-medium text-gray-600 dark:text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}