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
    <div className="space-y-12 pb-20">
      {/* 2. Hero / Banner */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 3. Section A — “▲ আজ দাম বেড়েছে”: Top 6 risers matching Figma */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-600 text-sm font-bold">▲</span>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              আজ দাম বেড়েছে
            </h2>
          </div>

          {risers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-4">তথ্য পাওয়া যায়নি</p>
          )}
        </section>

        {/* 3. Section B — “▼ আজ দাম কমেছে”: Top 6 fallers matching Figma */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-700 text-sm font-bold">▼</span>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              আজ দাম কমেছে
            </h2>
          </div>

          {fallers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-4">তথ্য পাওয়া যায়নি</p>
          )}
        </section>

        {/* 3. Section C — “সব পণ্য” with responsive grid */}
        <section id="সব-পণ্য" className="scroll-mt-24 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                বাজারে তালিকাভুক্ত সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও আজকের দর
              </p>
            </div>
            <div className="text-xs text-gray-400">
              মোট পণ্য: {products.length} টি
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              পণ্য লোড করা যায়নি
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
