import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50/40 to-white py-12 md:py-20 border-b border-green-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text & CTA */}
          <div className="space-y-5 text-center md:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-semibold tracking-wide">
              <span>🌾</span>
              <span>দৈনন্দিন বাজার দর মনিটর</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              আজকের সঠিক <span className="text-green-700">বাজার দর</span> জানুন সহজেই
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
              নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, শাকসবজি, মাছ ও মাংসের তাজা বাজার দর ও মূল্য ওঠানামার নির্ভরযোগ্য তথ্য এক প্ল্যাটফর্মে।
            </p>

            {/* CTA Button (Scroll to #সব-পণ্য anchor) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#সব-পণ্য"
                className="btn btn-md sm:btn-lg bg-green-600 hover:bg-green-700 text-white border-none rounded-xl shadow-md hover:shadow-lg transition-all font-semibold px-8"
              >
                সব পণ্য দেখুন ↓
              </a>
            </div>
          </div>

          {/* Right Column: Banner / Hero Graphic */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-green-200/50 via-emerald-100/60 to-yellow-100/50 p-8 flex flex-col items-center justify-center shadow-inner border border-green-200/50">
              {/* Central Floating Basket Graphic */}
              <div className="text-8xl sm:text-9xl filter drop-shadow-md animate-bounce duration-1000 select-none">
                🧺
              </div>
              <div className="flex gap-4 text-4xl sm:text-5xl mt-4 select-none">
                <span className="hover:scale-125 transition-transform">🍚</span>
                <span className="hover:scale-125 transition-transform">🥬</span>
                <span className="hover:scale-125 transition-transform">🐟</span>
                <span className="hover:scale-125 transition-transform">🍗</span>
                <span className="hover:scale-125 transition-transform">🧅</span>
              </div>
              <div className="mt-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-green-100 text-xs sm:text-sm text-green-900 font-medium">
                ✨ প্রতিদিন আপডেট করা বাজারদর বিশ্লেষণ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
