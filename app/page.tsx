"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Star, MapPin, Users, Calendar, Shield,
  Waves, Anchor, Utensils, Camera, ChevronDown,
} from "lucide-react";

// ─── Fade-up animation variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { number: "15K+", label: "Happy Travelers" },
  { number: "4.9★", label: "Average Rating" },
  { number: "48+", label: "Tour Packages" },
  { number: "12+", label: "Years Experience" },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: Waves, title: "Pristine Beaches", desc: "Crystal-clear waters and untouched sandy shores await you.", color: "bg-teal-lighter text-teal-DEFAULT" },
  { icon: Anchor, title: "Island Hopping", desc: "Explore Nainativu, Delft & more by traditional boat.", color: "bg-blue-50 text-ocean-500" },
  { icon: Utensils, title: "Authentic Cuisine", desc: "Savour famous Jaffna crab curry and string hoppers.", color: "bg-orange-50 text-sand" },
  { icon: Camera, title: "Cultural Heritage", desc: "Ancient temples, colonial forts, and vibrant festivals.", color: "bg-rose-50 text-coral" },
];

// ─── Destinations preview ─────────────────────────────────────────────────────
const destinations = [
  { name: "Casuarina Beach", tag: "Beach", img: "/dest-casuarina.png", rating: "4.9", distance: "14 km" },
  { name: "Nainativu Temple", tag: "Heritage", img: "/dest-nainativu.png", rating: "4.8", distance: "45 km" },
  { name: "Jaffna Fort", tag: "History", img: "/dest-fort.png", rating: "4.7", distance: "2 km" },
  { name: "Delft Island", tag: "Nature", img: "/dest-delft.png", rating: "4.9", distance: "60 km" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Sarah Mitchell", country: "🇬🇧 United Kingdom", text: "The most beautiful and authentic travel experience I've ever had. Jaffna blew my mind completely!", stars: 5 },
  { name: "Ravi Sharma", country: "🇮🇳 India", text: "Casuarina Beach and the sunset cruise were absolutely magical. Booking again next year!", stars: 5 },
  { name: "Emma Kowalski", country: "🇩🇪 Germany", text: "The food trail was a highlight — Jaffna crab curry is the best dish I've ever tasted.", stars: 5 },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/hero.png" alt="Jaffna coastline" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-ocean-500/40 to-navy/80" />
        </div>

        {/* Animated wave overlay */}
        <div className="absolute bottom-0 left-0 w-[200%] overflow-hidden leading-[0] opacity-40">
          <svg viewBox="0 0 1440 120" className="animate-wave" preserveAspectRatio="none">
            <path fill="rgba(0,180,216,0.5)" d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container-custom text-center">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
            <motion.div variants={fadeUp} custom={0} className="badge bg-teal-DEFAULT/20 border border-teal-DEFAULT/40 text-teal-lighter backdrop-blur-sm px-5 py-2">
              <Waves className="w-3.5 h-3.5 text-teal-light mr-1" />
              USR Tours · Pearl of the North
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="hero-title max-w-5xl">
              Travel With Us.
              <span className="block gradient-text-gold">Create Memories.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Discover turquoise waters, ancient temples, pristine beaches, and the vibrant culture of Jaffna with USR Tours.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/packages" id="hero-explore-btn" className="btn-primary text-base">
                Explore Packages <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/gallery" className="btn-secondary text-base">
                View Gallery <Camera className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 glass rounded-2xl px-8 py-5">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-black text-2xl md:text-3xl text-white">{s.number}</div>
                  <div className="text-teal-lighter text-xs md:text-sm mt-1 font-outfit">{s.label}</div>
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
      <section className="py-24 bg-pearl">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="section-label">Why Jaffna?</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title mt-2">
              A World Apart,<br />
              <span className="gradient-text">Yet Close to Home</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-7 shadow-card card-hover group"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DESTINATIONS ═══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <motion.span variants={fadeUp} className="section-label">Top Spots</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="section-title mt-2">
                Must-Visit<br />
                <span className="gradient-text">Destinations</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Link href="/destinations" className="btn-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl overflow-hidden shadow-card bg-white card-hover cursor-pointer"
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
      <section className="py-20 ocean-bg relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-teal-DEFAULT/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-ocean-300/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} className="section-label text-teal-lighter">Limited Slots Available</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display font-black text-white text-4xl md:text-5xl mt-3 mb-5 leading-tight">
              Your Dream Jaffna<br />
              <span className="gradient-text-gold">Vacation Awaits</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/70 text-lg mb-8 leading-relaxed">
              Book before slots fill up. Choose from our curated packages with expert local guides, premium stays, and unforgettable experiences.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" id="cta-book-btn" className="btn-coral text-base">
                Book Your Trip <Calendar className="w-5 h-5" />
              </Link>
              <Link href="/packages" className="btn-secondary text-base">
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

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="py-24 bg-pearl">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="section-label">Guest Reviews</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title mt-2">
              What Travelers<br />
              <span className="gradient-text">Are Saying</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-7 shadow-card card-hover border border-teal-lighter"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-sand text-sand" />
                  ))}
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-gradient flex items-center justify-center text-white font-display font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.country}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
