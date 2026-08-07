interface Props {
  pincode: string;
}

export default function EmptyState({ pincode }: Props) {
  return (
    <div className="mt-10 w-full max-w-2xl rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div className="text-6xl">📦</div>

      <h2 className="mt-4 text-2xl font-bold dark:text-white">
        No Delivery Apps Found
      </h2>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        We couldn't find any delivery services for PIN code:
      </p>

      <p className="mt-2 text-xl font-semibold text-green-600">
        {pincode}
      </p>

      <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
        Try another nearby PIN code or use your current location.
      </p>
    </div>
  );
}