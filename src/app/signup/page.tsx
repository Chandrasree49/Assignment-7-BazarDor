"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !password) {
      const msg = "সকল তথ্য সঠিকভাবে পূরণ করুন";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        const errorText = res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।");
        // Requirement 6: "If the user Register successfully then navigate him to his login page."
        router.push(`/signin${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`);
      }
    } catch (err: any) {
      const errorText = err?.message || "রেজিস্ট্রেশন করার সময় ত্রুটি হয়েছে";
      setErrorMessage(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      toast.loading(`${provider === "google" ? "গুগল" : "গিটহাব"} দিয়ে প্রবেশ করা হচ্ছে...`);
      await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
    } catch (err: any) {
      toast.dismiss();
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <div className="text-4xl mb-2 select-none">📝</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বাজার দর এ যোগ দিয়ে নিয়মিত বাজার দর আপডেট পান
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              পুরো নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              required
              className="input input-bordered w-full rounded-xl bg-white border-gray-300 text-sm focus:border-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              className="input input-bordered w-full rounded-xl bg-white border-gray-300 text-sm focus:border-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
              required
              className="input input-bordered w-full rounded-xl bg-white border-gray-300 text-sm focus:border-green-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-full text-white rounded-xl font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner" /> : "রেজিস্ট্রেশন করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-gray-400">অথবা সোশ্যাল দিয়ে শুরু করুন</div>

        {/* Social Logins */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="btn btn-outline w-full rounded-xl flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google দিয়ে সাইন আপ
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="btn btn-outline w-full rounded-xl flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub দিয়ে সাইন আপ
          </button>
        </div>

        {/* Link to Login */}
        <div className="text-center text-xs sm:text-sm text-gray-500 pt-2">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
          <Link
            href={`/signin${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
            className="text-green-700 font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
