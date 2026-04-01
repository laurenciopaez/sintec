"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Root page — detects preferred language and redirects to /es or /en.
 * Priority: 1) saved preference in localStorage  2) browser language
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sintec-locale");
      if (saved === "en" || saved === "es") {
        router.replace(`/${saved}`);
        return;
      }
    } catch {
      // localStorage not available (private mode, SSR guard)
    }
    const lang = navigator.language.toLowerCase();
    router.replace(lang.startsWith("es") ? "/es" : "/en");
  }, [router]);

  // Shown briefly while JS determines the locale
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001514]">
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-bold text-white tracking-tight">
          SINTEC<span className="text-[#5aacac] font-light"> S.A.</span>
        </span>
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
