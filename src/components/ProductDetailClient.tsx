"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import {
  formatPriceBn,
  getUnitLabel,
  toBengaliDigits,
  calcAverage,
  calcMin,
  calcMax,
} from "@/lib/utils";
import Link from "next/link";
import ProductLoading from "@/app/product/[slug]/loading";
import { notFound } from "next/navigation";

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
        if (!res.ok) throw new Error("Fetch failed");
        const all: Product[] = await res.json();
        const found = all.find((p) => p.slug === slug || String(p.id) === slug);

        if (!found) {
          setIs404(true);
          setLoading(false);
          return;
        }

        const singleRes = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${found.id}`);
        if (singleRes.ok) {
          const detailed = await singleRes.json();
          setProduct(detailed);
        } else {
          setProduct(found);
        }
      } catch (err) {
        console.error("Client fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return <ProductLoading />;
  }

  if (is404 || !product) {
    notFound();
  }

  const minPrice = calcMin(product.markets || []);
  const maxPrice = calcMax(product.markets || []);
  const avgPrice = calcAverage(product.markets || []);

  const diff = (product.today || 0) - (product.yesterday || 0);
  const isUp = (product.change?.dir || (diff >= 0 ? "up" : "down")) === "up";
  const arrow = isUp ? "▲" : "▼";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Breadcrumb: হোম > চাল > বাটাম সাইজ চাল */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">হোম</Link>
        <span>&gt;</span>
        <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
          {product.categoryNameBn}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      {/* 2. Top Summary Card matching Figma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl select-none shrink-0">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-normal">
              {getUnitLabel(product.unit)} - {product.categoryNameBn}
            </p>
            <p className="text-xs text-gray-600 mt-1 font-normal">
              গতকালকের তুলনায় আজ দাম {diff >= 0 ? "বেড়েছে" : "কমেছে"} : {toBengaliDigits(Math.abs(diff))} টাকা
            </p>
          </div>
        </div>

        {/* Right Benchmark Box matching Figma */}
        <div className="bg-gray-50/70 border border-gray-100 rounded-2xl px-6 py-4 text-center min-w-[130px] self-start md:self-auto">
          <span className="text-[11px] text-gray-400 block font-normal">আজকের দাম</span>
          <div className="text-3xl font-black text-gray-900 leading-tight mt-0.5">
            {formatPriceBn(product.today)}
          </div>
          <span className="text-[11px] text-gray-500 block mt-0.5">
            টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
          </span>
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold mt-1 ${isUp ? "text-red-600" : "text-emerald-700"}`}>
            <span>{arrow}</span>
            <span>{toBengaliDigits(Math.abs(product.change?.pct || 0).toFixed(1))}%</span>
          </span>
        </div>
      </div>

      {/* 3. Main Details Box: দামের সারসংক্ষেপ & বাজারভিত্তিক আজকের দাম */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-8">
        {/* Sub-heading: দামের সারসংক্ষেপ */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* সর্বনিন্ম দাম */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs">
              <span className="text-xs text-gray-400 block">সর্বনিন্ম দাম</span>
              <div className="text-xl font-black text-emerald-600 mt-1">
                {formatPriceBn(minPrice)} টাকা
              </div>
              <p className="text-[11px] text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
            </div>

            {/* সর্বাধিক দাম */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs">
              <span className="text-xs text-gray-400 block">সর্বাধিক দাম</span>
              <div className="text-xl font-black text-red-600 mt-1">
                {formatPriceBn(maxPrice)} টাকা
              </div>
              <p className="text-[11px] text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            {/* গড় দাম */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs">
              <span className="text-xs text-gray-400 block">গড় দাম</span>
              <div className="text-xl font-black text-emerald-600 mt-1">
                {formatPriceBn(avgPrice)} টাকা
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}-এর হিসেবে
              </p>
            </div>
          </div>
        </div>

        {/* Sub-heading: বাজারভিত্তিক আজকের দাম Table matching Figma */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100 text-gray-500 font-semibold">
                  <th className="py-3 px-4 font-normal">বাজার</th>
                  <th className="py-3 px-4 font-normal">বিভাগ</th>
                  <th className="py-3 px-4 text-center font-normal">সর্বনিম্ন</th>
                  <th className="py-3 px-4 text-center font-normal">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right font-normal">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {(product.markets || []).map((m, idx) => {
                  const mAvg = ((m.min + m.max) / 2).toFixed(2);
                  return (
                    <tr key={`${m.market}-${idx}`} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {m.market}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {m.division}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700 font-medium">
                        {toBengaliDigits(m.min)} টাকা
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700 font-medium">
                        {toBengaliDigits(m.max)} টাকা
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-gray-900">
                        {toBengaliDigits(mAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
