"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPriceBn, getUnitLabel, toBengaliDigits } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, nameBn, image, unit, today, change } = product;

  const badgeColor =
    change.dir === "up"
      ? "bg-red-100 text-red-600"
      : change.dir === "down"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-500";

  const arrow =
    change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  const pctAbs = Math.abs(change.pct);

  return (
    <Link href={`/product/${slug}`}>
      <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Emoji / Image */}
        <div className="text-5xl text-center mb-3 select-none" role="img" aria-label={nameBn}>
          {image}
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800 text-center mb-1 line-clamp-2">
          {nameBn}
        </h3>

        {/* Unit */}
        <p className="text-xs text-gray-500 text-center mb-3">{getUnitLabel(unit)}</p>

        <div className="mt-auto">
          {/* Price row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">আজকের দাম</span>
            <span className="font-bold text-gray-900 text-sm">
              {formatPriceBn(today)} টাকা
            </span>
          </div>

          {/* Change badge */}
          <div className="flex justify-end mt-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
            >
              {arrow} {toBengaliDigits(pctAbs.toFixed(1))}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
