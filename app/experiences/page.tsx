"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Waves, Utensils, Camera, Compass, Clock, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const categoryIcons: Record<string, any> = {
  Adventure: Waves,
  Food: Utensils,
  Culture: Camera,
};

export default function ExperiencesPage() {
  const { experiences } = useData();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/exp-sunset.png"
            alt="Experiences"
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
              <span>Memories For Life</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Curated <span className="text-gradient-cyan">Experiences</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Immerse yourself in sunset catamaran cruises, seafood food trails, water sports, and sacred Kovil Poojas.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCES CARDS ── */}
      <section className="py-20">
        <div className="container-custom space-y-12">
          {experiences.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
              <p className="text-slate-500 font-extrabold text-lg">No experiences are currently configured.</p>
              <p className="text-slate-400 text-xs mt-1">Check back later or contact us to plan a customized tour.</p>
            </div>
          ) : (
            experiences.map((exp, i) => {
              const IconComp = categoryIcons[exp.category] || Compass;
              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                  custom={i}
                  className="bg-white rounded-3xl shadow-card overflow-hidden border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-0 card-hover-effect"
                >
                  {/* Photo Side (lg:col-span-5) */}
                  <div className={`relative min-h-[300px] lg:h-auto lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image src={exp.img} alt={exp.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.category}</span>
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{exp.rating} Rating</span>
                    </div>
                  </div>

                  {/* Content Side (lg:col-span-7) */}
                  <div className={`p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <h2 className="font-extrabold text-slate-900 text-2xl sm:text-3xl mb-3">{exp.title}</h2>
                      <p className="text-slate-500 text-base leading-relaxed mb-6">{exp.desc}</p>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {exp.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Meta & Action */}
                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-600" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-cyan-500" />
                          {exp.groupSize}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-black text-slate-900 text-2xl">{exp.price}</span>
                        <Link
                          href="/booking"
                          id={`book-exp-${exp.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-transform active:scale-95"
                        >
                          <span>Book Experience</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
