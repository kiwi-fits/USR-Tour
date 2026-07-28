"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Check, ChevronRight, ChevronLeft, Calendar, User, CreditCard, CheckCircle2, Users, Compass, Sparkles } from "lucide-react";
import { useData } from "@/lib/DataContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
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
    await new Promise((r) => setTimeout(r, 1000));
    const pkg = packages.find((p) => p.id === selectedPackage);
    addBooking({
      packageName: pkg ? `${pkg.name} (${pkg.duration})` : "Custom Tour",
      packagePrice: pkg ? pkg.price : "LKR 60,000",
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-28 pb-16 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-lg w-full shadow-card border border-slate-200/80"
        >
          <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500 mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="font-extrabold text-slate-900 text-3xl mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 text-base mb-2">Your Jaffna trip is officially reserved. 🌊</p>
          <p className="text-slate-400 text-xs mb-8">
            A confirmation receipt has been sent to <strong className="text-blue-600">{formData.email}</strong>
          </p>

          {pkg && (
            <div className="relative h-40 rounded-2xl overflow-hidden mb-8">
              <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-5 flex items-end">
                <div className="text-left">
                  <p className="text-white font-extrabold text-lg">{pkg.name} Package</p>
                  <p className="text-cyan-400 text-xs font-bold">{pkg.duration} · {pkg.price} per person</p>
                </div>
              </div>
            </div>
          )}

          <a href="/" className="w-full py-4 rounded-2xl bg-blue-600 text-white font-extrabold text-center block shadow-lg shadow-blue-600/30">
            Return To Homepage
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div variants={fadeInUp} custom={0} className="hero-badge mb-4">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Instant Confirmation</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-black text-white text-4xl sm:text-6xl tracking-tight mb-4"
            >
              Book Your <span className="text-gradient-cyan">Experience</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Select your package, choose travel dates, and reserve your trip in 4 quick steps.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING STEPPER & FORM ── */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      step > s.id
                        ? "bg-blue-600 text-white"
                        : step === s.id
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span className={`text-xs font-bold mt-2 hidden sm:block ${step === s.id ? "text-blue-600" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-1 mx-2 rounded-full transition-colors ${
                      step > s.id ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">

              {/* Step 1: Package Selection */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
                    <h2 className="font-extrabold text-slate-900 text-2xl mb-6">Select A Travel Package</h2>
                    <div className="space-y-4">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedPackage === pkg.id
                              ? "border-blue-600 bg-blue-50/50 shadow-md"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                            <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-extrabold text-slate-900 text-base">{pkg.name}</h4>
                            <p className="text-slate-500 text-xs font-semibold">{pkg.duration}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-blue-600 text-xl">{pkg.price}</span>
                            <p className="text-slate-400 text-[0.68rem] font-bold uppercase">per person</p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedPackage === pkg.id ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {selectedPackage === pkg.id && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      disabled={!selectedPackage}
                      onClick={() => setStep(2)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
                    >
                      <span>Next Step</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Travel Dates */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
                    <h2 className="font-extrabold text-slate-900 text-2xl mb-6">Choose Dates & Guests</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Arrival Date *</label>
                          <input
                            type="date"
                            {...register("startDate", { required: true })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.startDate && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Departure Date *</label>
                          <input
                            type="date"
                            {...register("endDate", { required: true })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.endDate && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Total Travellers *</label>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <input
                            type="number"
                            min={1}
                            max={20}
                            {...register("guests", { required: true, min: 1, max: 20 })}
                            className="w-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none"
                          />
                          <span className="text-slate-500 text-sm font-semibold">person(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2"
                    >
                      <span>Next Step</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Passenger Details */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
                    <h2 className="font-extrabold text-slate-900 text-2xl mb-6">Passenger Information</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">First Name *</label>
                          <input
                            {...register("firstName", { required: true })}
                            placeholder="John"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.firstName && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Last Name *</label>
                          <input
                            {...register("lastName", { required: true })}
                            placeholder="Smith"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.lastName && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                        />
                        {errors.email && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number *</label>
                          <input
                            {...register("phone", { required: true })}
                            placeholder="+91 98400 12345"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.phone && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Country *</label>
                          <input
                            {...register("country", { required: true })}
                            placeholder="India"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                          />
                          {errors.country && <span className="text-xs font-bold text-rose-500 mt-1 block">Required</span>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Special Requests</label>
                        <textarea
                          rows={3}
                          {...register("specialRequests")}
                          placeholder="Dietary requirements, Kovil preferences, anniversary celebrations..."
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:border-blue-600 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2"
                    >
                      <span>Review Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Summary & Confirm */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
                    <h2 className="font-extrabold text-slate-900 text-2xl mb-6">Review Booking Summary</h2>
                    
                    {pkg && (
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
                        <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-5 flex items-end">
                          <div>
                            <p className="text-white font-extrabold text-xl">{pkg.name} Package</p>
                            <p className="text-cyan-400 text-xs font-bold">{pkg.duration} · {pkg.price} per person</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 text-sm">
                      {[
                        { label: "Guest Name", value: `${formData.firstName || "—"} ${formData.lastName || ""}` },
                        { label: "Email", value: formData.email || "—" },
                        { label: "Phone", value: formData.phone || "—" },
                        { label: "Country", value: formData.country || "—" },
                        { label: "Arrival Date", value: formData.startDate || "—" },
                        { label: "Departure Date", value: formData.endDate || "—" },
                        { label: "Guests Count", value: `${formData.guests || 2} person(s)` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-400 font-semibold">{label}</span>
                          <span className="font-extrabold text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold px-9 py-4 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Confirm & Reserve</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-28 flex justify-center"><div className="spinner" /></div>}>
      <BookingFormContent />
    </Suspense>
  );
}
