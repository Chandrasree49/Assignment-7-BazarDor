"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasRedirected) {
      setHasRedirected(true);
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      const redirectUrl = `/signin?callbackUrl=${encodeURIComponent(pathname)}`;
      router.push(redirectUrl);
    }
  }, [session, isPending, hasRedirected, pathname, router]);

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="skeleton h-48 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="skeleton h-32 rounded-2xl" />
          <div className="skeleton h-32 rounded-2xl" />
          <div className="skeleton h-32 rounded-2xl" />
        </div>
        <div className="skeleton h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
}
