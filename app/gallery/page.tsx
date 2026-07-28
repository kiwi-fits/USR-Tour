"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Compass, Filter } from "lucide-react";
import { useData, GalleryItem } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

const tags = ["All", "Beach", "Heritage", "History", "Nature", "Culture", "Adventure", "Experiences"];

export default function GalleryPage() {
  const { gallery: photos } = useData();
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeTag === "All" ? photos : photos.filter((p) => p.tag === activeTag);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gal-palmyra.png"
            alt="Gallery"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/80" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div variants={fadeInUp} custom={0} className="hero-badge mb-4">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Visual Showcase</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Photo <span className="text-gradient-cyan">Gallery</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              A glimpse into the soul of Jaffna — pristine turquoise coasts, ancient Dutch architecture, and Kovil celebrations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY & LIGHTBOX ── */}
      <section className="py-16">
        <div className="container-custom">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 mr-2 shrink-0">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter:</span>
            </div>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shrink-0 ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-card w-full">
                <p className="text-slate-500 font-extrabold text-lg">No photos found in this category.</p>
                <p className="text-slate-400 text-xs mt-1">Please try selecting another category filter above.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]">
                {filtered.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setLightbox(photo)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-card border border-slate-200/80 ${photo.span}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-3 py-1 rounded-full w-fit mb-2">
                        {photo.tag}
                      </span>
                      <p className="text-white font-extrabold text-sm leading-tight">{photo.alt}</p>
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              </div>
              <div className="p-6 bg-slate-900 flex items-center justify-between">
                <div>
                  <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full mb-2 inline-block">
                    {lightbox.tag}
                  </span>
                  <p className="text-white font-extrabold text-lg">{lightbox.alt}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
