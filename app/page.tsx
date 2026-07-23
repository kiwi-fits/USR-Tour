"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, MapPin, Users, Calendar, Shield,
  Waves, Anchor, Utensils, Camera, ChevronDown, RefreshCw,
} from "lucide-react";
import { useData } from "@/lib/DataContext";

// ─── Fade-up animation variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { number: "15K+", label: "Travelers" },
  { number: "4.9★", label: "Rating" },
  { number: "48+", label: "Packages" },
  { number: "12+", label: "Experience" },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: Waves, title: "Pristine Beaches", desc: "Crystal-clear waters and untouched shores just across the Palk Strait.", color: "ios-icon-primary" },
  { icon: Anchor, title: "Island Hopping", desc: "Explore Nainativu and Delft via scenic, short boat rides.", color: "ios-icon-primary" },
  { icon: Utensils, title: "Authentic Cuisine", desc: "Savour famous Jaffna crab curry and pure vegetarian South Indian delights.", color: "ios-icon-sand" },
  { icon: Camera, title: "Shared Heritage", desc: "Discover our shared Tamil heritage at Nallur Kandaswamy and ancient forts.", color: "ios-icon-coral" },
];



// ─── Testimonials Pool ──────────────────────────────────────────────────────────
const testimonialsPool = [
  { name: "Priya Desai", country: "🇮🇳 India (Chennai)", text: "A perfect weekend getaway! The short flight made it so convenient, and the temples are breathtaking.", stars: 5 },
  { name: "Ravi Sharma", country: "🇮🇳 India (Mumbai)", text: "Casuarina Beach and the sunset cruise were magical. It felt so familiar yet completely serene.", stars: 5 },
  { name: "Arjun Reddy", country: "🇮🇳 India (Hyderabad)", text: "The food trail was incredible. Finding pure vegetarian South Indian food alongside unique Jaffna flavors was a treat.", stars: 5 },
  { name: "Kavitha Murugan", country: "🇮🇳 India (Coimbatore)", text: "Nallur Kovil's evening Pooja gave me goosebumps. The cultural warmth of Jaffna felt just like home.", stars: 5 },
  { name: "Siddharth Verma", country: "🇮🇳 India (Bengaluru)", text: "Island hopping to Delft and Nainativu was the highlight of our vacation. Super smooth booking with USR Tours!", stars: 5 },
  { name: "Meera Krishnan", country: "🇮🇳 India (Madurai)", text: "Outstanding travel arrangements! Pristine beaches and rich Tamil history. Will definitely visit again.", stars: 5 },
  { name: "Vikram Sengupta", country: "🇮🇳 India (New Delhi)", text: "A hidden gem in South Asia. Peaceful beaches, historic Dutch fort, and incredibly warm locals.", stars: 5 },
  { name: "Anand Subramaniam", country: "🇮🇳 India (Trichy)", text: "The catamaran boat ride and Casuarina beach sunset were unforgettable. 10/10 experience!", stars: 5 },
  { name: "Deepa Raman", country: "🇮🇳 India (Pondicherry)", text: "Seamless tour execution from arrival to departure. USR Tours made our Jaffna getaway pure bliss.", stars: 5 },
];

