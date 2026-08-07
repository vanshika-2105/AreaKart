import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center transition-colors dark:bg-slate-900">
      <h1 className="text-8xl font-bold text-green-600">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold dark:text-white">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-gray-600 dark:text-gray-300">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}