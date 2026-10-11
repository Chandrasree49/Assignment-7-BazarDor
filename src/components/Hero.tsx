import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-transparent py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="md:col-span-7 space-y-4 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-colors"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Figma Basket Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-square">
              <Image
                src="/hero-basket.png"
                alt="বাজারের ফলের ঝুড়ি"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
