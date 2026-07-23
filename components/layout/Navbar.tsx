"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Waves, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "pt-2 px-4" : "pt-0 px-0"
        }`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "glass-dark py-3 px-6 !rounded-2xl shadow-ocean"
              : "bg-transparent py-5 px-4 sm:px-6 lg:px-8 !rounded-none"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-display font-extrabold gradient-india text-2xl leading-none uppercase tracking-wider">
              USR
            </span>
            <div className="flex justify-between w-full font-display font-medium text-teal-light text-[0.65rem] leading-none uppercase mt-1">
              <span>T</span><span>O</span><span>U</span><span>R</span><span>S</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-2 py-1 ${pathname === link.href ? "text-white after:w-full font-bold text-shadow-sm" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+94212221234" className="flex items-center gap-2 text-teal-light hover:text-white transition-colors text-sm font-outfit font-500">
              <Phone className="w-4 h-4" />
              +94 21 222 1234
            </a>
            <Link href="/booking" className="btn-coral text-sm py-3 px-6">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden ios-icon-box bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors !w-10 !h-10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 stroke-[2]" /> : <Menu className="w-5 h-5 stroke-[2]" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu (Slide-out Drawer) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[280px] bg-gradient-to-b from-navy to-ocean-dark border-l border-white/10 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-2 p-6 pt-24">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-5 rounded-2xl font-outfit font-600 text-lg transition-colors ${
                  pathname === link.href
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link href="/booking" className="btn-coral w-full justify-center">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
