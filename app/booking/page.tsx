"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Check, ChevronRight, ChevronLeft, Calendar, Users, User, CreditCard, CheckCircle } from "lucide-react";
import { useData } from "@/lib/DataContext";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const steps = [
  { id: 1, label: "Package", icon: Calendar },
  { id: 2, label: "Dates", icon: Calendar },
  { id: 3, label: "Details", icon: User },
  { id: 4, label: "Confirm", icon: CreditCard },
];

type BookingForm = {
  startDate: string;
  endDate: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
};

function BookingFormContent() {
  const { addBooking, packages } = useData();
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("package");

  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (pkgParam && packages.some((p) => p.id === pkgParam.toLowerCase())) {
      setSelectedPackage(pkgParam.toLowerCase());
    }
  }, [pkgParam, packages]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingForm>({
    defaultValues: { guests: 2 },
  });

  const formData = watch();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    const pkg = packages.find((p) => p.id === selectedPackage);
    addBooking({
      packageName: pkg ? `${pkg.name} (${pkg.duration})` : "Custom Tour",
      packagePrice: pkg ? pkg.price : "$199",
      fullName: [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "Guest Customer",
      email: formData.email || "",
      phone: formData.phone || "",
      country: formData.country || "India",
      date: formData.startDate || new Date().toISOString().split("T")[0],
      guests: formData.guests || 2,
      status: "Confirmed",
    });
    setConfirmed(true);
  };

  const pkg = packages.find((p) => p.id === selectedPackage);

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl pt-24 pb-16 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-3xl shadow-card p-12 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 rounded-full bg-teal-lighter flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-teal-DEFAULT" />
          </div>
          <h2 className="font-display font-black text-navy text-3xl mb-3">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-3">Your Jaffna adventure is booked. 🌊</p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation email has been sent to <strong className="text-ocean-500">{formData.email}</strong>
          </p>
          {pkg && (
            <div className="relative h-40 rounded-2xl overflow-hidden mb-8">
              <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent flex items-end p-5">
                <div>
                  <p className="text-white font-display font-black text-lg">{pkg.name} Package</p>
                  <p className="text-teal-lighter text-sm">{pkg.duration}</p>
                </div>
              </div>
            </div>
          )}
          <a href="/" className="btn-primary justify-center w-full">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden ocean-bg">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="section-label text-teal-lighter">Book Your Trip</span>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl mt-3 mb-5">Book Now</h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Fill in the details below and lock in your perfect Jaffna experience.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="py-12 bg-pearl">
        <div className="container-custom max-w-3xl">
          {/* Step Indicators */}
          <div className="flex items-center justify-center mb-14">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="relative flex flex-col items-center">
                  <div className={`step-indicator ${
                    step > s.id ? "step-completed" : step === s.id ? "step-active" : "step-inactive"
                  }`}>
                    {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span className={`absolute top-13 whitespace-nowrap text-xs font-outfit font-600 hidden sm:block ${
                    step === s.id ? "text-ocean-500 font-700" : "text-gray-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 transition-colors ${step > s.id ? "bg-coral" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">

              {/* Step 1: Package Selection */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <div className="bg-white rounded-3xl shadow-card p-8">
                    <h2 className="font-display font-black text-navy text-2xl mb-6">Choose Your Package</h2>
                    <div className="space-y-4">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          id={`select-pkg-${pkg.id}`}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedPackage === pkg.id
                              ? "border-ocean-500 bg-blue-50"
                              : "border-gray-100 hover:border-teal-DEFAULT hover:bg-teal-lighter/30"
                          }`}
                        >
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                            <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-display font-bold text-navy text-base">{pkg.name}</p>
                            <p className="text-gray-400 text-sm">{pkg.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-black text-ocean-500 text-xl">{pkg.price}</p>
                            <p className="text-gray-400 text-xs">per person</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedPackage === pkg.id ? "border-ocean-500 bg-ocean-500" : "border-gray-200"
                          }`}>
                            {selectedPackage === pkg.id && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      id="step1-next"
                      disabled={!selectedPackage}
                      onClick={() => setStep(2)}
                      className="btn-primary disabled:opacity-50"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Dates */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <div className="bg-white rounded-3xl shadow-card p-8">
                    <h2 className="font-display font-black text-navy text-2xl mb-6">Select Your Dates</h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="start-date" className="form-label">Arrival Date *</label>
                          <input id="start-date" type="date" {...register("startDate", { required: true })} className="form-input" />
                          {errors.startDate && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="end-date" className="form-label">Departure Date *</label>
                          <input id="end-date" type="date" {...register("endDate", { required: true })} className="form-input" />
                          {errors.endDate && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="guests-count" className="form-label">Number of Guests *</label>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-teal-DEFAULT" />
                          <input
                            id="guests-count"
                            type="number"
                            min={1}
                            max={20}
                            {...register("guests", { required: true, min: 1, max: 20 })}
                            className="form-input max-w-[140px]"
                          />
                          <span className="text-gray-400 text-sm">person(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary !text-gray-600 !border-gray-200 hover:!bg-gray-50">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" id="step2-next" onClick={() => setStep(3)} className="btn-primary">
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Personal Details */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <div className="bg-white rounded-3xl shadow-card p-8">
                    <h2 className="font-display font-black text-navy text-2xl mb-6">Personal Details</h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="first-name" className="form-label">First Name *</label>
                          <input id="first-name" {...register("firstName", { required: true })} className="form-input" placeholder="John" />
                          {errors.firstName && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="last-name" className="form-label">Last Name *</label>
                          <input id="last-name" {...register("lastName", { required: true })} className="form-input" placeholder="Smith" />
                          {errors.lastName && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="booking-email" className="form-label">Email Address *</label>
                        <input id="booking-email" type="email" {...register("email", { required: true })} className="form-input" placeholder="john@example.com" />
                        {errors.email && <p className="text-coral text-xs mt-1">Required</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="booking-phone" className="form-label">Phone Number *</label>
                          <input id="booking-phone" {...register("phone", { required: true })} className="form-input" placeholder="+1 234 567 8900" />
                          {errors.phone && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="booking-country" className="form-label">Country *</label>
                          <input id="booking-country" {...register("country", { required: true })} className="form-input" placeholder="United Kingdom" />
                          {errors.country && <p className="text-coral text-xs mt-1">Required</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="special-requests" className="form-label">Special Requests</label>
                        <textarea id="special-requests" rows={3} {...register("specialRequests")} className="form-input resize-none" placeholder="Dietary requirements, accessibility needs, celebrations..." />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary !text-gray-600 !border-gray-200 hover:!bg-gray-50">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" id="step3-next" onClick={() => setStep(4)} className="btn-primary">
                      Review Booking <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <div className="bg-white rounded-3xl shadow-card p-8">
                    <h2 className="font-display font-black text-navy text-2xl mb-6">Review & Confirm</h2>
                    {pkg && (
                      <div className="relative h-44 rounded-2xl overflow-hidden mb-6">
                        <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-6">
                          <div>
                            <p className="text-white font-display font-black text-xl">{pkg.name} Package</p>
                            <p className="text-teal-lighter text-sm">{pkg.duration} · {pkg.price} per person</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-3 text-sm">
                      {[
                        { label: "Name", value: `${formData.firstName || "—"} ${formData.lastName || ""}` },
                        { label: "Email", value: formData.email || "—" },
                        { label: "Phone", value: formData.phone || "—" },
                        { label: "Country", value: formData.country || "—" },
                        { label: "Arrival", value: formData.startDate || "—" },
                        { label: "Departure", value: formData.endDate || "—" },
                        { label: "Guests", value: `${formData.guests || 2} person(s)` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-400 font-outfit">{label}</span>
                          <span className="font-outfit font-600 text-navy">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(3)} className="btn-secondary !text-gray-600 !border-gray-200 hover:!bg-gray-50">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" id="confirm-booking-btn" className="btn-coral">
                      Confirm Booking <Check className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-pearl pt-24">
        <div className="spinner" />
      </div>
    }>
      <BookingFormContent />
    </Suspense>
  );
}

