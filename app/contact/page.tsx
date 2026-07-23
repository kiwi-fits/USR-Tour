"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

  const contactInfo = [
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}`, color: "text-teal-DEFAULT bg-teal-lighter" },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, color: "text-ocean-500 bg-blue-50" },
    { icon: MapPin, label: "Address", value: contact.address, href: "#", color: "text-coral bg-rose-50" },
    { icon: Clock, label: "Hours", value: contact.hours, href: "#", color: "text-sand bg-orange-50" },
  ];

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden ocean-bg">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero.png" alt="Contact" fill className="object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label text-teal-lighter">Get In Touch</motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/75 text-lg max-w-xl mx-auto">
              Have questions? Ready to plan your Jaffna adventure? We're here to help.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-pearl">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-4"
            >
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card card-hover group"
                >
                  <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy text-sm mb-0.5">{info.label}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{info.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Map placeholder */}
              <motion.div variants={fadeUp} custom={4} className="relative h-52 rounded-2xl overflow-hidden shadow-card">
                <Image src="/dest-fort.png" alt="Jaffna location" fill className="object-cover" />
                <div className="absolute inset-0 bg-ocean-500/40 flex items-center justify-center">
                  <div className="glass text-white px-4 py-2 rounded-xl text-sm font-outfit font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-coral" />
                    Jaffna, Sri Lanka
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="lg:col-span-2 bg-white rounded-3xl shadow-card p-8 md:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-5">
                  <div className="w-20 h-20 rounded-full bg-teal-lighter flex items-center justify-center animate-scale-in">
                    <CheckCircle className="w-10 h-10 text-teal-DEFAULT" />
                  </div>
                  <h3 className="font-display font-black text-navy text-2xl">Message Sent!</h3>
                  <p className="text-gray-500 max-w-sm">
                    Thank you for reaching out! Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary mt-4">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-black text-navy text-2xl mb-7">Send Us a Message</h2>
                  <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="form-label">Full Name *</label>
                        <input
                          id="contact-name"
                          {...register("name", { required: "Name is required" })}
                          className="form-input"
                          placeholder="John Smith"
                        />
                        {errors.name && <p className="text-coral text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="form-label">Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                          className="form-input"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-coral text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                        <input
                          id="contact-phone"
                          {...register("phone")}
                          className="form-input"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="form-label">Subject *</label>
                        <select
                          id="contact-subject"
                          {...register("subject", { required: "Please select a subject" })}
                          className="form-input"
                        >
                          <option value="">Select a topic...</option>
                          <option value="booking">Tour Booking</option>
                          <option value="custom">Custom Package</option>
                          <option value="general">General Inquiry</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && <p className="text-coral text-xs mt-1">{errors.subject.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="form-label">Message *</label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        {...register("message", { required: "Message is required", minLength: { value: 20, message: "At least 20 characters" } })}
                        className="form-input resize-none"
                        placeholder="Tell us about your travel plans, questions, or anything else..."
                      />
                      {errors.message && <p className="text-coral text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <><span className="spinner w-5 h-5 mr-2" />Sending...</>
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
