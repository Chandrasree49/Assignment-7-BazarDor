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

  // Challenge C1: Sort dropdown handling numeric values (not string)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl p-2 bg-green-50 rounded-2xl border border-green-100 select-none">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              মোট পণ্য: {initialProducts.length} টি
            </p>
          </div>
        </div>

        {/* C1: Sort dropdown with Bengali numerals sorting */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sort-select" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="select select-bordered select-sm sm:select-md rounded-xl bg-white border-gray-300 pr-8 font-medium text-sm text-gray-800 focus:border-green-600 focus:outline-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards List */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
          <div className="text-6xl">📦</div>
          <h2 className="text-xl font-bold text-gray-800">
            এই ক্যাটাগরিতে কোন পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            বর্তমানে &ldquo;{category.nameBn}&rdquo; ক্যাটাগরিতে কোন সক্রিয় পণ্য তালিকাভুক্ত নেই।
          </p>
          <div className="pt-2">
            <Link href="/" className="btn btn-success text-white rounded-xl px-6">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
