import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchAllCategories, fetchAllProducts } from "@/lib/api";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর - নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজার দর, মূল্য ওঠানামা এবং বাজারভিত্তিক বিশ্লেষণ এক নজরে।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: import("@/types").Category[] = [];
  let products: import("@/types").Product[] = [];

  try {
    const [catsRes, prodsRes] = await Promise.all([
      fetchAllCategories(),
      fetchAllProducts(),
    ]);
    categories = catsRes || [];
    products = prodsRes || [];
  } catch (err) {
    console.error("Failed to fetch initial navbar data:", err);
  }

  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8f9fa] text-gray-900 font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar categories={categories} products={products} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
