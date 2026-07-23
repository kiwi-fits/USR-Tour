"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight, Filter } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};



const tags = ["All", "Beach", "Heritage", "History", "Nature"];

const tagColors: Record<string, string> = {
  Beach: "badge-ocean",
  Heritage: "badge-sand",
  History: "badge-coral",
  Nature: "badge-ocean",
};

export default function DestinationsPage() {
  const { destinations } = useData();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? destinations : destinations.filter((d) => d.tag === activeTag);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 ocean-bg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/dest-casuarina.png" alt="Destinations" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-ocean-500/60" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label text-teal-lighter">Explore Jaffna</motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">
              Destinations
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
              From pristine beaches to ancient temples — discover the most breathtaking spots in Jaffna.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-pearl">
        <div className="container-custom">
          {/* Filter tabs */}
          <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
            <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-gray-150 mr-1">
              <Filter className="w-4 h-4 text-ocean-500" />
              <span className="text-xs font-outfit font-700 uppercase tracking-wider text-gray-400 hidden sm:inline">Filter</span>
            </div>
            {tags.map((tag) => (
              <button
                key={tag}
                id={`filter-${tag.toLowerCase()}`}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2.5 rounded-full font-outfit font-600 text-sm transition-all duration-300 shrink-0 ${
                  activeTag === tag
                    ? "bg-ocean-500 text-white shadow-ocean scale-105"
                    : "bg-white text-gray-500 hover:bg-teal-lighter hover:text-ocean-500 border border-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((d, i) => (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card card-hover group"
                >
                  <div className="relative h-56 img-zoom">
                    <Image src={d.img} alt={d.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                    <span className={`absolute top-3 left-3 badge ${tagColors[d.tag] || "badge-ocean"} bg-white/90 backdrop-blur-sm border-0`}>
                      {d.tag}
                    </span>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3.5 h-3.5 fill-sand text-sand" />
                      <span className="text-navy text-xs font-outfit font-bold">{d.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display font-bold text-navy text-xl mb-2">{d.name}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{d.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-coral" />{d.distance}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-DEFAULT" />{d.duration}</span>
                      </div>
                      <Link href="/booking" className="flex items-center gap-1.5 text-ocean-500 font-outfit font-600 text-sm hover:text-teal-DEFAULT transition-colors">
                        Book <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
