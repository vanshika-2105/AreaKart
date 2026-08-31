export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600 transition hover:scale-105 sm:text-3xl">
          Areakart
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">

          <a
            href="#"
            className="text-sm font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200 sm:text-base"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200 sm:text-base"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-200 sm:text-base"
          >
            Contact
          </a>

        </div>

      </div>
    </nav>
  );
}