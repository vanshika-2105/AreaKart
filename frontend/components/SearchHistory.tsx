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
    <div className="mt-8 w-full max-w-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">
          Recent Searches
        </h3>

        <button
          onClick={onClear}
          className="text-red-500 text-sm hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((pin) => (
          <button
            key={pin}
            onClick={() => onSelect(pin)}
            className="rounded-full bg-gray-100 px-4 py-2 hover:bg-green-100"
          >
            {pin}
          </button>
        ))}
      </div>
    </div>
  );
}