"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset body overflow on page navigation
    document.body.style.overflow = "";

    // Hide splash screen quickly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Splash Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-gradient-to-br from-navy to-ocean-800 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 relative z-10"
            >
              <span className="font-display font-black text-4xl md:text-5xl tracking-wider uppercase gradient-india">
                USR TOURS
              </span>
            </motion.div>
            
            <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden relative z-10">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/3 bg-teal-DEFAULT rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content wrapper */}
      <div className={loading ? "max-h-screen overflow-hidden" : ""}>
        {children}
      </div>

      {/* 2. Back to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-teal-DEFAULT to-ocean-500 text-white flex items-center justify-center shadow-ocean hover:scale-110 active:scale-95 transition-transform"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
