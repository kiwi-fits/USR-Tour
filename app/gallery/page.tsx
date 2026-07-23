"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useData, GalleryItem } from "@/lib/DataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};



const tags = ["All", "Beach", "Heritage", "History", "Nature", "Culture", "Adventure", "Experiences"];

export default function GalleryPage() {
  const { gallery: photos } = useData();
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeTag === "All" ? photos : photos.filter((p) => p.tag === activeTag);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/gal-palmyra.png" alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-navy/80" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label text-sand">Visual Journey</motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">
              Gallery
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/75 text-lg max-w-xl mx-auto">
              A picture says a thousand words. See why Jaffna captivates every soul that visits.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="py-12 bg-pearl">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scroll-smooth">
            {tags.map((tag) => (
              <button
                key={tag}
                id={`gallery-filter-${tag.toLowerCase()}`}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full font-outfit font-600 text-sm transition-all duration-300 shrink-0 ${
                  activeTag === tag
                    ? "bg-ocean-500 text-white shadow-ocean scale-105"
                    : "bg-white text-gray-500 hover:bg-teal-lighter hover:text-ocean-500 border border-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => setLightbox(photo)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group img-zoom ${photo.span}`}
                >
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="badge badge-ocean bg-white/90 backdrop-blur-sm border-0 w-fit mb-2">{photo.tag}</span>
                    <p className="text-white font-display font-bold text-sm leading-tight">{photo.alt}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
                <span className="badge badge-ocean bg-white/20 text-white border-white/20 mb-2">{lightbox.tag}</span>
                <p className="text-white font-display font-bold text-lg">{lightbox.alt}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
