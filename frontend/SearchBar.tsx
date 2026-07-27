export default function SearchBar() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">

      <input
        type="text"
        placeholder="Enter your PIN Code"
        className="
          w-full
          max-w-lg
          border
          border-gray-300
          rounded-xl
          px-5
          py-4
          text-lg
          outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

      <button
        className="
          bg-green-600
          text-white
          px-8
          py-4
          rounded-xl
          hover:bg-green-700
          transition
        "
      >
        Search
      </button>

    </div>
  );
}