"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Compass } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function PackagesPage() {
  const { packages } = useData();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pkg-premium.png"
            alt="Packages"
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
              <span>Handcrafted Trips</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Tour <span className="text-gradient-cyan">Packages</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              All-inclusive travel packages with private transport, verified luxury hotel stays, and local Tamil guides.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES GRID ── */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
                <p className="text-slate-500 font-extrabold text-lg">No tour packages are currently configured.</p>
                <p className="text-slate-400 text-xs mt-1">Please check back later or contact us to build a custom trip.</p>
              </div>
            ) : (
              packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                    pkg.featured
                      ? "bg-slate-900 text-white border-blue-500 shadow-2xl relative scale-105 z-10"
                      : "bg-white text-slate-900 border-slate-200 shadow-card"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>MOST POPULAR CHOICE</span>
                    </div>
                  )}

                  <div>
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-6">
                      <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    </div>

                    <span className={`text-xs font-bold uppercase tracking-wider ${pkg.featured ? "text-cyan-400" : "text-blue-600"}`}>
                      {pkg.subtitle}
                    </span>
                    <h3 className="font-extrabold text-2xl mt-1 mb-4">{pkg.name}</h3>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="font-black text-4xl tracking-tight">{pkg.price}</span>
                      <span className={`text-sm ${pkg.featured ? "text-slate-400" : "text-slate-500"}`}>/ per person</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.featured ? "text-cyan-400" : "text-blue-600"}`} />
                          <span className={pkg.featured ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className={`w-full py-4 rounded-2xl font-extrabold text-center flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 ${
                      pkg.featured
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <span>Book {pkg.name}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {/* Custom Package Request Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 bg-white rounded-3xl p-8 sm:p-12 text-center shadow-card border border-slate-200/80 max-w-3xl mx-auto"
          >
            <h3 className="font-extrabold text-slate-900 text-2xl sm:text-3xl mb-3">Want A Customized Itinerary?</h3>
            <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
              We design tailor-made Jaffna trips for families, honeymoons, corporate groups, and solo travellers.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-600/25 inline-flex items-center gap-2"
            >
              <span>Contact Travel Expert</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
