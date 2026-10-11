export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-gray-200/80 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          {/* Left */}
          <div>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>

          {/* Right */}
          <div className="text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
}
