"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Globe,
  Map,
  Clock,
  History,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// 3D hero with full car animation (drift-in, labels, connector lines)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center min-h-[280px] rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/80 border border-sky-100/80 shadow-inner">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-sky-600">Loading experience...</span>
      </div>
    </div>
  ),
});

interface SlideData {
  id: string;
  badge: string;
  logo: string;
  titlePrefix: string;
  titleHighlight: string;
  subline: string;
  mainImage: string;
  mainImageWidth: number;
  mainImageHeight: number;
}

const slide: SlideData = {
  id: "car",
  badge: "Advanced Fleet Management",
  logo: "/logocropped.png",
  titlePrefix: "Car",
  titleHighlight: "Tracking",
  subline: "Real-time GPS, theft alerts, and trip history. Peace of mind for every journey.",
  mainImage: "/right_section_car.png",
  mainImageWidth: 1000,
  mainImageHeight: 1000,
};

const features = [
  { icon: History, label: "Historical Way Point Record", color: "from-blue-500 to-cyan-500" },
  { icon: Clock, label: "24/7 Real Time Tracking", color: "from-emerald-500 to-green-500" },
  { icon: Map, label: "Geo Fence Alarm", color: "from-rose-500 to-red-500" },
  { icon: Globe, label: "Online Tracking", color: "from-violet-500 to-purple-500" },
  { icon: Smartphone, label: "Track via Mobile App", color: "from-amber-500 to-orange-500" },
];

const WHATSAPP_URL = "https://wa.me/923007609299?text=Hi%2C%20I'm%20interested%20in%20vehicle%20tracking.%20Can%20you%20share%20details%3F";

function HeroContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const reveal = mounted ? "hero-reveal" : "opacity-0";

  return (
    // CHANGED: 'sm:px-4' is now 'px-4 sm:px-0' to add side padding on mobile only
    <div className="site-container relative z-10 w-full h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-8 xl:gap-12 pt-4 pb-4 px-4 sm:px-0 lg:py-0">
      
      {/* Left: Copy + features + CTA */}
      <div className="w-full lg:w-[45%] flex flex-col sm:ml-4 lg:ml-16 gap-6 md:gap-8 items-start z-20 lg:justify-center">
        
        {/* Desktop: badge + headline block */}
        <div className={`hidden lg:flex flex-col gap-4  transition-all duration-500 ${reveal}`} style={{ transitionDelay: "0.05s" }}>
          <Badge className="w-fit  bg-sky-500 hover:bg-sky-600 text-white border-0 px-4 py-1.5 text-xs font-bold shadow-lg shadow-sky-500/30">
            {slide.badge}
          </Badge>
          <div className="flex items-center gap-4">
            <Image
              src={slide.logo}
              alt="Ark Trackers"
              width={72}
              height={72}
              className="object-contain shrink-0 rounded-xl shadow-lg"
            />
            <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              {slide.titlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
                {slide.titleHighlight}
              </span>
            </h1>
          </div>
          <p className="text-lg xl:text-xl text-slate-600 leading-relaxed max-w-lg">
            {slide.subline}
          </p>
        </div>

        {/* Feature pills - compact grid on desktop */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 md:p-3.5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-200 hover:bg-white transition-all duration-300 group ${reveal}`}
              style={{ transitionDelay: `${0.1 + i * 0.04}s` }}
            >
              <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700 text-sm md:text-base">
                {feat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA + trust line */}
        <div className={`flex flex-col gap-4 w-full sm:w-auto ${reveal}`} style={{ transitionDelay: "0.35s" }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-base font-bold rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                Get Started on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-slate-200 hover:border-sky-200 hover:bg-sky-50/50"
            >
              <Link href="#pricing">View Plans</Link>
            </Button>
          </div>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            Trusted by 5000+ vehicles across Pakistan
          </p>
        </div>
      </div>

      {/* Right: 3D hero */}
      <div className="w-full h-[50vh] min-h-[280px] sm:h-[58vh] md:h-[68vh] lg:w-[50%] lg:h-[80vh]  flex items-center justify-center">
        <div className={`relative w-full h-full max-w-2xl xl:max-w-3xl   rounded-xl md:rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 ${reveal}`} style={{ transitionDelay: "0.1s" }}>
          <HeroScene />
        </div>
      </div>

      {/* Mobile-only: headline block at top (flex-col-reverse puts this above content on mobile) */}
      <div className={`w-full flex flex-col items-start lg:hidden z-30 ${reveal}`} style={{ transitionDelay: "0.02s" }}>
        <Badge className="mb-2 bg-sky-500 hover:bg-sky-600 text-white border-0 px-4 py-1.5 text-xs font-bold shadow-lg shadow-sky-500/30">
          {slide.badge}
        </Badge>
        <div className="flex items-center gap-3 mb-2">
          <Image src={slide.logo} alt="Ark Trackers" width={56} height={56} className="object-contain shrink-0 rounded-lg" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {slide.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
              {slide.titleHighlight}
            </span>
          </h1>
        </div>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-2">
          {slide.subline}
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center relative pt-20 lg:pt-0 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-slate-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/80 via-sky-50/30 to-transparent pointer-events-none z-0" />

      {/* Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-3xl hero-blob hero-blob-1" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-300/25 rounded-full blur-3xl hero-blob hero-blob-2" />
        <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-cyan-200/30 rounded-full blur-3xl hero-blob hero-blob-3" />
      </div>

      <HeroContent />
    </section>
  );
}