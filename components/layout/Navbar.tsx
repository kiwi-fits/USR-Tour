"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Compass, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/lib/DataContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { contact } = useData();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  // Solid header state when scrolled or on inner pages
  const isSolid = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid ? "glass-nav-scrolled py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Clean Executive Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className={`font-black text-lg leading-none tracking-tight ${isSolid ? "text-slate-900" : "text-white"}`}>
                  USR <span className="text-cyan-500">TOURS</span>
                </span>
                <span className={`text-[0.62rem] font-bold tracking-widest uppercase mt-0.5 ${isSolid ? "text-slate-500" : "text-cyan-200"}`}>
                  Jaffna · Sri Lanka
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-colors ${
              isSolid ? "bg-slate-200/60 border-slate-300/80" : "bg-slate-900/40 backdrop-blur-md border-white/10"
            }`}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : isSolid
                        ? "text-slate-700 hover:text-blue-600 hover:bg-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${contact.phone}`}
                className={`flex items-center gap-2 text-sm font-bold transition-colors px-3 py-2 rounded-full ${
                  isSolid ? "text-slate-700 hover:text-blue-600" : "text-white/90 hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>{contact.phone}</span>
              </a>
              <Link
                href="/booking"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-transform active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Book Trip
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 rounded-xl border transition-colors ${
                isSolid
                  ? "bg-white border-slate-200 text-slate-900 shadow-xs"
                  : "bg-white/10 border-white/20 text-white backdrop-blur-md"
              }`}
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-2 flex-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-60" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <Link
                href="/booking"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Book Your Package Now
              </Link>
              <a
                href={`tel:${contact.phone}`}
                className="w-full py-3.5 rounded-2xl bg-slate-900 text-slate-300 font-semibold text-center flex items-center justify-center gap-2 border border-slate-800"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {contact.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
