"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6 font-sans">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-lg">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="font-black text-white text-3xl sm:text-5xl tracking-tight mb-4">
        Something Went Wrong
      </h1>
      <p className="text-slate-400 text-base max-w-md mb-8">
        An unexpected error occurred. Please try refreshing or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-6 py-3.5 rounded-full border border-slate-700 flex items-center justify-center"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}
