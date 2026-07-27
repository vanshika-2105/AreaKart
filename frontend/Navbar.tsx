export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-green-600">
          Areakart
        </h1>

        <div className="flex gap-6">

          <button className="hover:text-green-600">
            Home
          </button>

          <button className="hover:text-green-600">
            About
          </button>

          <button className="hover:text-green-600">
            Contact
          </button>

        </div>

      </div>
    </nav>
  );
}