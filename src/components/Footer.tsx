export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛒</span>
              <span className="text-xl font-bold text-green-400">বাজার দর</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
            <div className="flex gap-4 mt-4 text-gray-400 text-sm">
              <span>🍚 চাল</span>
              <span>🫘 ডাল</span>
              <span>🛢️ তেল</span>
              <span>🥬 সবজি</span>
              <span>🐟 মাছ</span>
            </div>
          </div>

          {/* Right */}
          <div className="md:text-right">
            <p className="text-gray-400 text-sm max-w-sm">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
            <p className="text-gray-600 text-xs mt-4">
              © ২০২৫ বাজার দর | সর্বস্বত্ব সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
