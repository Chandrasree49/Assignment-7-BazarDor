"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
        <div className="skeleton h-40 w-full rounded-3xl" />
        <div className="skeleton h-24 w-full rounded-2xl" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-gray-600">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন</p>
          <Link href="/signin" className="btn btn-success text-white rounded-xl">
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  const { name, email, createdAt } = session.user as any;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-8">
        {/* Header / Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border-b border-gray-100 pb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-extrabold select-none shadow-inner">
            {name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500">{email}</p>
            <span className="inline-block badge badge-success text-white text-xs px-2.5 py-0.5 mt-1">
              সক্রিয় সদস্য
            </span>
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-800">অ্যাকাউন্ট বিবরণ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100">
              <span className="text-gray-500 text-xs block mb-1">ব্যবহারকারীর নাম</span>
              <span className="font-semibold text-gray-800">{name}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100">
              <span className="text-gray-500 text-xs block mb-1">ইমেইল</span>
              <span className="font-semibold text-gray-800">{email}</span>
            </div>
          </div>
        </div>

        {/* Actions: C3 Update Information Button + Signout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <Link
            href="/profile/update"
            className="btn btn-success text-white rounded-xl w-full sm:w-auto px-6 shadow-sm hover:shadow-md"
          >
            ✏️ তথ্য আপডেট করুন (Update Info)
          </Link>

          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-error rounded-xl w-full sm:w-auto px-6"
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
