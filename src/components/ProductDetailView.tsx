"use client";

import { useState } from "react";
import { Product } from "@/types";
import {
  formatPriceBn,
  getUnitLabel,
  toBengaliDigits,
  calcAverage,
  calcMin,
  calcMax,
} from "@/lib/utils";
import { BENGALI_DIVISIONS } from "@/lib/constants";
import Link from "next/link";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>("সকল বিভাগ");

  const minPrice = calcMin(product.markets);
  const maxPrice = calcMax(product.markets);
  const avgPrice = calcAverage(product.markets);

  const filteredMarkets =
    selectedDivision === "সকল বিভাগ"
      ? product.markets
      : product.markets.filter((m) => m.division === selectedDivision);

  const arrow =
    product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—";
  const badgeColor =
    product.change.dir === "up"
      ? "bg-red-100 text-red-600"
      : product.change.dir === "down"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-500";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      {/* Top — Summary Header matching Figma */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="text-6xl sm:text-7xl p-4 bg-green-50 rounded-3xl border border-green-100 select-none">
              {product.image}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {product.nameBn}
                </h1>
                <Link
                  href={`/category/${product.category}`}
                  className="badge badge-success text-white text-xs px-3 py-2 font-medium"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="badge badge-outline text-xs px-3 py-2 text-gray-600">
                  {getUnitLabel(product.unit)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                দেশের প্রধান প্রধান পাইকারি ও খুচরা বাজারের আজকের বাজার দর বিশ্লেষণ।
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-gray-400">সর্বশেষ আপডেট: আজ</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
                  {arrow} {toBengaliDigits(Math.abs(product.change.pct).toFixed(1))}%
                </span>
              </div>
            </div>
          </div>

          {/* Today's Benchmark Price */}
          <div className="md:text-right bg-emerald-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-emerald-100">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
              জাতীয় গড় আজকের দর
            </span>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
              {formatPriceBn(product.today)} <span className="text-lg font-bold text-gray-600">টাকা</span>
            </div>
            <span className="text-xs text-gray-500 block mt-0.5">
              {getUnitLabel(product.unit)}
            </span>
          </div>
        </div>
      </div>

      {/* Price Summary Cards (Minimum, Maximum, Average) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Minimum Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-green-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">সর্বনিম্ন দাম (Min)</span>
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
              📉
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            {formatPriceBn(minPrice)} <span className="text-sm font-normal text-gray-500">টাকা</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">সকল বাজার যাচাই করে সর্বনিম্ন রেট</p>
        </div>

        {/* Average Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-green-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">গড় দাম (Average)</span>
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
              📊
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            {formatPriceBn(avgPrice)} <span className="text-sm font-normal text-gray-500">টাকা</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">জাতীয় বাজারের মধ্যবর্তী মূল্যমান</p>
        </div>

        {/* Maximum Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-green-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">সর্বোচ্চ দাম (Max)</span>
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
              📈
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            {formatPriceBn(maxPrice)} <span className="text-sm font-normal text-gray-500">টাকা</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">সকল বাজার যাচাই করে সর্বোচ্চ রেট</p>
        </div>
      </div>

      {/* Historical Comparison Badges (Yesterday, Last Week, Last Month) */}
      <div className="bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl p-5 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-bold text-gray-700">পূর্ববর্তী মূল্য তুলনা:</span>
        <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
          <div className="bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
            <span className="text-gray-500">গতকাল: </span>
            <span className="font-bold text-gray-800">{formatPriceBn(product.yesterday)} টাকা</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
            <span className="text-gray-500">গত সপ্তাহে: </span>
            <span className="font-bold text-gray-800">{formatPriceBn(product.lastWeek)} টাকা</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
            <span className="text-gray-500">গত মাসে: </span>
            <span className="font-bold text-gray-800">{formatPriceBn(product.lastMonth)} টাকা</span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market-wise Prices Table / Grid) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>🏪</span> বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              বিভিন্ন বিভাগ ও আঞ্চলিক বাজারের সর্বনিম্ন ও সর্বোচ্চ খুচরা দর
            </p>
          </div>

          {/* Division filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="div-filter" className="text-xs font-semibold text-gray-500 whitespace-nowrap">বিভাগ ফিল্টার:</label>
            <select
              id="div-filter"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="select select-bordered select-sm rounded-xl bg-white border-gray-300 text-xs font-medium focus:border-green-600"
            >
              {BENGALI_DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="table w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 text-xs font-bold uppercase">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4 text-right">সর্বনিম্ন দর</th>
                <th className="py-3 px-4 text-right">সর্বোচ্চ দর</th>
                <th className="py-3 px-4 text-right">গড় দর</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((m, idx) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={`${m.market}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="badge badge-ghost text-xs font-medium text-gray-700">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-emerald-700 font-bold">
                        {formatPriceBn(m.min)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-right text-rose-700 font-bold">
                        {formatPriceBn(m.max)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-gray-900">
                        {formatPriceBn(mAvg)} ৳
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    এই বিভাগে কোনো বাজারের তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
