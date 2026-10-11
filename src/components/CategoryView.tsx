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
  
{/* Category Header Card */}
<div className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5">
  <div className="flex items-center gap-3">
    <span className="select-none text-4xl">
      {category.icon}
    </span>

    <div>
      <h1 className="text-2xl font-extrabold text-gray-900">
        {category.nameBn}
      </h1>

      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
        {initialProducts.length} টি পণ্যের আজকের দাম ও পরিবর্তন
      </p>
    </div>
  </div>
</div>

{/* Sort Dropdown Card */}
<div className="mt-5 flex items-center justify-end gap-2 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4">
  <label
    htmlFor="sort-select"
    className="whitespace-nowrap text-sm text-gray-500"
  >
    সাজান
  </label>

  <select
    id="sort-select"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value as any)}
    className="select select-bordered select-sm rounded-lg border-gray-300 bg-transparent text-sm text-gray-800 focus:border-green-600 focus:outline-none"
  >
    <option value="default">ডিফল্ট</option>
    <option value="price-asc">দাম: কম থেকে বেশি</option>
    <option value="price-desc">দাম: বেশি থেকে কম</option>
  </select>
</div>


      {/* Product Cards List */}
      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
      মোট {initialProducts.length} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
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
