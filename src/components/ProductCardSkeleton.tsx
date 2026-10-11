export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex flex-col">
      <div className="skeleton h-12 w-12 rounded-full mx-auto mb-3" />
      <div className="skeleton h-4 w-3/4 mx-auto mb-2 rounded" />
      <div className="skeleton h-3 w-1/2 mx-auto mb-4 rounded" />
      <div className="mt-auto space-y-2">
        <div className="flex justify-between">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
        <div className="flex justify-end">
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
