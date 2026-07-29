export default function Stats() {
  const stats = [
    { number: "10+", label: "Delivery Apps" },
    { number: "500+", label: "PIN Codes" },
    { number: "50+", label: "Cities Covered" },
    { number: "24×7", label: "Availability" },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
          >
            <h2 className="text-4xl font-bold text-green-600">
              {stat.number}
            </h2>

            <p className="text-gray-600 mt-2 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}