"use client";

import { useState, useEffect } from "react";
import { Menu, X, Car, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    router.push("/pricing");
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm"
          : "bg-white/50 backdrop-blur-xl border-b border-white/30 shadow-sm"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 md:h-[4.25rem]">
          {/* Logo - Left */}
          <div className="flex items-center gap-2.5 z-20 mr-2 min-w-0">
            <Image
              src="/logocropped.png"
              alt="Ark Trackers Logo"
              width={48}
              height={48}
              className="object-contain shrink-0 md:w-[52px] md:h-[52px]"
            />
            <Link
              href="/"
              className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 leading-none truncate"
            >
              Ark Trackers
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Pricing", href: "/pricing" },
              { name: "FAQ", href: "/faq" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 z-20">
            <a
              href="https://wa.me/923007609299?text=Hi%2C%20I'm%20interested%20in%20vehicle%20tracking.%20Can%20you%20share%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-600 rounded-full shadow-md shadow-sky-500/25 hover:shadow-lg hover:from-sky-600 hover:to-cyan-700 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              WhatsApp
            </a>
            <Link
              href="/pricing"
              className="hidden md:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-sky-700 bg-sky-50/90 hover:bg-sky-100 rounded-full border border-sky-200/60 transition-colors"
            >
              <span>Plans</span>
              <Car className="w-4 h-4 shrink-0" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Pricing", href: "/pricing" },
              { name: "FAQ", href: "/faq" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/923007609299?text=Hi%2C%20I'm%20interested%20in%20vehicle%20tracking.%20Can%20you%20share%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 px-6 py-3 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white rounded-full text-sm font-semibold shadow-md shadow-sky-500/25"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <button
              className="w-full mt-2 px-6 py-2.5 border border-slate-200 text-slate-800 rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors"
              onClick={handleGetStarted}
            >
              View pricing
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
