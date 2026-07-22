"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Zap, Crown, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const packages = [
  {
    id: "budget",
    icon: Zap,
    name: "Explorer",
    subtitle: "Perfect for adventurers",
    price: "$149",
    duration: "3 Days / 2 Nights",
    img: "/dest-casuarina.png",
    featured: false,
    color: "from-teal-DEFAULT to-ocean-500",
    features: [
      "Casuarina Beach visit",
      "Jaffna Fort tour",
      "Welcome breakfast",
      "Hotel accommodation (budget)",
      "Airport transfers",
      "Local guide (English)",
    ],
  },
  {
    id: "standard",
    icon: Star,
    name: "Voyager",
    subtitle: "Most popular choice",
    price: "$299",
    duration: "5 Days / 4 Nights",
    img: "/exp-sunset.png",
    featured: true,
    color: "from-ocean-500 to-navy",
    features: [
      "All Explorer features",
      "Nainativu island boat tour",
      "Sunset cruise experience",
      "Jaffna food trail",
      "Mid-range hotel (AC)",
      "Daily breakfast & dinner",
      "Photography guide",
      "Delft island visit",
    ],
  },
  {
    id: "premium",
    icon: Crown,
    name: "Prestige",
    subtitle: "Ultimate luxury experience",
    price: "$599",
    duration: "7 Days / 6 Nights",
    img: "/pkg-premium.png",
    featured: false,
    color: "from-coral to-sand",
    features: [
      "All Voyager features",
      "Luxury beachfront resort",
      "Private chef dining",
      "Helicopter coastal tour",
      "Spa & wellness sessions",
      "Personal concierge 24/7",
      "All meals included",
      "Premium photography",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden ocean-bg">
        <div className="absolute inset-0 opacity-10">
          <Image src="/pkg-premium.png" alt="Packages" fill className="object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label text-teal-lighter">Choose Your Journey</motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">
              Tour Packages
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
              Handcrafted packages for every budget. Every trip includes expert local guides and unforgettable memories.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-pearl">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                id={`package-${pkg.id}`}
                className={`relative rounded-3xl overflow-hidden shadow-card flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                  pkg.featured
                    ? "ocean-bg text-white scale-105 z-10"
                    : "bg-white text-navy"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="badge bg-coral text-white border-0 shadow-coral">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package image */}
                <div className="relative h-48 img-zoom">
                  <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-b ${pkg.featured ? "from-navy/50" : "from-transparent"} to-black/40`} />
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center shadow-lg`}>
                      <pkg.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="mb-5">
                    <h2 className={`font-display font-black text-2xl mb-1 ${pkg.featured ? "text-white" : "text-navy"}`}>
                      {pkg.name}
                    </h2>
                    <p className={`text-sm ${pkg.featured ? "text-white/70" : "text-gray-400"}`}>{pkg.subtitle}</p>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className={`font-display font-black text-4xl ${pkg.featured ? "text-white" : "text-ocean-500"}`}>
                        {pkg.price}
                      </span>
                      <span className={`text-sm ${pkg.featured ? "text-white/60" : "text-gray-400"}`}>/ person</span>
                    </div>
                    <p className={`text-xs mt-1 ${pkg.featured ? "text-teal-lighter" : "text-gray-400"}`}>{pkg.duration}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.featured ? "text-teal-DEFAULT" : "text-teal-DEFAULT"}`} />
                        <span className={pkg.featured ? "text-white/85" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/booking?package=${pkg.id}`}
                    id={`book-${pkg.id}`}
                    className={pkg.featured ? "btn-coral justify-center" : "btn-primary justify-center"}
                  >
                    Book {pkg.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom package CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-14 bg-white rounded-3xl p-10 text-center shadow-card border border-teal-lighter"
          >
            <h3 className="font-display font-black text-navy text-2xl mb-3">Need a Custom Package?</h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              We create fully tailored Jaffna experiences for families, honeymoons, corporate teams, and solo travelers.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
