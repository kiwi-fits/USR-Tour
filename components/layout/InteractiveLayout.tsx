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
            exit={{ 
              opacity: 0, 
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[999] bg-[#03045E] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3 relative z-10"
            >
              <span className="font-display font-black text-4xl md:text-5xl tracking-[0.2em] uppercase text-white">
                USR TOURS
              </span>
              <span className="text-teal text-xs tracking-[0.3em] uppercase font-semibold">
                Jaffna Tourism
              </span>
            </motion.div>
            
            <div className="w-32 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative z-10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full bg-teal"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content wrapper with Page Route Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={loading ? "max-h-screen overflow-hidden" : "min-h-screen"}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* 2. Back to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-teal to-ocean-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
