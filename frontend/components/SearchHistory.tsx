interface Props {
  history: string[];
  onSelect: (pin: string) => void;
  onClear: () => void;
}

export default function SearchHistory({
  history,
  onSelect,
  onClear,
}: Props) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-lg rounded-2xl border border-gray-200 bg-white dark:bg-slate-800 p-5 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-white">
          🕘 Recent Searches
        </h3>

        <button
          onClick={onClear}
          className="text-sm font-medium text-red-500 transition hover:text-red-600 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {history.map((pin) => (
          <button
            key={pin}
            onClick={() => onSelect(pin)}
            className="rounded-full bg-gray-100 px-4 py-2 text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-green-100 dark:bg-slate-700 dark:text-white dark:hover:bg-green-700"
          >
            {pin}
          </button>
        ))}
      </div>
    </div>
  );
}