"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useData,
  Destination,
  Experience,
  PackageItem,
} from "@/lib/DataContext";
import {
  Lock,
  Plus,
  Edit3,
  Trash2,
  LogOut,
  MapPin,
  Compass,
  Package as PackageIcon,
  Image as ImageIcon,
  Phone,
  CheckCircle2,
  X,
  Star,
  ShieldAlert,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  Upload,
} from "lucide-react";

/* ── REUSABLE LOCAL DEVICE IMAGE UPLOADER COMPONENT ── */
function ImageUploader({
  value,
  onChange,
  name = "img",
  label = "Upload Image from Device",
}: {
  value: string;
  onChange: (val: string) => void;
  name?: string;
  label?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please select an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onChange(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
        {label}
      </label>

      {/* Hidden form input holding the Data URL value */}
      <input type="hidden" name={name} value={value} />

      <div className="space-y-3">
        {value ? (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-xs">
            <img src={value} alt="Uploaded Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Upload New</span>
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:bg-rose-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-sm block">Choose image from your local device</span>
              <span className="text-xs text-slate-400 font-medium">Supports PNG, JPG, WEBP & SVG</span>
            </div>
          </div>
        )}

        {/* Hidden File Picker */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Option to paste image URL */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste an image URL (e.g. /dest-casuarina.png)"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("usr_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const [activeTab, setActiveTab] = useState<"bookings" | "destinations" | "experiences" | "packages" | "gallery" | "contact">("bookings");

  const {
    destinations, addDestination, updateDestination, deleteDestination,
    experiences, addExperience, updateExperience, deleteExperience,
    packages, addPackage, updatePackage, deletePackage,
    gallery, addGalleryItem, deleteGalleryItem,
    contact, updateContact,
    bookings, updateBookingStatus, deleteBooking,
  } = useData();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [destModal, setDestModal] = useState<{ open: boolean; item?: Destination }>({ open: false });
  const [expModal, setExpModal] = useState<{ open: boolean; item?: Experience }>({ open: false });
  const [pkgModal, setPkgModal] = useState<{ open: boolean; item?: PackageItem }>({ open: false });
  const [pkgFeatures, setPkgFeatures] = useState<string[]>([]);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [galModal, setGalModal] = useState<{ open: boolean }>({ open: false });
  const [toast, setToast] = useState<string | null>(null);

  // Local Device Upload States
  const [destImg, setDestImg] = useState("");
  const [expImg, setExpImg] = useState("");
  const [pkgImg, setPkgImg] = useState("");
  const [galImg, setGalImg] = useState("");

  useEffect(() => {
    if (destModal.open) setDestImg(destModal.item?.img || "/dest-casuarina.png");
  }, [destModal]);

  useEffect(() => {
    if (expModal.open) setExpImg(expModal.item?.img || "/exp-sunset.png");
  }, [expModal]);

  useEffect(() => {
    if (pkgModal.open) {
      setPkgImg(pkgModal.item?.img || "/pkg-premium.png");
      setPkgFeatures(pkgModal.item?.features || ["Luxury Hotel Stay", "Private AC Car", "Tamil Guide"]);
    }
  }, [pkgModal]);

  useEffect(() => {
    if (galModal.open) setGalImg("/dest-casuarina.png");
  }, [galModal]);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-white shadow-2xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-extrabold text-2xl tracking-tight">Admin Portal Login</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to manage Jaffna tourism agency operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>

            {passError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Invalid credentials! Try admin / admin123</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 font-extrabold text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-95 mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 font-medium">
            Demo Credentials: <span className="text-cyan-400 font-mono">admin</span> / <span className="text-cyan-400 font-mono">admin123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Summary counts
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const completedCount = bookings.filter((b) => b.status === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-40 md:pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOP MENU BAR (GLASSMORPHISM & RESPONSIVE FIT) ── */}
      <header className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/70 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
              USR <span className="text-cyan-500">TOURS</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block text-[0.7rem] font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
            Admin Portal
          </span>
        </div>

        <button
          onClick={() => {
            setIsAuthenticated(false);
            localStorage.setItem("usr_admin_auth", "false");
            showToast("Signed out successfully");
          }}
          className="px-3.5 sm:px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-colors border border-slate-200/80"
        >
          <LogOut className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="container-custom pt-5 sm:pt-8">
        
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center justify-between gap-4 mb-8 bg-white p-2 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "bookings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings</span>
              {pendingCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-extrabold bg-rose-500 text-white rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("destinations")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "destinations"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Spots</span>
            </button>

            <button
              onClick={() => setActiveTab("experiences")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "experiences"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Experiences</span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "packages"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <PackageIcon className="w-4 h-4" />
              <span>Tours</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "gallery"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photos</span>
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "contact"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Agency Info</span>
            </button>
          </div>
        </div>

        {/* Tab 1: BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Stat Summary Cards (Clean Vertical Stacked Layout - No Truncation) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {/* Card 1: Total */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-wider text-slate-400">Total Bookings</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm shrink-0">
                    {bookings.length}
                  </div>
                </div>
                <div className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight">
                  {bookings.length} Requests
                </div>
              </div>

              {/* Card 2: Confirmed */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-wider text-slate-400">Confirmed</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm shrink-0">
                    {confirmedCount}
                  </div>
                </div>
                <div className="font-extrabold text-emerald-600 text-base sm:text-xl tracking-tight">
                  {confirmedCount} Active
                </div>
              </div>

              {/* Card 3: Pending */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-wider text-slate-400">Pending</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-sm shrink-0">
                    {pendingCount}
                  </div>
                </div>
                <div className="font-extrabold text-amber-600 text-base sm:text-xl tracking-tight">
                  {pendingCount} Review
                </div>
              </div>

              {/* Card 4: Completed */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-wider text-slate-400">Completed</span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-sm shrink-0">
                    {completedCount}
                  </div>
                </div>
                <div className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight">
                  {completedCount} Finished
                </div>
              </div>
            </div>

            {/* Bookings Search & Filter Controls */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search customer, phone or package..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {["all", "Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap ${
                      statusFilter === st
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookings
                .filter((b) => {
                  const matchesStatus = statusFilter === "all" || b.status === statusFilter;
                  const matchesSearch =
                    (b.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (b.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (b.phone || "").includes(searchQuery) ||
                    (b.packageName || "").toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesStatus && matchesSearch;
                })
                .map((b) => {
                  const isExpanded = expandedBookingId === b.id;
                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-card transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-lg sm:text-xl shrink-0">
                            {(b.fullName || "G").charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">{b.fullName}</h3>
                              <span
                                className={`text-[0.62rem] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  b.status === "Confirmed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : b.status === "Pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : b.status === "Completed"
                                    ? "bg-cyan-100 text-cyan-800"
                                    : "bg-rose-100 text-rose-700"
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>
                            <p className="text-slate-500 text-xs mt-0.5 font-medium leading-relaxed">
                              Package: <strong className="text-slate-800">{b.packageName}</strong> · {b.guests} People · Date: {b.date}
                            </p>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-between sm:justify-end">
                          <select
                            value={b.status}
                            onChange={(e) => {
                              updateBookingStatus(b.id, e.target.value as any);
                              showToast(`Booking marked as ${e.target.value}`);
                            }}
                            className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setExpandedBookingId(isExpanded ? null : b.id)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
                              title="Toggle details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => {
                                if (confirm("Delete this booking record?")) {
                                  deleteBooking(b.id);
                                  showToast("Booking deleted");
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600"
                              title="Delete booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl">
                          <div><strong>Email:</strong> {b.email}</div>
                          <div><strong>Phone:</strong> {b.phone}</div>
                          <div><strong>Country:</strong> {b.country || "Not specified"}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Tab 2: DESTINATIONS / SPOTS */}
        {activeTab === "destinations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-slate-900 text-2xl">Jaffna Spots ({destinations.length})</h2>
                <p className="text-slate-500 text-sm">Add or edit tourist spots displayed on the main website.</p>
              </div>
              <button
                onClick={() => setDestModal({ open: true })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {destinations.map((d) => (
                <div key={d.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card flex flex-col justify-between group">
                  <div>
                    <div className="relative h-52 w-full bg-slate-100">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {d.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-extrabold text-slate-900 text-xl">{d.name}</h3>
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {d.rating}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{d.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex items-center justify-end gap-2 border-t border-slate-100/60 mt-2">
                    <button
                      onClick={() => setDestModal({ open: true, item: d })}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete spot "${d.name}"?`)) {
                          deleteDestination(d.id);
                          showToast("Spot deleted");
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: EXPERIENCES */}
        {activeTab === "experiences" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-slate-900 text-2xl">Jaffna Experiences ({experiences.length})</h2>
                <p className="text-slate-500 text-sm">Manage unique activities like Sunset Boat Tours & Food Trails.</p>
              </div>
              <button
                onClick={() => setExpModal({ open: true })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card flex flex-col justify-between group">
                  <div>
                    <div className="relative h-52 w-full bg-slate-100">
                      <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {exp.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full">
                        {exp.price}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-extrabold text-slate-900 text-xl mb-1.5">{exp.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{exp.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex items-center justify-end gap-2 border-t border-slate-100/60 mt-2">
                    <button
                      onClick={() => setExpModal({ open: true, item: exp })}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete experience "${exp.title}"?`)) {
                          deleteExperience(exp.id);
                          showToast("Experience deleted");
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: TOUR PACKAGES */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-slate-900 text-2xl">Tour Packages ({packages.length})</h2>
                <p className="text-slate-500 text-sm">Configure multi-day travel packages for tourists.</p>
              </div>
              <button
                onClick={() => setPkgModal({ open: true })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                      <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                      {pkg.featured && (
                        <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-[0.65rem] px-3 py-1 rounded-full shadow-md">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{pkg.subtitle}</span>
                    <h3 className="font-extrabold text-slate-900 text-2xl mt-0.5">{pkg.name}</h3>
                    <div className="font-black text-3xl text-slate-900 mt-2 mb-5">{pkg.price} <span className="text-xs text-slate-400 font-normal">/ person</span></div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setPkgModal({ open: true, item: pkg })}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete package "${pkg.name}"?`)) {
                          deletePackage(pkg.id);
                          showToast("Package deleted");
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: PHOTOS / GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-slate-900 text-2xl">Photo Gallery ({gallery.length})</h2>
                <p className="text-slate-500 text-sm">Upload images directly from your device to display in the gallery.</p>
              </div>
              <button
                onClick={() => setGalModal({ open: true })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Upload className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {gallery.map((g) => (
                <div key={g.id} className="relative h-48 sm:h-52 rounded-3xl overflow-hidden border border-slate-200/80 group bg-slate-100 shadow-xs">
                  <img src={g.src} alt={g.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                    <span className="text-xs font-bold bg-blue-600 px-3 py-1 rounded-full self-start shadow-md">{g.tag}</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold truncate">{g.alt}</span>
                      <button
                        onClick={() => {
                          deleteGalleryItem(g.id);
                          showToast("Photo deleted");
                        }}
                        className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shrink-0"
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

        {/* Tab 6: AGENCY CONTACT INFO */}
        {activeTab === "contact" && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
            <h2 className="font-extrabold text-slate-900 text-2xl mb-1">Agency Details</h2>
            <p className="text-slate-500 text-sm mb-6">Update contact info displayed on footer & contact page.</p>

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
                showToast("Agency contact info updated");
              }}
              className="space-y-4 sm:space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Phone Number</label>
                <input name="phone" defaultValue={contact.phone} required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email Address</label>
                <input name="email" defaultValue={contact.email} required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Office Address</label>
                <input name="address" defaultValue={contact.address} required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Working Hours</label>
                <input name="hours" defaultValue={contact.hours} required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-sm focus:outline-none focus:border-blue-500" />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/30 transition-transform active:scale-95 mt-2"
              >
                Save Contact Info
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── MODALS WITH LOCAL DEVICE IMAGE UPLOADER ── */}

      {/* Destination Modal */}
      {destModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-2xl">
                {destModal.item ? "Edit Destination" : "Add Destination"}
              </h3>
              <button onClick={() => setDestModal({ open: false })} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = {
                  name: (form.elements.namedItem("name") as HTMLInputElement).value,
                  tag: (form.elements.namedItem("tag") as HTMLSelectElement).value,
                  rating: (form.elements.namedItem("rating") as HTMLInputElement).value,
                  distance: (form.elements.namedItem("distance") as HTMLInputElement).value,
                  duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
                  img: destImg || (form.elements.namedItem("img") as HTMLInputElement).value,
                  desc: (form.elements.namedItem("desc") as HTMLTextAreaElement).value,
                };
                if (destModal.item) {
                  updateDestination(destModal.item.id, data);
                  showToast("Destination updated");
                } else {
                  addDestination(data);
                  showToast("Destination added");
                }
                setDestModal({ open: false });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Name</label>
                <input name="name" defaultValue={destModal.item?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category Tag</label>
                  <select name="tag" defaultValue={destModal.item?.tag || "Beach"} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold">
                    <option value="Beach">Beach</option>
                    <option value="Heritage">Heritage</option>
                    <option value="History">History</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Rating</label>
                  <input name="rating" defaultValue={destModal.item?.rating || "4.9 ★"} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Distance</label>
                  <input name="distance" defaultValue={destModal.item?.distance} placeholder="e.g. 15 km" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Duration</label>
                  <input name="duration" defaultValue={destModal.item?.duration} placeholder="e.g. Half Day" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
              </div>

              {/* Local Device Image Uploader */}
              <ImageUploader value={destImg} onChange={setDestImg} name="img" label="Spot Image (Device Upload)" />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Description</label>
                <textarea name="desc" defaultValue={destModal.item?.desc} rows={3} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold resize-none" />
              </div>
              <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/30">
                Save Destination
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {expModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-2xl">
                {expModal.item ? "Edit Experience" : "Add Experience"}
              </h3>
              <button onClick={() => setExpModal({ open: false })} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = {
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  category: (form.elements.namedItem("category") as HTMLSelectElement).value,
                  price: (form.elements.namedItem("price") as HTMLInputElement).value,
                  rating: (form.elements.namedItem("rating") as HTMLInputElement).value,
                  duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
                  groupSize: (form.elements.namedItem("groupSize") as HTMLInputElement).value,
                  img: expImg || (form.elements.namedItem("img") as HTMLInputElement).value,
                  desc: (form.elements.namedItem("desc") as HTMLTextAreaElement).value,
                  highlights: (form.elements.namedItem("highlights") as HTMLInputElement).value.split(",").map(s => s.trim()).filter(Boolean),
                };
                if (expModal.item) {
                  updateExperience(expModal.item.id, data);
                  showToast("Experience updated");
                } else {
                  addExperience(data);
                  showToast("Experience added");
                }
                setExpModal({ open: false });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Title</label>
                <input name="title" defaultValue={expModal.item?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category</label>
                  <select name="category" defaultValue={expModal.item?.category || "Adventure"} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold">
                    <option value="Adventure">Adventure</option>
                    <option value="Food">Food</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Price</label>
                  <input name="price" defaultValue={expModal.item?.price || "LKR 15,000"} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Rating</label>
                  <input name="rating" defaultValue={expModal.item?.rating || "4.9 ★"} required className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Duration</label>
                  <input name="duration" defaultValue={expModal.item?.duration || "3 Hours"} required className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Group Size</label>
                  <input name="groupSize" defaultValue={expModal.item?.groupSize || "1-8 People"} required className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
              </div>

              {/* Local Device Image Uploader */}
              <ImageUploader value={expImg} onChange={setExpImg} name="img" label="Experience Image (Device Upload)" />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Highlights (comma separated)</label>
                <input name="highlights" defaultValue={expModal.item?.highlights.join(", ")} placeholder="Sunset views, Private boat, Refreshments" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Description</label>
                <textarea name="desc" defaultValue={expModal.item?.desc} rows={3} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold resize-none" />
              </div>
              <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/30">
                Save Experience
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {pkgModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-2xl">
                {pkgModal.item ? "Edit Package" : "Add Package"}
              </h3>
              <button onClick={() => setPkgModal({ open: false })} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = {
                  name: (form.elements.namedItem("name") as HTMLInputElement).value,
                  subtitle: (form.elements.namedItem("subtitle") as HTMLInputElement).value,
                  price: (form.elements.namedItem("price") as HTMLInputElement).value,
                  duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
                  img: pkgImg || (form.elements.namedItem("img") as HTMLInputElement).value,
                  featured: (form.elements.namedItem("featured") as HTMLInputElement).checked,
                  features: pkgFeatures,
                };
                if (pkgModal.item) {
                  updatePackage(pkgModal.item.id, data);
                  showToast("Package updated");
                } else {
                  addPackage(data);
                  showToast("Package added");
                }
                setPkgModal({ open: false });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Package Name</label>
                <input name="name" defaultValue={pkgModal.item?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Subtitle</label>
                  <input name="subtitle" defaultValue={pkgModal.item?.subtitle || "3 Days / 2 Nights"} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Price</label>
                  <input name="price" defaultValue={pkgModal.item?.price || "LKR 60,000"} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Duration text</label>
                <input name="duration" defaultValue={pkgModal.item?.duration || "Includes Hotel + Transport"} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>

              {/* Local Device Image Uploader */}
              <ImageUploader value={pkgImg} onChange={setPkgImg} name="img" label="Package Banner Image (Device Upload)" />

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="pkg-featured" name="featured" defaultChecked={pkgModal.item?.featured} className="w-4 h-4 text-blue-600 rounded" />
                <label htmlFor="pkg-featured" className="text-sm font-bold text-slate-900 cursor-pointer">Mark as Featured</label>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Features List</label>
                <div className="space-y-2 mb-3">
                  {pkgFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={feat}
                        onChange={(e) => {
                          const updated = [...pkgFeatures];
                          updated[idx] = e.target.value;
                          setPkgFeatures(updated);
                        }}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setPkgFeatures(pkgFeatures.filter((_, i) => i !== idx))}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPkgFeatures([...pkgFeatures, "New Feature"])}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Feature Item
                </button>
              </div>

              <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/30 mt-2">
                Save Package
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {galModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 text-2xl">Add Photo</h3>
              <button onClick={() => setGalModal({ open: false })} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                addGalleryItem({
                  src: galImg || (form.elements.namedItem("src") as HTMLInputElement).value,
                  alt: (form.elements.namedItem("alt") as HTMLInputElement).value,
                  tag: (form.elements.namedItem("tag") as HTMLSelectElement).value,
                  span: "col-span-1 row-span-1",
                });
                showToast("Photo added");
                setGalModal({ open: false });
              }}
              className="space-y-4"
            >
              {/* Local Device Image Uploader */}
              <ImageUploader value={galImg} onChange={setGalImg} name="src" label="Select Photo from Device" />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Title / Caption</label>
                <input name="alt" placeholder="Casuarina Beach Sunset" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tag</label>
                <select name="tag" defaultValue="Beach" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold">
                  <option value="Beach">Beach</option>
                  <option value="Heritage">Heritage</option>
                  <option value="History">History</option>
                  <option value="Nature">Nature</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/30">
                Upload Photo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── FLOATING MOBILE BOTTOM NAVIGATION DOCK (DARK GLASS STYLE) ── */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`relative flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bookings" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[0.65rem]">Bookings</span>
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[0.6rem] font-black bg-rose-500 text-white rounded-full animate-bounce">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("destinations")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "destinations" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[0.65rem]">Spots</span>
        </button>

        <button
          onClick={() => setActiveTab("experiences")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "experiences" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[0.65rem]">Experiences</span>
        </button>

        <button
          onClick={() => setActiveTab("packages")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "packages" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <PackageIcon className="w-5 h-5" />
          <span className="text-[0.65rem]">Tours</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "gallery" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
          <span className="text-[0.65rem]">Photos</span>
        </button>

        <button
          onClick={() => setActiveTab("contact")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "contact" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[0.65rem]">Agency</span>
        </button>
      </div>
    </div>
  );
}
