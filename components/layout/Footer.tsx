"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useData } from "@/lib/DataContext";

export default function Footer() {
  const pathname = usePathname();
  const { contact } = useData();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans pt-16 pb-8 border-t border-slate-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                USR <span className="text-cyan-400">TOURS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your premier licensed travel agency specializing in Jaffna tourism from India and worldwide. Experience luxury, culture, and paradise.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Certified Local Tourism Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-cyan-400 transition-colors">Destinations</Link></li>
              <li><Link href="/experiences" className="hover:text-cyan-400 transition-colors">Experiences</Link></li>
              <li><Link href="/packages" className="hover:text-cyan-400 transition-colors">Tour Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/booking" className="hover:text-cyan-400 transition-colors">Book a Trip</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Contact Info</h4>
            <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span>{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span>{contact.email}</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span>{contact.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} USR Tours Jaffna. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
