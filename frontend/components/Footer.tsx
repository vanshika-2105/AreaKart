export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              Areakart
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Discover which instant delivery services are available
              in your area and compare them from one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Home</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              support@areakart.com
            </p>

            <p className="text-gray-400 mt-2">
              Made with ❤️ using Next.js & FastAPI
            </p>
          </div>

        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500 dark:text-gray-400">
          © 2026 Areakart. All rights reserved.
        </p>

      </div>
    </footer>
  );
}