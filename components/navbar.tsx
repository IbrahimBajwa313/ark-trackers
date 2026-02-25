"use client";

import { useState, useEffect } from "react";
import { Menu, X, Car } from "lucide-react";
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md"
          : "bg-white/40 backdrop-blur-md border-b border-white/20 shadow-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center gap-2 z-20">
            <Image
              src="/logocropped.png"
              alt="Ark Trackers Logo"
              width={56}
              height={56}
              className="object-contain"
            />
            <Link
              href="/"
              className="font-bold text-xl tracking-wide text-slate-900 hidden sm:block"
            >
              Ark Trackers
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
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
                className="px-4 py-1.5 rounded-full text-[14px] font-medium tracking-wide text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 z-20">
            {/* Pricing Link */}
            <Link
              href="/pricing"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-blue-600 hover:bg-blue-50/80 rounded-full transition-colors"
            >
              <span>Track Vehicle</span>
              <Car className="w-5 h-5" />
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
            <button
              className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/40 transition-all"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
