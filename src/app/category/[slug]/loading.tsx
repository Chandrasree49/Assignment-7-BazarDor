import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="skeleton h-12 w-12 rounded-2xl" />
          <div className="space-y-2">
            <div className="skeleton h-6 w-32 rounded-lg" />
            <div className="skeleton h-3.5 w-48 rounded-md" />
          </div>
        </div>
        <div className="skeleton h-8 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
