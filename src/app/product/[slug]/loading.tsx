export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="skeleton h-6 w-48 rounded" />
      <div className="skeleton h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
      </div>
      <div className="skeleton h-16 w-full rounded-2xl" />
      <div className="skeleton h-96 w-full rounded-3xl" />
    </div>
  );
}
