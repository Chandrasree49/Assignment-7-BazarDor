import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

export const revalidate = 60; // revalidate every minute

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await fetchAllProducts();
  } catch (err) {
    console.error("Error loading products on HomePage:", err);
  }

  // Section A: Top 6 Risers (dir === "up" sorted descending by pct)
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers (dir === "down" sorted by lowest/most negative pct or biggest drop)
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* 2. Hero / Banner */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 3. Section A — “আজ দাম বেড়েছে ▲”: Top 6 risers */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-red-100 pb-3">
            <span className="p-2 rounded-xl bg-red-100 text-red-600 text-xl">▲</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম বেড়েছে
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                আজকের বাজারে যেসব পণ্যের দাম বৃদ্ধি পেয়েছে (শীর্ষ ৬টি)
              </p>
            </div>
          </div>

          {risers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-4">তথ্য পাওয়া যায়নি</p>
          )}
        </section>

        {/* 3. Section B — “আজ দাম কমেছে ▼”: Top 6 fallers */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-green-100 pb-3">
            <span className="p-2 rounded-xl bg-green-100 text-green-700 text-xl">▼</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম কমেছে
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                আজকের বাজারে যেসব পণ্যের দাম হ্রাস পেয়েছে (শীর্ষ ৬টি)
              </p>
            </div>
          </div>

          {fallers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-4">তথ্য পাওয়া যায়নি</p>
          )}
        </section>

        {/* 3. Section C — “সব পণ্য” with subtitle & responsive grid */}
        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                <span>🛒</span> সব পণ্য
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                বাজারে তালিকাভুক্ত সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও আজকের দর
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              মোট পণ্য: {products.length} টি
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              পণ্য লোড করা যায়নি
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
