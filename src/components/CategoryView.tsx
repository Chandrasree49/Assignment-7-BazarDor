"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface CategoryViewProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryView({
  category,
  initialProducts,
}: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc">("default");
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl select-none shrink-0">
            {category.icon}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {category.nameBn}
            </h1>
            <p className="mt-0.5 text-xs text-gray-400 font-normal">
              মোট {initialProducts.length} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="whitespace-nowrap text-xs sm:text-sm text-gray-500 font-normal"
          >
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="select select-bordered select-xs sm:select-sm rounded-xl border-gray-200 bg-gray-50/50 text-xs sm:text-sm font-medium text-gray-800 focus:border-emerald-600 focus:bg-white focus:outline-none pr-8"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 space-y-4 shadow-xs">
          <div className="text-6xl select-none">📦</div>
          <h2 className="text-xl font-bold text-gray-800">
            এই ক্যাটাগরিতে কোন পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            বর্তমানে &ldquo;{category.nameBn}&rdquo; ক্যাটাগরিতে কোন সক্রিয় পণ্য তালিকাভুক্ত নেই।
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
