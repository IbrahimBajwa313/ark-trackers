"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import { Zap, Lightbulb, Activity, Map as MapIcon } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time Tracking", desc: "Live GPS updates with sub-second latency for instant visibility.", color: "from-amber-500 to-orange-500" },
  { icon: Lightbulb, title: "Smart Insights", desc: "AI analytics to optimize routes and reduce fuel consumption.", color: "from-violet-500 to-purple-500" },
  { icon: Activity, title: "99.9% Uptime", desc: "Redundant infrastructure guarantees you never go offline.", color: "from-emerald-500 to-green-500" },
  { icon: MapIcon, title: "Geo-Fencing", desc: "Instant alerts when vehicles enter or exit designated zones.", color: "from-pink-500 to-rose-500" },
];

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "0px 0px -80px 0px" });
  const sectionClass = inView ? "section-in-view" : "";

  return (
    <section
      ref={ref}
      className={`relative min-h-screen section-padding bg-slate-50 overflow-hidden flex items-center ${sectionClass}`}
      id="about"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)" }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-about" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-about)" />
        </svg>
      </div>

      {/* Background Gradient/Blobs */}
      <div className="absolute -top-32 left-2/3 mr-32 -translate-x-1/2 w-[100%] h-[500px] bg-gradient-to-b from-sky-100 via-sky-50/50 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[0%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] right-[0%] w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center">
          
          {/* LEFT: Image/Graphic Section */}
          {/* FIX: Changed lg:justify-end to lg:justify-center to prevent the image from sticking to the far right */}
          <div className="relative flex justify-center lg:justify-center perspective-1000 group section-item-reveal stagger-1">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-transform duration-100 ease-out transform-style-3d will-change-transform">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 opacity-20 blur-2xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center bg-blue-50/30">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="relative w-24 h-44 sm:w-28 sm:h-50 md:w-32 md:h-56 bg-white rounded-[2rem] border-4 border-slate-200 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-1 bg-blue-50 rounded-[1.5rem] overflow-hidden">
                      <MapIcon className="w-full h-full text-blue-200 opacity-50 scale-150" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Text/Features Section */}
          <div className="flex flex-col gap-8 px-4 lg:px-8 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col gap-4 items-center md:items-start section-title-reveal">
              <Badge className="w-fit bg-sky-500 text-white hover:bg-sky-600 border-0 px-6 py-2 mb-2 mt-5 md:mb-5 text-sm md:text-base font-bold shadow-lg shadow-sky-600/30">
                Why Choose Ark Trackers?
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight tracking-tight text-balance">
                Built for Trust & Reliability
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                With over 5,000 vehicles tracked across Pakistan, we combine cutting-edge GPS technology with military-grade security to keep your assets safe 24/7.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 w-full">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white/60 backdrop-blur-md border border-white/60 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center md:items-start text-center md:text-left section-item-reveal ${["stagger-2", "stagger-3", "stagger-4", "stagger-5"][idx] ?? "stagger-2"}`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}