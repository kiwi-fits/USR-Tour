"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight, Filter, Compass } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" },
  }),
};

const tags = ["All", "Beach", "Heritage", "History", "Nature"];

export default function DestinationsPage() {
  const { destinations } = useData();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? destinations : destinations.filter((d) => d.tag === activeTag);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/dest-casuarina.png"
            alt="Destinations"
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
              <span>Explore Jaffna</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Top <span className="text-gradient-cyan">Destinations</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              From shallow turquoise beaches to 500-year-old Dutch forts and sacred Kovils — explore Jaffna's iconic spots.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER & DESTINATION CARDS ── */}
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

          {/* Grid of Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
                <p className="text-slate-500 font-extrabold text-lg">No spots found in this category.</p>
                <p className="text-slate-400 text-xs mt-1">Please try choosing another category filter above.</p>
              </div>
            ) : (
              filtered.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/80 card-hover-effect flex flex-col group"
                >
                  {/* Photo Header */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={d.img}
                      alt={d.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                        {d.tag}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{d.rating}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-extrabold text-2xl leading-tight mb-1">{d.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{d.distance} from Jaffna</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {d.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{d.duration}</span>
                      </div>
                      <Link
                        href="/booking"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                      >
                        <span>Book Spot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
