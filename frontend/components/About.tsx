export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 max-w-5xl mx-auto py-16 px-6"
    >
      <div className="bg-gradient-to-r from-green-50 to-white rounded-3xl shadow-lg p-10">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-6">
          Why Areakart?
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-8 text-center">
          Areakart helps you instantly discover which grocery delivery
          services are available in your area. Instead of opening multiple
          apps one by one, simply enter your PIN code and compare services
          like Blinkit, Zepto, Instamart, BigBasket, JioMart and more from
          one place.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="text-center">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="font-bold text-xl mb-2">
              Fast Search
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Find available delivery apps in seconds.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-3">📍</div>
            <h3 className="font-bold text-xl mb-2">
              Location Based
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Search using your PIN code or current location.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-3">🚀</div>
            <h3 className="font-bold text-xl mb-2">
              One Platform
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Compare all major instant delivery apps in one place.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}