export default function Home() {
  const { destinations } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance reviews every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsPool.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeReviews = [
    testimonialsPool[currentIndex % testimonialsPool.length],
    testimonialsPool[(currentIndex + 1) % testimonialsPool.length],
    testimonialsPool[(currentIndex + 2) % testimonialsPool.length],
  ];

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/hero.png" alt="Jaffna coastline" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-ocean-800/60 to-navy/95" />
        </div>

        {/* Animated wave overlay */}
        <div className="absolute bottom-0 left-0 w-[200%] overflow-hidden leading-[0] opacity-40">
          <svg viewBox="0 0 1440 120" className="animate-wave" preserveAspectRatio="none">
            <path fill="rgba(0,180,216,0.5)" d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container-custom text-center pt-24 pb-16">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div variants={fadeUp} custom={0} className="badge bg-teal-DEFAULT/20 border border-teal-DEFAULT/40 text-white backdrop-blur-sm px-5 py-2 mb-6">
              <Waves className="w-3.5 h-3.5 text-teal-light mr-1" />
              Pearl of the North
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="hero-title max-w-5xl mb-6 drop-shadow-xl">
              Travel With Us.
              <span className="block gradient-text-gold mt-2">Create Memories.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-white text-lg md:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow-lg font-medium">
              Discover turquoise waters, ancient temples, and a familiar culture just a short flight or ferry away from home.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-5">
              <Link href="/packages" id="hero-explore-btn" className="btn-primary text-base drop-shadow-md">
                Explore Packages <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/gallery" className="btn-secondary text-base backdrop-blur-md bg-white/10 text-white drop-shadow-md">
                View Gallery <Camera className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={fadeUp} custom={4} className="w-full grid grid-cols-4 gap-2 md:gap-10 mt-10 md:mt-14 glass-premium rounded-[1.5rem] px-3 md:px-10 py-6 md:py-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white">{s.number}</div>
                  <div className="text-teal-lighter text-[0.65rem] sm:text-xs md:text-sm mt-1 font-outfit uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs font-outfit tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.span variants={fadeUp} className="section-label">Why Jaffna?</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title mt-3">
              A World Apart,<br />
              <span className="gradient-text">Yet Close to Home</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-premium p-8 card-hover group"
              >
                <div className={`ios-icon-box ${f.color} mb-5`}>
                  <f.icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DESTINATIONS ═══════════════════════ */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12"
          >
            <div>
              <motion.span variants={fadeUp} className="section-label">Top Spots</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="section-title mt-3">
                Must-Visit<br />
                <span className="gradient-text">Destinations</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Link href="/destinations" className="btn-secondary">
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-8 pb-10 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 snap-x snap-mandatory no-scrollbar">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-premium group overflow-hidden card-hover cursor-pointer p-0 min-w-[280px] lg:min-w-0 snap-center"
              >
                <div className="relative h-56 img-zoom">
                  <Image src={d.img} alt={d.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 badge badge-ocean bg-white/90 backdrop-blur-sm text-ocean-500 border-white/50">
                    {d.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h3 className="text-white font-display font-bold text-base leading-tight">{d.name}</h3>
                    <div className="flex items-center gap-1 text-sand text-xs font-outfit font-semibold">
                      <Star className="w-3.5 h-3.5 fill-sand text-sand" />
                      {d.rating}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-coral" />
                    {d.distance} from Jaffna
                  </div>
                  <ArrowRight className="w-4 h-4 text-ocean-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA BANNER ═══════════════════════ */}
      <section className="py-12 md:py-20 glass-dark relative overflow-hidden mx-4 md:mx-auto max-w-7xl rounded-[1.5rem] md:rounded-[2rem] mb-8 md:mb-12 shadow-[0_30px_60px_rgba(3,4,94,0.4)] border border-teal-light/20">
        {/* Animated background circles */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-teal-DEFAULT/20 blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-ocean-300/20 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
            <motion.span variants={fadeUp} className="section-label text-teal-lighter text-xs md:text-sm">Limited Slots</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display font-black text-white text-4xl md:text-7xl mt-2 md:mt-4 mb-6 md:mb-8 leading-tight text-shadow-sm">
              Your Perfect Getaway<br />
              <span className="gradient-text-gold">Just Across the Strait</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/80 text-lg md:text-2xl mb-8 md:mb-12 leading-relaxed">
              Book your Jaffna vacation today. Experience a familiar culture, expert local guides, and premium stays without the long-haul travel.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/booking" id="cta-book-btn" className="btn-coral text-lg py-5 px-10">
                Book Your Trip <Calendar className="w-6 h-6" />
              </Link>
              <Link href="/packages" className="btn-secondary text-lg py-5 px-10">
                See All Packages
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: Shield, text: "100% Secure Booking" },
                { icon: Users, text: "15,000+ Happy Guests" },
                { icon: Star, text: "4.9 Star Rated" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-sm font-outfit">
                  <Icon className="w-4 h-4 text-teal-DEFAULT" />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS (AUTO SLIDING) ═══════════════════════ */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fadeUp} className="section-label">Guest Reviews</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="section-title mt-3">
                What Travelers<br />
                <span className="gradient-text">Are Saying</span>
              </motion.h2>
            </motion.div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonialsPool.length) % testimonialsPool.length)}
                className="w-10 h-10 rounded-full bg-white shadow-card border border-teal-lighter flex items-center justify-center text-navy hover:bg-teal-DEFAULT hover:text-white transition-all"
                title="Previous Review"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonialsPool.length)}
                className="w-10 h-10 rounded-full bg-white shadow-card border border-teal-lighter flex items-center justify-center text-navy hover:bg-teal-DEFAULT hover:text-white transition-all"
                title="Next Review"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[260px]">
            <AnimatePresence mode="popLayout">
              {activeReviews.map((t, i) => (
                <motion.div
                  key={`${t.name}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="glass-premium p-8 card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.stars)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-sand text-sand" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-teal-lighter/40">
                    <div className="w-10 h-10 rounded-full bg-ocean-gradient flex items-center justify-center text-white font-display font-bold text-sm shadow-sm shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy text-sm">{t.name}</div>
                      <div className="text-teal-DEFAULT font-semibold text-xs">{t.country}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonialsPool.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex % testimonialsPool.length
                    ? "w-8 bg-teal-DEFAULT shadow-sm"
                    : "w-2 bg-gray-200 hover:bg-gray-400"
                }`}
                title={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
