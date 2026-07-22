"use client";
import Link from "next/link";
import { Waves, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

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
  return (
    <footer className="bg-navy text-white">
      {/* Wave top */}
      <div className="relative overflow-hidden h-20 bg-pearl">
        <svg
          viewBox="0 0 1440 80"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
        >
          <path fill="#03045E" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-DEFAULT to-ocean-500 flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-white text-xl leading-none block uppercase tracking-wider">USR</span>
                <span className="font-display font-bold text-teal-DEFAULT text-xs leading-none tracking-[0.25em] uppercase">Tours</span>
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
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-DEFAULT hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-white" />
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
                <a href="tel:+94212221234" className="flex items-start gap-3 text-white/60 hover:text-teal-DEFAULT transition-colors text-sm group">
                  <Phone className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  +94 21 222 1234
                </a>
              </li>
              <li>
                <a href="mailto:hello@discoverjaffna.lk" className="flex items-start gap-3 text-white/60 hover:text-teal-DEFAULT transition-colors text-sm group">
                  <Mail className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  hello@discoverjaffna.lk
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-teal-DEFAULT shrink-0" />
                  <span>123 Beach Road, Jaffna<br />Northern Province, Sri Lanka</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} USR Tours. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
