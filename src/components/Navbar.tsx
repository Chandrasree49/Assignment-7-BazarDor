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

  // Determine active category from URL
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Row: Logo + Auth */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-green-700">🛒 বাজার দর</span>
            <span className="text-xs text-gray-500">{banglaDate}</span>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-24 rounded" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                    {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                  <span className="hidden md:block">{session.user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-outline btn-error rounded-full"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-sm btn-ghost rounded-full">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-sm btn-success rounded-full text-white">
                  সাইন আপ
                </Link>
              </>
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

      {/* Category Nav Row */}
      <div className="bg-green-50 border-b border-green-100 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 h-10 min-w-max">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === "/"
                  ? "bg-green-700 text-white"
                  : "text-gray-600 hover:bg-green-100 hover:text-green-700"
              }`}
            >
              সব পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeCategorySlug === cat.slug
                    ? "bg-green-700 text-white"
                    : "text-gray-600 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Price Ticker / Marquee */}
      <div className="bg-gray-900 text-white text-xs py-1.5 overflow-hidden">
        <div className="marquee-track">
          {[...products, ...products].map((p, i) => {
            const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
            const color =
              p.change.dir === "up"
                ? "text-red-400"
                : p.change.dir === "down"
                ? "text-green-400"
                : "text-gray-400";
            return (
              <span key={`${p.id}-${i}`} className="inline-flex items-center gap-1 mr-8 whitespace-nowrap">
                <span>{p.image}</span>
                <span className="font-medium">{p.nameBn}</span>
                <span className="text-yellow-300">{formatPriceBn(p.today)} টাকা/{p.unit === "kg" ? "কেজি" : p.unit === "litre" ? "লিটার" : p.unit === "dozen" ? "ডজন" : "পিস"}</span>
                <span className={color}>
                  {arrow} {toBengaliDigits(Math.abs(p.change.pct).toFixed(1))}%
                </span>
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
                className="block py-2 text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                👤 {session.user.name}
              </Link>
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="w-full text-left py-2 text-red-600"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="block py-2 text-gray-700" onClick={() => setMenuOpen(false)}>
                সাইন ইন
              </Link>
              <Link href="/signup" className="block py-2 text-green-700 font-medium" onClick={() => setMenuOpen(false)}>
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
