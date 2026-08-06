export default function SkeletonCard() {
  return (
    <div className="w-full max-w-5xl rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 animate-pulse">
      <div className="flex gap-4">
        <div className="h-20 w-20 rounded-xl bg-gray-300 dark:bg-slate-700"></div>

        <div className="flex-1">
          <div className="h-6 w-48 rounded bg-gray-300 dark:bg-slate-700"></div>

          <div className="mt-3 h-4 w-72 rounded bg-gray-200 dark:bg-slate-600"></div>

          <div className="mt-2 h-4 w-56 rounded bg-gray-200 dark:bg-slate-600"></div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="h-20 rounded-xl bg-gray-200 dark:bg-slate-700"
          />
        ))}
      </div>
    </div>
  );
}