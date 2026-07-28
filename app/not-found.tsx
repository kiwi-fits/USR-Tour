"use client";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6 font-sans">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/30">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-xs font-black tracking-widest text-cyan-400 uppercase bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 mb-4">
        404 Page Not Found
      </span>
      <h1 className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4">
        Lost In Paradise?
      </h1>
      <p className="text-slate-400 text-base max-w-md mb-8">
        The destination page you are looking for does not exist or has been moved. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2"
      >
        <span>Return To Homepage</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
