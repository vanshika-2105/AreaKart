export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 px-6 py-24 text-center transition-colors duration-300 dark:bg-slate-900">

      {/* CTA Button */}
      <a
        href="#search"
        className="mb-12 inline-block rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
      >
        🚀 Check Availability
      </a>

      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 md:text-6xl dark:text-white">
        Find Every Delivery App
      </h1>

      {/* Highlighted Heading */}
      <h2 className="mt-3 text-4xl font-extrabold text-green-600 md:text-6xl">
        Available In Your Area
      </h2>

      {/* Description */}
      <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300 transition-colors duration-300">
        Areakart helps you instantly discover which instant delivery
        services are available in your location. Search any PIN code
        to compare Blinkit, Zepto, Instamart, BigBasket, JioMart,
        Dunzo, and more from one place.
      </p>

    </section>
  );
}
