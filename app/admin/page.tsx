"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useData,
  Destination,
  Experience,
  PackageItem,
  GalleryItem,
  ContactDetails,
} from "@/lib/DataContext";
import {
  Lock,
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  LogOut,
  MapPin,
  Compass,
  Package as PackageIcon,
  Image as ImageIcon,
  Phone,
  CheckCircle,
  X,
  Star,
  ShieldAlert,
  Sparkles,
  Tag,
  Clock,
  DollarSign,
  Users,
  FileText,
  Calendar,
  Check,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passError, setPassError] = useState(false);

  React.useEffect(() => {
    const storedAuth = localStorage.getItem("usr_admin_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    } else if (storedAuth === "false") {
      setIsAuthenticated(false);
    }
  }, []);
  const [activeTab, setActiveTab] = useState<"bookings" | "destinations" | "experiences" | "packages" | "gallery" | "contact">("bookings");

  const {
    destinations, addDestination, updateDestination, deleteDestination,
    experiences, addExperience, updateExperience, deleteExperience,
    packages, addPackage, updatePackage, deletePackage,
    gallery, addGalleryItem, deleteGalleryItem,
    contact, updateContact,
    bookings, updateBookingStatus, deleteBooking,
    resetToDefaults,
  } = useData();

  // Modals state
  const [destModal, setDestModal] = useState<{ open: boolean; item?: Destination }>({ open: false });
  const [expModal, setExpModal] = useState<{ open: boolean; item?: Experience }>({ open: false });
  const [pkgModal, setPkgModal] = useState<{ open: boolean; item?: PackageItem }>({ open: false });
  const [pkgFeatures, setPkgFeatures] = useState<string[]>([]);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [galModal, setGalModal] = useState<{ open: boolean }>({ open: false });
  const [toast, setToast] = useState<string | null>(null);

  const isAnyModalOpen = destModal.open || expModal.open || pkgModal.open || galModal.open;

  React.useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAnyModalOpen]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("usr_admin_auth", "true");
      setPassError(false);
      showToast("Welcome to the Admin Dashboard!");
    } else {
      setPassError(true);
    }
  };

  // ─── LOGIN OVERLAY ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 ocean-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark p-8 md:p-12 rounded-3xl max-w-md w-full border border-teal-light/30 shadow-2xl text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-DEFAULT to-ocean-500 flex items-center justify-center mx-auto mb-6 shadow-ocean">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-black text-white text-3xl mb-2">Admin Portal</h1>
          <p className="text-white/70 text-sm mb-6">Enter your username & password to access the management panel.</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-teal-light block mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                placeholder="Username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-teal-DEFAULT outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-teal-light block mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="Password (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-teal-DEFAULT outline-none transition-all text-sm font-medium"
                required
              />
              {passError && (
                <p className="text-rose-300 text-xs mt-2 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> Invalid credentials. Use 'admin' & 'admin123'
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full py-4 rounded-2xl justify-center text-base font-bold shadow-ocean mt-2">
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 p-3 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/60 space-y-1">
            <p><strong>Sample Credentials:</strong></p>
            <p>Username: <code className="text-teal-lighter font-mono font-bold">admin</code></p>
            <p>Password: <code className="text-teal-lighter font-mono font-bold">admin123</code></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 pb-20 bg-pearl">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-navy text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-teal-DEFAULT flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-teal-DEFAULT" />
            <span className="font-outfit text-sm font-semibold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom">
        {/* Top Bar with Logo in top left corner */}
        <div className="flex items-center justify-start mb-6">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-display font-extrabold gradient-india text-2xl leading-none uppercase tracking-wider">
              USR
            </span>
            <div className="flex justify-between w-full font-display font-medium text-teal-DEFAULT text-[0.65rem] leading-none uppercase mt-1">
              <span>T</span><span>O</span><span>U</span><span>R</span><span>S</span>
            </div>
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100/80 rounded-2xl mb-8 no-scrollbar scroll-smooth">
          {[
            { id: "bookings", label: "Booked Tours", count: bookings.length, icon: Calendar },
            { id: "destinations", label: "Destinations", count: destinations.length, icon: MapPin },
            { id: "experiences", label: "Experiences", count: experiences.length, icon: Compass },
            { id: "packages", label: "Tour Packages", count: packages.length, icon: PackageIcon },
            { id: "gallery", label: "Gallery Photos", count: gallery.length, icon: ImageIcon },
            { id: "contact", label: "Contact Details", count: 1, icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id as any);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "start",
                    block: "nearest",
                  });
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-outfit text-sm font-bold transition-all shrink-0 ${
                  active
                    ? "bg-navy text-white shadow-md border-l-4 border-l-teal-DEFAULT -translate-x-1"
                    : "text-gray-500 hover:text-navy hover:bg-white/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-teal-light" : "text-gray-400"}`} />
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${active ? "bg-teal-DEFAULT text-white" : "bg-gray-200 text-gray-600"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── TAB CONTENTS ─── */}

        {/* 0. BOOKED TOURS TAB */}
        {activeTab === "bookings" && (
          <div>
            <div className="flex items-center justify-between mb-6 bg-white/60 p-4 rounded-2xl border border-gray-100">
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Booked Tours & Reservations ({bookings.length})</h2>
                <p className="text-gray-400 text-xs">View incoming tour bookings, customer contact details, and update reservation status.</p>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-card">
                <Calendar className="w-12 h-12 text-teal-DEFAULT mx-auto mb-3 opacity-50" />
                <h3 className="font-display font-bold text-navy text-lg mb-1">No Booked Tours Yet</h3>
                <p className="text-gray-400 text-xs">When users submit a booking on the site, their reservations will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => {
                  const isExpanded = expandedBookingId === b.id;
                  return (
                    <div
                      key={b.id}
                      className={`bg-white rounded-3xl shadow-card border transition-all duration-300 overflow-hidden ${
                        isExpanded ? "border-teal-DEFAULT ring-2 ring-teal-DEFAULT/20" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {/* Collapsed Card Header */}
                      <div
                        onClick={() => setExpandedBookingId(isExpanded ? null : b.id)}
                        className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-gray-50/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-wrap min-w-0">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-lighter text-ocean-600 border border-teal-DEFAULT/20 shrink-0">
                            {b.id}
                          </span>
                          <h3 className="font-display font-bold text-navy text-base md:text-lg truncate">
                            {b.fullName}
                          </h3>
                          <span className="text-xs font-semibold text-ocean-600 bg-ocean-50 px-2.5 py-0.5 rounded-md border border-ocean-100 hidden sm:inline-block">
                            {b.packageName}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-gray-400 font-medium hidden md:inline-block">
                            {b.date} • {b.guests} Guests
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                              b.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : b.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : b.status === "Completed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {b.status}
                          </span>

                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-teal-lighter hover:text-navy transition-colors">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="border-t border-gray-100 bg-gray-50/40 p-5 space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                <span className="text-gray-400 block font-medium mb-0.5">Email Address</span>
                                <span className="font-bold text-navy truncate block">{b.email}</span>
                              </div>
                              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                <span className="text-gray-400 block font-medium mb-0.5">Phone Number</span>
                                <span className="font-bold text-navy truncate block">{b.phone}</span>
                              </div>
                              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                <span className="text-gray-400 block font-medium mb-0.5">Country / Origin</span>
                                <span className="font-bold text-navy truncate block">{b.country}</span>
                              </div>
                              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                <span className="text-gray-400 block font-medium mb-0.5">Travel Date & Party</span>
                                <span className="font-bold text-navy truncate block">{b.date} • {b.guests} Guests</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 font-medium">Selected Package:</span>
                                <span className="text-xs font-bold text-ocean-600 bg-ocean-50 px-3 py-1 rounded-lg border border-ocean-100">
                                  {b.packageName} ({b.packagePrice})
                                </span>
                                <span className="text-xs text-gray-400 ml-2">Booked on {b.bookedAt}</span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-2">
                                  <label className="text-xs font-bold text-gray-500">Status:</label>
                                  <select
                                    value={b.status}
                                    onChange={(e) => {
                                      const newStatus = e.target.value as any;
                                      updateBookingStatus(b.id, newStatus);
                                      showToast(`Status updated to ${newStatus}`);
                                    }}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                                      b.status === "Confirmed"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : b.status === "Pending"
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : b.status === "Completed"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : "bg-rose-50 text-rose-700 border-rose-200"
                                    }`}
                                  >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Delete booking record ${b.id} for ${b.fullName}?`)) {
                                      deleteBooking(b.id);
                                      showToast("Booking record deleted");
                                    }
                                  }}
                                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 1. DESTINATIONS TAB */}
        {activeTab === "destinations" && (
          <div>
            <div className="flex items-center justify-between mb-6 bg-white/60 p-4 rounded-2xl border border-gray-100">
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Manage Destinations ({destinations.length})</h2>
                <p className="text-gray-400 text-xs">Add new spots or edit existing destination details, ratings, and photos.</p>
              </div>
              <button
                onClick={() => setDestModal({ open: true })}
                className="btn-primary py-2.5 px-4 text-xs font-bold shadow-ocean"
              >
                <Plus className="w-4 h-4" /> Add Destination
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((d) => (
                <div key={d.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:border-teal-light transition-all flex flex-col justify-between group">
                  <div className="relative h-48">
                    <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 badge badge-ocean bg-white/95 backdrop-blur-sm shadow-sm">{d.tag}</div>
                    <div className="absolute top-3 right-3 bg-navy/90 text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-sand fill-sand" /> {d.rating}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-bold text-navy text-lg">{d.name}</h3>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-teal-DEFAULT bg-teal-lighter px-2 py-0.5 rounded-full">
                          Editable
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-4">{d.desc}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 mb-4">
                        <span>📍 {d.distance} from Jaffna</span>
                        <span>⏱️ {d.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDestModal({ open: true, item: d })}
                          className="flex-1 py-2.5 rounded-xl bg-teal-lighter/60 hover:bg-teal-DEFAULT hover:text-white text-ocean-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                        >
                          <Edit3 className="w-4 h-4" /> Edit Details
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete destination "${d.name}"?`)) {
                              deleteDestination(d.id);
                              showToast("Destination deleted!");
                            }
                          }}
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. EXPERIENCES TAB */}
        {activeTab === "experiences" && (
          <div>
            <div className="flex items-center justify-between mb-6 bg-white/60 p-4 rounded-2xl border border-gray-100">
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Manage Experiences ({experiences.length})</h2>
                <p className="text-gray-400 text-xs">Edit prices, group sizes, and highlight tags for curated experiences.</p>
              </div>
              <button
                onClick={() => setExpModal({ open: true })}
                className="btn-primary py-2.5 px-4 text-xs font-bold shadow-ocean"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:border-teal-light transition-all flex flex-col justify-between group">
                  <div className="relative h-48">
                    <Image src={exp.img} alt={exp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 badge badge-ocean bg-white/95">{exp.category}</div>
                    <div className="absolute bottom-3 right-3 bg-navy text-teal-light text-xs px-3 py-1 rounded-full font-bold shadow-md">
                      {exp.price}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-bold text-navy text-lg">{exp.title}</h3>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-teal-DEFAULT bg-teal-lighter px-2 py-0.5 rounded-full">
                          Editable
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-3">{exp.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {exp.highlights.map((h, i) => (
                          <span key={i} className="text-[0.65rem] bg-teal-lighter/80 text-ocean-600 px-2 py-0.5 rounded-md font-medium">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setExpModal({ open: true, item: exp })}
                        className="flex-1 py-2.5 rounded-xl bg-teal-lighter/60 hover:bg-teal-DEFAULT hover:text-white text-ocean-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <Edit3 className="w-4 h-4" /> Edit Details
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${exp.title}"?`)) {
                            deleteExperience(exp.id);
                            showToast("Experience deleted!");
                          }
                        }}
                        className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PACKAGES TAB */}
        {activeTab === "packages" && (
          <div>
            <div className="flex items-center justify-between mb-6 bg-white/60 p-4 rounded-2xl border border-gray-100">
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Manage Tour Packages ({packages.length})</h2>
                <p className="text-gray-400 text-xs">Update tour pricing, duration, features, and featured banners.</p>
              </div>
              <button
                onClick={() => {
                  setPkgModal({ open: true });
                  setPkgFeatures([""]);
                }}
                className="btn-primary py-2.5 px-4 text-xs font-bold shadow-ocean"
              >
                <Plus className="w-4 h-4" /> Add Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:border-teal-light transition-all flex flex-col justify-between group">
                  <div className="relative h-48">
                    <Image src={pkg.img} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {pkg.featured && (
                      <div className="absolute top-3 right-3 badge bg-coral text-white border-none font-bold text-xs shadow-md">
                        ★ FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-navy/90 text-teal-light text-lg font-black px-3 py-1 rounded-xl shadow-md">
                      {pkg.price}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-display font-bold text-navy text-xl">{pkg.name}</h3>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-teal-DEFAULT bg-teal-lighter px-2 py-0.5 rounded-full">
                          Editable
                        </span>
                      </div>
                      <p className="text-teal-DEFAULT text-xs font-bold mb-3">{pkg.subtitle} · {pkg.duration}</p>
                      <ul className="space-y-1 mb-4 text-xs text-gray-500">
                        {pkg.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT" /> {f}
                          </li>
                        ))}
                        {pkg.features.length > 4 && <li className="text-gray-400 text-[0.7rem]">+ {pkg.features.length - 4} more features</li>}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setPkgModal({ open: true, item: pkg });
                          setPkgFeatures(pkg.features || [""]);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-teal-lighter/60 hover:bg-teal-DEFAULT hover:text-white text-ocean-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <Edit3 className="w-4 h-4" /> Edit Package
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete package "${pkg.name}"?`)) {
                            deletePackage(pkg.id);
                            showToast("Package deleted!");
                          }
                        }}
                        className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === "gallery" && (
          <div>
            <div className="flex items-center justify-between mb-6 bg-white/60 p-4 rounded-2xl border border-gray-100">
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Manage Gallery ({gallery.length} Photos)</h2>
                <p className="text-gray-400 text-xs">Upload or link new photos to display in the public image gallery.</p>
              </div>
              <button
                onClick={() => setGalModal({ open: true })}
                className="btn-primary py-2.5 px-4 text-xs font-bold shadow-ocean"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative group bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 h-48">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <span className="badge badge-ocean text-[0.65rem] self-start">{img.tag}</span>
                    <div>
                      <p className="text-white text-xs font-bold line-clamp-2 mb-2">{img.alt}</p>
                      <button
                        onClick={() => {
                          if (confirm("Remove photo from gallery?")) {
                            deleteGalleryItem(img.id);
                            showToast("Photo removed!");
                          }
                        }}
                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-card border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-teal-lighter text-ocean-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-navy text-xl">Edit Business Contact Information</h2>
                <p className="text-gray-400 text-xs">Updates phone numbers, email address, physical location, and operating hours across the site.</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                updateContact({
                  phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
                  email: (form.elements.namedItem("email") as HTMLInputElement).value,
                  address: (form.elements.namedItem("address") as HTMLInputElement).value,
                  hours: (form.elements.namedItem("hours") as HTMLInputElement).value,
                });
                showToast("Contact details updated site-wide!");
              }}
              className="space-y-5"
            >
              <div>
                <label className="form-label flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-DEFAULT" /> Primary Phone Number
                </label>
                <input name="phone" defaultValue={contact.phone} className="input-field" required />
              </div>
              <div>
                <label className="form-label flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-DEFAULT" /> Contact Email Address
                </label>
                <input name="email" type="email" defaultValue={contact.email} className="input-field" required />
              </div>
              <div>
                <label className="form-label flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-DEFAULT" /> Office / Physical Address
                </label>
                <input name="address" defaultValue={contact.address} className="input-field" required />
              </div>
              <div>
                <label className="form-label flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-DEFAULT" /> Operating Business Hours
                </label>
                <input name="hours" defaultValue={contact.hours} className="input-field" required />
              </div>

              <button type="submit" className="btn-primary py-3.5 px-8 rounded-2xl font-bold shadow-ocean">
                Save Site-Wide Contact Info
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ─── BEAUTIFIED MODALS ─── */}

      {/* 1. Destination Modal */}
      {destModal.open && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-teal-light/40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy via-ocean-600 to-teal-DEFAULT text-white px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {destModal.item ? <Edit3 className="w-5 h-5 text-teal-light" /> : <Plus className="w-5 h-5 text-teal-light" />}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg">
                    {destModal.item ? `Edit: ${destModal.item.name}` : "Create New Destination"}
                  </h3>
                  <span className="text-teal-lighter text-xs font-outfit uppercase tracking-wider">
                    {destModal.item ? "Modifying existing location" : "Adding new tourist spot"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDestModal({ open: false })}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              data-lenis-prevent
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                const data = {
                  name: (f.elements.namedItem("name") as HTMLInputElement).value,
                  tag: (f.elements.namedItem("tag") as HTMLSelectElement).value,
                  img: (f.elements.namedItem("img") as HTMLInputElement).value,
                  rating: (f.elements.namedItem("rating") as HTMLInputElement).value,
                  distance: (f.elements.namedItem("distance") as HTMLInputElement).value,
                  duration: (f.elements.namedItem("duration") as HTMLInputElement).value,
                  desc: (f.elements.namedItem("desc") as HTMLTextAreaElement).value,
                };

                if (destModal.item) {
                  updateDestination(destModal.item.id, data);
                  showToast("Destination updated!");
                } else {
                  addDestination(data);
                  showToast("Destination added!");
                }
                setDestModal({ open: false });
              }}
              className="p-6 overflow-y-auto space-y-4 flex-1 overscroll-contain"
            >
              <div className="bg-teal-lighter/60 text-ocean-600 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between border border-teal-DEFAULT/20">
                <span>Editable Form — Change any value below and click Save</span>
              </div>
              {/* Image Preview Banner */}
              <div className="relative h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                <Image
                  src={destModal.item?.img || "/dest-casuarina.png"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="relative z-10 bg-navy/80 text-white text-xs px-3 py-1.5 rounded-full font-bold backdrop-blur-sm">
                  Live Image Preview
                </span>
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Destination Name
                </label>
                <input name="name" defaultValue={destModal.item?.name} placeholder="e.g. Casuarina Beach" className="input-field" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-navy font-bold">
                    Tag Category
                  </label>
                  <select name="tag" defaultValue={destModal.item?.tag || "Beach"} className="input-field">
                    <option value="Beach">Beach</option>
                    <option value="Heritage">Heritage</option>
                    <option value="History">History</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Rating (1.0 – 5.0)
                  </label>
                  <input name="rating" defaultValue={destModal.item?.rating || "4.9"} placeholder="4.9" className="input-field" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-navy font-bold">
                    Distance from City
                  </label>
                  <input name="distance" defaultValue={destModal.item?.distance || "15 km"} placeholder="e.g. 14 km" className="input-field" required />
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Recommended Duration
                  </label>
                  <input name="duration" defaultValue={destModal.item?.duration || "Half Day"} placeholder="e.g. Half Day" className="input-field" required />
                </div>
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Image Path / URL
                </label>
                <input name="img" defaultValue={destModal.item?.img || "/dest-casuarina.png"} placeholder="/dest-casuarina.png" className="input-field" required />
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Description
                </label>
                <textarea name="desc" defaultValue={destModal.item?.desc} placeholder="Write a brief overview of this location..." rows={3} className="input-field" required />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-4 rounded-2xl justify-center font-bold text-base shadow-ocean">
                  {destModal.item ? "Save Destination Changes" : "Create Destination"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Experience Modal */}
      {expModal.open && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-teal-light/40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy via-ocean-600 to-teal-DEFAULT text-white px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {expModal.item ? <Edit3 className="w-5 h-5 text-teal-light" /> : <Plus className="w-5 h-5 text-teal-light" />}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg">
                    {expModal.item ? `Edit: ${expModal.item.title}` : "Create New Experience"}
                  </h3>
                  <span className="text-teal-lighter text-xs font-outfit uppercase tracking-wider">
                    {expModal.item ? "Modifying experience parameters" : "Adding new activity"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setExpModal({ open: false })}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              data-lenis-prevent
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                const highlightsStr = (f.elements.namedItem("highlights") as HTMLInputElement).value;
                const data = {
                  title: (f.elements.namedItem("title") as HTMLInputElement).value,
                  category: (f.elements.namedItem("category") as HTMLSelectElement).value,
                  price: (f.elements.namedItem("price") as HTMLInputElement).value,
                  duration: (f.elements.namedItem("duration") as HTMLInputElement).value,
                  groupSize: (f.elements.namedItem("groupSize") as HTMLInputElement).value,
                  rating: (f.elements.namedItem("rating") as HTMLInputElement).value,
                  img: (f.elements.namedItem("img") as HTMLInputElement).value,
                  desc: (f.elements.namedItem("desc") as HTMLTextAreaElement).value,
                  highlights: highlightsStr.split(",").map((s) => s.trim()).filter(Boolean),
                };

                if (expModal.item) {
                  updateExperience(expModal.item.id, data);
                  showToast("Experience updated!");
                } else {
                  addExperience(data);
                  showToast("Experience added!");
                }
                setExpModal({ open: false });
              }}
              className="p-6 overflow-y-auto space-y-4 flex-1 overscroll-contain"
            >
              <div>
                <label className="form-label text-navy font-bold">
                  Experience Title
                </label>
                <input name="title" defaultValue={expModal.item?.title} placeholder="e.g. Sunset Island Cruise" className="input-field" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-navy font-bold">
                    Category
                  </label>
                  <select name="category" defaultValue={expModal.item?.category || "Adventure"} className="input-field">
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Food">Food</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Price Tag
                  </label>
                  <input name="price" defaultValue={expModal.item?.price || "From $35"} placeholder="e.g. From $35" className="input-field" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="form-label text-navy font-bold">
                    Duration
                  </label>
                  <input name="duration" defaultValue={expModal.item?.duration || "3-4 Hours"} placeholder="3 Hours" className="input-field" required />
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Group
                  </label>
                  <input name="groupSize" defaultValue={expModal.item?.groupSize || "2-8 people"} placeholder="2-8 people" className="input-field" required />
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Rating
                  </label>
                  <input name="rating" defaultValue={expModal.item?.rating || "4.9"} placeholder="4.9" className="input-field" required />
                </div>
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Image Path / URL
                </label>
                <input name="img" defaultValue={expModal.item?.img || "/exp-watersports.png"} placeholder="/exp-watersports.png" className="input-field" required />
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Description
                </label>
                <textarea name="desc" defaultValue={expModal.item?.desc} placeholder="Describe the experience details..." rows={3} className="input-field" required />
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Highlights (comma separated)
                </label>
                <input name="highlights" defaultValue={expModal.item?.highlights.join(", ")} placeholder="Guide included, Snorkeling gear, Refreshments" className="input-field" required />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-4 rounded-2xl justify-center font-bold text-base shadow-ocean">
                  {expModal.item ? "Save Experience Changes" : "Create Experience"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 3. Package Modal */}
      {pkgModal.open && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-teal-light/40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy via-ocean-600 to-teal-DEFAULT text-white px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {pkgModal.item ? <Edit3 className="w-5 h-5 text-teal-light" /> : <Plus className="w-5 h-5 text-teal-light" />}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg">
                    {pkgModal.item ? `Edit: ${pkgModal.item.name}` : "Create Tour Package"}
                  </h3>
                  <span className="text-teal-lighter text-xs font-outfit uppercase tracking-wider">
                    {pkgModal.item ? "Modifying tour itinerary and pricing" : "Adding new package tier"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPkgModal({ open: false })}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              data-lenis-prevent
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                const data = {
                  name: (f.elements.namedItem("name") as HTMLInputElement).value,
                  subtitle: (f.elements.namedItem("subtitle") as HTMLInputElement).value,
                  price: (f.elements.namedItem("price") as HTMLInputElement).value,
                  duration: (f.elements.namedItem("duration") as HTMLInputElement).value,
                  img: (f.elements.namedItem("img") as HTMLInputElement).value,
                  featured: (f.elements.namedItem("featured") as HTMLInputElement).checked,
                  features: pkgFeatures.map(s => s.trim()).filter(Boolean),
                };

                if (pkgModal.item) {
                  updatePackage(pkgModal.item.id, data);
                  showToast("Package updated!");
                } else {
                  addPackage(data);
                  showToast("Package added!");
                }
                setPkgModal({ open: false });
              }}
              className="p-6 overflow-y-auto space-y-4 flex-1 overscroll-contain"
            >
              <div className="bg-teal-lighter/60 text-ocean-600 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between border border-teal-DEFAULT/20">
                <span>Editable Form — Change any value below and click Save</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-navy font-bold">
                    Package Name
                  </label>
                  <input name="name" defaultValue={pkgModal.item?.name} placeholder="e.g. Voyager" className="input-field" required />
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Price (e.g. $299)
                  </label>
                  <input name="price" defaultValue={pkgModal.item?.price || "$299"} placeholder="$299" className="input-field" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-navy font-bold">
                    Subtitle Tagline
                  </label>
                  <input name="subtitle" defaultValue={pkgModal.item?.subtitle || "Most popular choice"} placeholder="Most popular choice" className="input-field" required />
                </div>
                <div>
                  <label className="form-label text-navy font-bold">
                    Duration
                  </label>
                  <input name="duration" defaultValue={pkgModal.item?.duration || "5 Days / 4 Nights"} placeholder="5 Days / 4 Nights" className="input-field" required />
                </div>
              </div>

              <div>
                <label className="form-label text-navy font-bold">
                  Image Path / URL
                </label>
                <input name="img" defaultValue={pkgModal.item?.img || "/dest-casuarina.png"} placeholder="/dest-casuarina.png" className="input-field" required />
              </div>

              <div className="flex items-center gap-3 p-3 bg-teal-lighter/50 rounded-xl border border-teal-light/40">
                <input type="checkbox" id="featured" name="featured" defaultChecked={pkgModal.item?.featured} className="w-5 h-5 rounded text-teal-DEFAULT focus:ring-teal-DEFAULT cursor-pointer" />
                <label htmlFor="featured" className="text-navy text-xs font-bold cursor-pointer">
                  Mark as Featured Package (Displays prominent badge on site)
                </label>
              </div>

              {/* Dynamic Features List */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="form-label text-navy font-bold mb-0">
                    Package Features ({pkgFeatures.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setPkgFeatures([...pkgFeatures, ""])}
                    className="text-xs font-bold text-ocean-600 hover:text-navy flex items-center gap-1.5 bg-teal-lighter px-3 py-1.5 rounded-xl border border-teal-DEFAULT/30 hover:bg-teal-DEFAULT hover:text-white transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Feature Line
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {pkgFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 w-5 text-center">{idx + 1}.</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...pkgFeatures];
                          updated[idx] = e.target.value;
                          setPkgFeatures(updated);
                        }}
                        placeholder={`e.g. ${idx === 0 ? "Casuarina Beach visit" : "Hotel accommodation"}`}
                        className="input-field py-2 text-xs font-medium flex-1"
                        required
                      />
                      {pkgFeatures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPkgFeatures(pkgFeatures.filter((_, i) => i !== idx))}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-100 transition-colors shrink-0"
                          title="Remove feature"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-4 rounded-2xl justify-center font-bold text-base shadow-ocean">
                  {pkgModal.item ? "Save Package Changes" : "Create Tour Package"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 4. Gallery Modal */}
      {galModal.open && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-teal-light/40 flex flex-col max-h-[85vh]"
          >
            <div className="bg-gradient-to-r from-navy via-ocean-600 to-teal-DEFAULT text-white px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Plus className="w-5 h-5 text-teal-light" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg">Add Photo to Gallery</h3>
                  <span className="text-teal-lighter text-xs font-outfit uppercase tracking-wider">
                    Adding new image
                  </span>
                </div>
              </div>
              <button onClick={() => setGalModal({ open: false })} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              data-lenis-prevent
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                addGalleryItem({
                  src: (f.elements.namedItem("src") as HTMLInputElement).value,
                  alt: (f.elements.namedItem("alt") as HTMLInputElement).value,
                  tag: (f.elements.namedItem("tag") as HTMLSelectElement).value,
                });
                showToast("Photo added to gallery!");
                setGalModal({ open: false });
              }}
              className="p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain"
            >
              <div>
                <label className="form-label text-navy font-bold">
                  Image Path / URL
                </label>
                <input name="src" placeholder="/hero.png or https://..." className="input-field" required />
              </div>
              <div>
                <label className="form-label text-navy font-bold">
                  Caption / Description
                </label>
                <input name="alt" placeholder="Casuarina Beach Sunset View" className="input-field" required />
              </div>
              <div>
                <label className="form-label text-navy font-bold">
                  Tag Category
                </label>
                <select name="tag" className="input-field">
                  <option value="Beach">Beach</option>
                  <option value="Heritage">Heritage</option>
                  <option value="History">History</option>
                  <option value="Nature">Nature</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Experiences">Experiences</option>
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-4 rounded-2xl justify-center font-bold text-base shadow-ocean">
                  Add Photo to Gallery
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
