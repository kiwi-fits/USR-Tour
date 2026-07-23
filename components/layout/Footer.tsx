"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Lock } from "lucide-react";
import { useData } from "@/lib/DataContext";

const footerLinks = {
  explore: [
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/packages", label: "Tour Packages" },
    { href: "/gallery", label: "Gallery" },
  ],
  company: [
    { href: "/contact", label: "Contact Us" },
    { href: "/booking", label: "Book a Tour" },
    { href: "#about", label: "About Jaffna" },
    { href: "#faq", label: "FAQ" },
  ],
};

export default function Footer() {
  const { contact } = useData();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHomePage = pathname === "/";

  return (
    <footer className="text-white">
      {/* Wave top */}
      <div className={`relative overflow-hidden h-20 ${isHomePage ? "bg-transparent" : "bg-pearl"}`}>
        <svg
          viewBox="0 0 1440 80"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
        >
          <path fill="#03045E" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="bg-navy">
        <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5 group">
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold gradient-india text-3xl leading-none uppercase tracking-wider">
                  USR
                </span>
                <div className="flex justify-between w-full font-display font-medium text-teal-DEFAULT text-[0.8rem] leading-none uppercase mt-1">
                  <span>T</span><span>O</span><span>U</span><span>R</span><span>S</span>
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              <strong>Travel with us. Create memories.</strong>
            </p>
            <p className="text-white/40 text-xs leading-relaxed mb-6">
              Your premium gateway to the pearl of the north. Experience pristine beaches, rich heritage, and warm Sri Lankan hospitality.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="ios-icon-box bg-white/10 border-white/20 text-white hover:bg-teal-DEFAULT hover:text-white transition-all duration-300 !w-10 !h-10"
                >
                  <Icon className="w-4 h-4 stroke-[2]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-5">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-teal-DEFAULT transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-teal-DEFAULT transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-5">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${contact.phone}`} className="flex items-start gap-3 text-white/60 hover:text-teal-DEFAULT transition-colors text-sm group">
                  <Phone className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 text-white/60 hover:text-teal-DEFAULT transition-colors text-sm group">
                  <Mail className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  <span>{contact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} USR Tours. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">Terms of Service</a>
            <Link href="/admin" className="text-teal-light/70 hover:text-teal-light text-sm font-semibold flex items-center gap-1 transition-colors">
              <Lock className="w-3.5 h-3.5" /> Admin Panel
            </Link>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
