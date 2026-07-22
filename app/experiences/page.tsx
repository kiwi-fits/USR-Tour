"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Waves, Utensils, Camera, Compass, Clock, Users, Star, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const experiences = [
  {
    id: 1,
    icon: Waves,
    category: "Adventure",
    title: "Water Sports & Snorkeling",
    desc: "Dive into crystal-clear waters teeming with colorful coral and marine life. Kayak, snorkel, and paddleboard along Jaffna's stunning coast.",
    img: "/exp-watersports.png",
    duration: "4-6 Hours",
    groupSize: "2-12 people",
    rating: "4.9",
    price: "From $35",
    color: "from-teal-DEFAULT to-ocean-500",
    highlights: ["Snorkeling gear included", "Expert guide", "Reef exploration", "Kayaking"],
  },
  {
    id: 2,
    icon: Camera,
    category: "Culture",
    title: "Sunset Island Cruise",
    desc: "Sail the magical Palk Bay in a traditional wooden boat as the sun melts into the ocean horizon, painting the sky in breathtaking orange and pink.",
    img: "/exp-sunset.png",
    duration: "3 Hours",
    groupSize: "2-8 people",
    rating: "4.9",
    price: "From $45",
    color: "from-coral to-sand",
    highlights: ["Traditional boat", "Sunset views", "Photography spots", "Refreshments"],
  },
  {
    id: 3,
    icon: Utensils,
    category: "Food",
    title: "Jaffna Food Trail",
    desc: "Embark on a mouth-watering culinary journey through Jaffna's iconic street food, famous crab curry, string hoppers, and traditional sweets.",
    img: "/exp-food.png",
    duration: "3-4 Hours",
    groupSize: "2-10 people",
    rating: "4.8",
    price: "From $28",
    color: "from-sand to-coral",
    highlights: ["8+ food stops", "Local chef guide", "Hands-on cooking", "Recipes included"],
  },
  {
    id: 4,
    icon: Compass,
    category: "Heritage",
    title: "Temple & Heritage Tour",
    desc: "Journey through Jaffna's most sacred and historic sites — ancient Hindu temples, colonial-era buildings, and vibrant cultural landmarks.",
    img: "/dest-nainativu.png",
    duration: "Full Day",
    groupSize: "2-15 people",
    rating: "4.7",
    price: "From $55",
    color: "from-ocean-500 to-navy",
    highlights: ["Nainativu by boat", "3 temples", "Fort visit", "Local historian guide"],
  },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/exp-sunset.png" alt="Experiences" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-coral/30 to-navy/70" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label text-sand">Curated Experiences</motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">
              Experiences
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
              Every moment in Jaffna is an adventure. Dive into water, culture, cuisine, and unforgettable sunsets.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="py-16 bg-pearl">
        <div className="container-custom space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0}
              className={`bg-white rounded-3xl shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image side */}
              <div className={`relative h-72 lg:h-auto min-h-[320px] img-zoom ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-30`} />
                <div className="absolute top-5 left-5">
                  <span className={`badge bg-gradient-to-r ${exp.color} text-white border-0 shadow-lg`}>
                    <exp.icon className="w-3.5 h-3.5" />
                    {exp.category}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star className="w-4 h-4 fill-sand text-sand" />
                  <span className="font-display font-bold text-navy text-sm">{exp.rating} Rating</span>
                </div>
              </div>

              {/* Content side */}
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="font-display font-black text-navy text-2xl md:text-3xl mb-4">{exp.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{exp.desc}</p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {exp.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT" />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-8 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4 text-teal-DEFAULT" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4 text-coral" />
                    {exp.groupSize}
                  </div>
                  <div className="ml-auto font-display font-black text-ocean-500 text-xl">{exp.price}</div>
                </div>

                <Link href="/booking" id={`book-exp-${exp.id}`} className="btn-primary self-start">
                  Book This Experience <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
