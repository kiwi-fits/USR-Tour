"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck,
  Waves, Anchor, Utensils, Camera, Clock, Sparkles, CheckCircle2,
  Phone, Heart, Quote, Compass
} from "lucide-react";
import { useData } from "@/lib/DataContext";

/* Animation Variants */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stats = [
  { value: "15,000+", label: "Happy Travellers", icon: Users },
  { value: "4.9 ★", label: "Guest Rating", icon: Star },
  { value: "48+", label: "Custom Tours", icon: Compass },
  { value: "12 Yrs", label: "Local Expertise", icon: ShieldCheck },
];

const highlights = [
  {
    icon: Waves,
    title: "Pristine Beaches",
    desc: "Shallow turquoise waters and casuarina-lined shores at Casuarina & Manalkadu.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Anchor,
    title: "Island Hopping",
    desc: "Scenic boat rides to Nainativu Kovil and Delft Island with wild horses.",
    color: "from-cyan-500 to-teal-400",
  },
  {
    icon: Utensils,
    title: "Jaffna Cuisine",
    desc: "Savour authentic Jaffna Crab Curry, spicy Kool seafood, and South Indian Kovil feasts.",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: Camera,
    title: "Tamil Heritage",
    desc: "Immerse in Nallur Kandaswamy Kovil Pooja, Dutch Fort history, and Tamil traditions.",
    color: "from-purple-500 to-indigo-500",
  },
];

const reviews = [
  {
    name: "Priya & Rajesh Desai",
    location: "Chennai, India 🇮🇳",
    text: "A weekend we will never forget! The short flight made it effortless, and Nallur Kovil evening Pooja was divine. USR Tours made everything seamless.",
    rating: 5,
    package: "Heritage & Kovil Tour",
  },
  {
    name: "Ravi Sharma",
    location: "Mumbai, India 🇮🇳",
    text: "Casuarina Beach feels like a private tropical paradise. Clear shallow water for miles! The boat ride to Delft island was incredible.",
    rating: 5,
    package: "Beach & Island Explorer",
  },
  {
    name: "Kavitha Murugan",
    location: "Bengaluru, India 🇮🇳",
    text: "The Jaffna crab curry alone is worth the trip! So familiar yet so unique. Top-tier luxury hotel stay and wonderful local guides.",
    rating: 5,
    package: "Complete Jaffna Package",
  },
];

