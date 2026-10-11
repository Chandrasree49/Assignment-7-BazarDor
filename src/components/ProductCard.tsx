"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPriceBn, getUnitLabel, toBengaliDigits } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, nameBn, image, unit, today, change } = product;

  const isUp = change.dir === "up";
  const isDown = change.dir === "down";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";
  const badgeColor = isUp
    ? "bg-red-50 text-red-600 font-semibold"
    : isDown
    ? "bg-emerald-50 text-emerald-700 font-semibold"
    : "bg-gray-50 text-gray-500 font-medium";

  const pctAbs = Math.abs(change.pct);

  return (
    <Link href={`/product/${slug}`} className="block h-full">
      <div className="bg-white border border-gray-100/90 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer h-full flex flex-col justify-between">
        {/* Top: Image/Emoji box + Name & Unit */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl select-none shrink-0 border border-gray-100/80">
            {image}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {nameBn}
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5 font-normal">
              {getUnitLabel(unit)}
            </p>
          </div>
        </div>

        {/* Bottom: Price row & Change Badge */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-normal">আজকের দাম</span>
            <div className="text-sm font-extrabold text-gray-900 leading-tight mt-0.5">
              {formatPriceBn(today)} <span className="text-xs font-semibold text-gray-600">টাকা</span>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] ${badgeColor}`}
          >
            <span>{arrow}</span>
            <span>{toBengaliDigits(pctAbs.toFixed(1))}%</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
