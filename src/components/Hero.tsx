import Image from "next/image";
import bazarlogo from "../assests/bazar-hero.png";
export default function Hero() {
  return (
    <section className="pt-6 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
            <div className="md:col-span-7 space-y-4 text-left">
            
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </div>

            
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>

             
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>

            
              <div className="pt-2">
                <a
                  href="#সব-পণ্য"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  সব পণ্য দেখুন
                </a>
              </div>
            </div>

          
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-56 sm:w-64 md:w-72 aspect-square">
                <Image
                  src={bazarlogo}
                  alt="বাজারের ফলের ঝুড়ি"
                  className="object-contain"
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
