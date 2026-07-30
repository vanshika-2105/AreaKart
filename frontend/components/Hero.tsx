export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">
      <a
  href="#search"
  className="inline-block mt-8 md - 12 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
>
  🚀 Check Availability
</a>

      <h1 className="text-5xl font-bold text-gray-900">
        Find Every Delivery App
      </h1>

      <h2 className="text-5xl font-bold text-green-600 mt-2">
        Available In Your Area
      </h2>

      <p className="text-gray-500 mt-6 max-w-2xl text-lg">
        Areakart helps you instantly discover which instant delivery
        services are available in your location.
      </p>

    </section>
  );
}