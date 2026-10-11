"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBengaliDate, formatPriceBn, toBengaliDigits } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Category, Product } from "@/types";

interface NavbarProps {
  categories: Category[];
  products: Product[];
}

export default function Navbar({ categories, products }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [banglaDate, setBanglaDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBengaliDate());
  }, []);

  const activeCategorySlug = pathname.startsWith("/category/")
    ? pathname.split("/category/")[1]
    : "";

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* 1. Top Bar: Logo + Bangla Date (Left) & User Profile/Auth (Right) */}
      <div className="border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo with Rounded Green Box icon + Title & Date underneath */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow-xs">
              🛒
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-gray-900 tracking-tight">বাজার দর</span>
              <span className="text-xs text-gray-500 font-normal">{banglaDate}</span>
            </div>
          </Link>

          {/* Right: Auth / Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="skeleton h-8 w-24 rounded-full" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-85 transition-opacity"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{session.user.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    {session.user.name}
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-gray-500 hover:text-red-600 font-medium ml-1"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin" className="btn btn-sm btn-ghost rounded-xl text-gray-700 text-xs font-semibold">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold border-none">
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Middle Row: Category Links (Figma Clean Tab Style) */}
      <div className="border-b border-gray-100 overflow-x-auto scrollbar-hide bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6 h-11 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`relative py-2 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-emerald-700 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="text-base select-none">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. Ticker: Light Background & Figma Dot/Color Pill Styling */}
      <div className="bg-[#f3f4f6]/90 border-b border-gray-200/70 text-gray-700 text-xs py-2 overflow-hidden select-none">
        <div className="marquee-track">
          {[...products, ...products].map((p, i) => {
            const isUp = p.change.dir === "up";
            const isDown = p.change.dir === "down";
            const arrow = isUp ? "▲" : isDown ? "▼" : "—";
            const changeColor = isUp ? "text-red-500 font-semibold" : isDown ? "text-emerald-600 font-semibold" : "text-gray-400";
            const unitBn = p.unit === "kg" ? "কেজি" : p.unit === "litre" ? "লিটার" : p.unit === "dozen" ? "ডজন" : "পিস";

            return (
              <span key={`${p.id}-${i}`} className="inline-flex items-center gap-1.5 mr-8 whitespace-nowrap">
                <span className="text-sm select-none">{p.image}</span>
                <span className="font-semibold text-gray-800">{p.nameBn}</span>
                <span className="text-gray-600">{formatPriceBn(p.today)} টাকা/{unitBn}</span>
                <span className={`inline-flex items-center gap-0.5 text-xs ${changeColor}`}>
                  <span>{arrow}</span>
                  <span>{toBengaliDigits(Math.abs(p.change.pct).toFixed(1))}%</span>
                </span>
                <span className="text-gray-300 ml-4 select-none">•</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {isPending ? null : session?.user ? (
            <>
              <Link
                href="/profile"
                className="block py-2 text-gray-800 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                👤 {session.user.name}
              </Link>
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="w-full text-left py-2 text-red-600 text-sm font-medium"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="block py-2 text-gray-700" onClick={() => setMenuOpen(false)}>
                সাইন ইন
              </Link>
              <Link href="/signup" className="block py-2 text-emerald-700 font-medium" onClick={() => setMenuOpen(false)}>
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
