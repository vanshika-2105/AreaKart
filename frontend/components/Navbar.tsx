export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-green-600 transition hover:scale-105">
          Areakart
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <a
            href="#"
            className="font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200"
          >
            Home
          </a>

          <a
            href="#about"
            className="font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200"
          >
            About
          </a>

          <a
            href="#contact"
            className="font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200"
          >
            Contact
          </a>

        </div>

      </div>
    </nav>
  );
}