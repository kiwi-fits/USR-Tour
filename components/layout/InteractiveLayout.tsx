"use client";
import { useState, useEffect } from "react";
import { ChevronUp, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Hide splash screen after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-navy flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Glowing animated wave container */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-DEFAULT to-ocean-500 flex items-center justify-center shadow-[0_0_50px_rgba(0,180,216,0.6)] relative overflow-hidden">
                <Waves className="w-12 h-12 text-white animate-bounce" />
                <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
              </div>
              <div className="text-center">
                <span className="font-display font-black text-4xl tracking-wider block uppercase">
                  USR
                </span>
                <span className="font-display font-bold text-teal-light text-sm tracking-[0.25em] uppercase block mt-1">
                  Tours
                </span>
              </div>
            </motion.div>
            
            {/* Loading progress bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full mt-10 overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-teal-DEFAULT to-coral rounded-full"
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
