"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Compass } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { contact } = useData();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const contactCards = [
    { icon: Phone, label: "Call Us Direct", value: contact.phone, href: `tel:${contact.phone}`, color: "bg-blue-50 text-blue-600" },
    { icon: Mail, label: "Email Support", value: contact.email, href: `mailto:${contact.email}`, color: "bg-cyan-50 text-cyan-600" },
    { icon: MapPin, label: "Visit Office", value: contact.address, href: "#", color: "bg-rose-50 text-rose-600" },
    { icon: Clock, label: "Working Hours", value: contact.hours, href: "#", color: "bg-amber-50 text-amber-600" },
  ];

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Contact"
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
              <span>Here To Help</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Get In <span className="text-gradient-cyan">Touch</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Have questions about flight connectivity, visas, or customized itineraries? Our Jaffna team is at your service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Info Cards Side (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-extrabold text-slate-900 text-2xl mb-6">Contact Channels</h2>
              
              {contactCards.map((card, i) => {
                const IconComp = card.icon;
                return (
                  <motion.a
                    key={card.label}
                    href={card.href}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={i}
                    className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-card card-hover-effect block"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</span>
                      <p className="font-extrabold text-slate-900 text-base mt-0.5">{card.value}</p>
                    </div>
                  </motion.a>
                );
              })}

              {/* Map Badge Box */}
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-card border border-slate-200 mt-6">
                <Image src="/dest-fort.png" alt="Jaffna Location" fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center p-4">
                  <div className="bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Nallur, Jaffna, Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Side (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="font-black text-slate-900 text-3xl">Message Received!</h3>
                    <p className="text-slate-500 max-w-md">
                      Thank you for contacting USR Tours. One of our Jaffna trip specialists will call/email you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-8 py-3 rounded-full shadow-lg shadow-blue-600/25 mt-4"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-extrabold text-slate-900 text-2xl sm:text-3xl mb-2">Send Us A Message</h2>
                    <p className="text-slate-500 text-sm mb-8">Fill in your details and travel preferences below.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name *</label>
                          <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="John Smith"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                          />
                          {errors.name && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.name.message}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                          />
                          {errors.email && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.email.message}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
                          <input
                            {...register("phone")}
                            placeholder="+91 98400 12345"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Inquiry Topic *</label>
                          <select
                            {...register("subject", { required: "Please select topic" })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                          >
                            <option value="">Select a topic...</option>
                            <option value="tour">Tour Booking</option>
                            <option value="custom">Custom Package</option>
                            <option value="general">General Question</option>
                          </select>
                          {errors.subject && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.subject.message}</span>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message *</label>
                        <textarea
                          rows={4}
                          {...register("message", { required: "Message is required" })}
                          placeholder="Tell us about your travel dates, group size, or questions..."
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                        />
                        {errors.message && <span className="text-xs font-bold text-rose-500 mt-1 block">{errors.message.message}</span>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-transform active:scale-95 disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                        <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
