"use client";

interface SavedLocation {
  label: string;
  pincode: string;
}

interface Props {
  locations: SavedLocation[];
  onSelect: (pin: string) => void;
  onDelete: (pin: string) => void;
}

export default function SavedLocations({
  locations,
  onSelect,
  onDelete,
}: Props) {
  if (locations.length === 0) return null;

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-lg">
      <h2 className="mb-4 text-xl font-bold dark:text-white">
        ⭐ Saved Locations
      </h2>

      <div className="space-y-3">
        {locations.map((location) => (
          <div
            key={location.pincode}
            className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-slate-700 p-3"
          >
            <button
              onClick={() => onSelect(location.pincode)}
              className="text-left"
            >
              <p className="font-semibold dark:text-white">
                {location.label}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                {location.pincode}
              </p>
            </button>

            <button
              onClick={() => onDelete(location.pincode)}
              className="text-red-500 hover:text-red-700"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}