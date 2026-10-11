import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-7xl select-none animate-bounce">🔍</div>
        <h1 className="text-4xl font-extrabold text-gray-900">৪০৪</h1>
        <h2 className="text-xl font-bold text-gray-800">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 text-sm">
          আপনি যে পণ্য বা ক্যাটাগরিটি খুঁজছেন তা বাজারে পাওয়া যায়নি অথবা ঠিকানাটি ভুল।
        </p>
        <div>
          <Link
            href="/"
            className="btn btn-success text-white rounded-xl px-6 shadow-md hover:shadow-lg"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