export default function HomePage() {
  const { destinations, packages } = useData();

  // Search Bar State
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [travelersCount, setTravelersCount] = useState("2");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ══════════════════════════════════════════════
          1. HERO SECTION WITH MODERN GLASS SEARCH CARD
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-950 pt-28 pb-8 sm:pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Jaffna Coastline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-float-slow opacity-60"
          />
          {/* Multi-layered Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/80" />
        </div>

        {/* Hero Body Content */}
        <div className="container-custom relative z-10 my-auto text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl flex flex-col items-center">
            {/* Glowing Badge */}
            <motion.div variants={fadeInUp} custom={0} className="hero-badge mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Sri Lanka's Northern Paradise</span>
            </motion.div>

            {/* Bold Headline */}
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white leading-[1.2] tracking-tight mb-6"
            >
              <span className="block text-[2.65rem] xs:text-5xl sm:text-7xl md:text-8xl leading-none">
                Discover <span className="text-gradient-gold">Jaffna</span>
              </span>
              <span className="block text-[1.5rem] xs:text-[1.8rem] sm:text-5xl md:text-6xl text-gradient-cyan font-extrabold mt-2.5 sm:mt-3">
                Heritage Meets Pristine Seas
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-200 text-base sm:text-xl max-w-2xl font-medium leading-relaxed mb-8 drop-shadow-sm"
            >
              Turquoise beaches, ancient Kovils, and famous crab curry — just a short 90-minute travel from South India.
            </motion.p>
          </motion.div>

          {/* ── FLOATING GLASS SEARCH & BOOKING BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-4xl bg-white/85 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl sm:rounded-full shadow-2xl border border-white/60 flex flex-col sm:flex-row items-center gap-3 mt-4"
          >
            {/* Field 1: Destination */}
            <div className="flex items-center gap-3 w-full sm:w-1/3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200/80">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Destination</span>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
                >
                  <option value="all">All Jaffna Spots</option>
                  <option value="casuarina">Casuarina Beach</option>
                  <option value="nallur">Nallur Kovil</option>
                  <option value="delft">Delft Island</option>
                  <option value="fort">Dutch Fort</option>
                </select>
              </div>
            </div>

            {/* Field 2: Package Type */}
            <div className="flex items-center gap-3 w-full sm:w-1/3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200/80">
              <Calendar className="w-5 h-5 text-cyan-500 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                <span className="font-bold text-slate-800 text-sm">3 Days / 2 Nights</span>
              </div>
            </div>

            {/* Field 3: Guests */}
            <div className="flex items-center gap-3 w-full sm:w-1/3 px-4 py-2">
              <Users className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Travellers</span>
                <select
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
                >
                  <option value="2">2 People (Couple)</option>
                  <option value="4">4 People (Family)</option>
                  <option value="6">6+ Group</option>
                </select>
              </div>
            </div>

            {/* Search Submit CTA */}
            <Link
              href="/packages"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-base px-8 py-4 rounded-2xl sm:rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
            >
              <Search className="w-5 h-5" />
              <span>Find Packages</span>
            </Link>
          </motion.div>
        </div>

        {/* ── HERO GLASS STATS BAR ── */}
        <div className="container-custom relative z-10 mt-12">
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
              {stats.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-md shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-black text-white text-xl sm:text-2xl leading-tight tracking-tight">{s.value}</div>
                      <div className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wide mt-0.5 truncate">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHY VISIT JAFFNA - GLASS FEATURE HIGHLIGHTS
      ══════════════════════════════════════════════ */}
      <section className="pt-6 pb-12 sm:py-20 bg-slate-100/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
              Why Choose Jaffna
            </span>
            <h2 className="font-extrabold text-slate-900 text-3xl sm:text-4xl mt-3 tracking-tight">
              An Unforgettable Experience, <span className="text-gradient-cyan">So Close To Home</span>
            </h2>
            <p className="text-slate-500 text-base mt-3 leading-relaxed">
              Discover Sri Lanka's northern pearl — rich in Tamil culture, serene white sand beaches, and culinary delights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl border border-white/80 shadow-card card-hover-effect flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${h.color} flex items-center justify-center text-white shadow-md mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">{h.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. TOP DESTINATIONS SECTION (GLASS CARDS)
      ══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 bg-slate-100/70">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
                Must-Visit Places
              </span>
              <h2 className="font-extrabold text-slate-900 text-3xl sm:text-4xl mt-3 tracking-tight">
                Top Destinations In Jaffna
              </h2>
            </div>
            <Link
              href="/destinations"
              className="bg-white/80 backdrop-blur-md hover:bg-white text-slate-900 font-bold text-sm px-6 py-3 rounded-full border border-white/80 shadow-sm flex items-center gap-2 self-start md:self-auto"
            >
              <span>View All Spots</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map((d, i) => (
              <motion.div
                key={d.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-card border border-white/70 card-hover-effect flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Category Tag */}
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

                  {/* Location Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-extrabold text-xl leading-tight mb-1">{d.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{d.distance} from Jaffna City</span>
                    </div>
                  </div>
                </div>

                {/* Description & Booking Footer */}
                <div className="p-6 flex flex-col justify-between flex-1 bg-white/85 backdrop-blur-md">
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {d.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{d.duration}</span>
                    </div>
                    <Link
                      href="/booking"
                      className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-xs px-4 py-2 rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FEATURED PACKAGES SECTION (GLASS CARDS)
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
              Handcrafted Tours
            </span>
            <h2 className="font-extrabold text-slate-900 text-3xl sm:text-4xl mt-3 tracking-tight">
              Popular Jaffna Travel Packages
            </h2>
            <p className="text-slate-500 text-base mt-3">
              All-inclusive trips with verified luxury hotel stays, private transport, and local expert Tamil guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
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
                    : "bg-white/85 backdrop-blur-xl text-slate-900 border-white/70 shadow-card"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div>
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
                  <span>Select Package</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. REVIEWS & TESTIMONIALS (GLASS CARDS)
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-100/80">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
              Real Experiences
            </span>
            <h2 className="font-extrabold text-slate-900 text-3xl sm:text-4xl mt-3 tracking-tight">
              Loved By Indian Travellers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white/85 backdrop-blur-xl p-7 rounded-3xl border border-white/70 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-100 mb-2" />
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">"{r.text}"</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                    <span className="text-slate-400 text-xs">{r.location}</span>
                  </div>
                  <span className="text-[0.7rem] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {r.package}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. FULL-BLEED CALL TO ACTION BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 opacity-90" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <Heart className="w-12 h-12 text-yellow-300 fill-yellow-300 mb-4 animate-bounce" />
          <h2 className="font-black text-3xl sm:text-5xl tracking-tight mb-4 text-white">
            Ready to Explore Jaffna?
          </h2>
          <p className="text-slate-100 text-base sm:text-lg mb-8 leading-relaxed">
            Book your customized Jaffna tour today with 100% verified local guides and instant booking confirmation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/booking"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg px-9 py-4 rounded-full shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Book Trip Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+94212221234"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full border border-white/25 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-cyan-300" />
              <span>Call Us Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
