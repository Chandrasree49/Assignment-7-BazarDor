"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন");
    router.push("/");
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নামের ঘরটি পূরণ করুন");
      return;
    }

    try {
      setLoading(true);
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা যায়নি");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message || "আপডেট করার সময় ত্রুটি ঘটেছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
        <div className="skeleton h-32 w-full rounded-2xl" />
        <div className="skeleton h-48 w-full rounded-2xl" />
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User Info Banner matching Figma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg shrink-0">
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
          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              {session.user.name}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {session.user.email}
            </p>
          </div>
        </div>

        {/* Red Outline Signout Button matching Figma */}
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold transition-colors"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Card 2: Update Information Form matching Figma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">
          তথ্য
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-sm text-gray-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
