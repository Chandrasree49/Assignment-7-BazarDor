"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নামের ঘরটি পূরণ করুন");
      return;
    }

    try {
      setLoading(true);
      // Better-Auth updateUser method: authClient.updateUser({ name })
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা যায়নি");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
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
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="skeleton h-64 w-full rounded-3xl" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-gray-600">অনুগ্রহ করে সাইন ইন করুন</p>
          <Link href="/signin" className="btn btn-success text-white rounded-xl">
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <div className="text-4xl mb-1 select-none">✏️</div>
          <h1 className="text-2xl font-bold text-gray-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার প্রোফাইল নাম পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              নতুন নাম (Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              required
              className="input input-bordered w-full rounded-xl bg-white border-gray-300 text-sm focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success w-full text-white rounded-xl font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Update Information (আপডেট করুন)"
              )}
            </button>

            <Link
              href="/profile"
              className="btn btn-ghost w-full rounded-xl text-gray-500 text-xs font-medium"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
