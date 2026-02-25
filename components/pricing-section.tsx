"use client";

import { Check, Mic, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const standardFeatures = [
  "Hidden Mic (Voice Listening)",
  "Pin point location",
  "Area fixing",
  "Speed alert",
  "Time & date on location",
  "Ignition on/off alert",
  "Battery temper alert",
  "Battery back up",
  "Anti jammer",
  "Location alert (24 hr)",
  "Transferable",
  "Driving report",
  "Parking report",
  "Fuel consumptions",
  "Over speed report",
  "Route duration",
  "Excess parking",
  "Trip reporter",
  "Round the clock vehicle monitoring",
  "Multiple user login",
  "Milage report",
  "Geo fencing report",
  "Call center support 24/7",
  "Recovery alerts",
  "Live location",
];

const premiumFeatures = [...standardFeatures];

export function PricingSection() {
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Blobs Animation
      gsap.to(blob1Ref.current, {
        x: 40,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: -40,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Scroll Trigger Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Title Fade In
      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }
      );

      // Cards Stagger
      tl.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
      id="pricing"
      className="relative w-full py-8 lg:py-16 bg-slate-50/80 overflow-hidden"
      ref={container}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern-pricing"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-200"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-pricing)" />
        </svg>
      </div>

      {/* Animated Blobs - Stronger opacity for contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-700 uppercase bg-blue-50 rounded-full border border-blue-200 shadow-sm">
            Flexible Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
            Plans built for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
               fleets of all sizes
            </span>
          </h2>
          <p className="text-xl font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Choose the plan that best fits your fleet management needs. 
            Detailed tracking, AI insights, and 24/7 support standard on all plans.
          </p>
        </div>

        {/* Pricing Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-stretch">
          
          {/* Standard Plan */}
          <div className="flex flex-col h-full rounded-[2rem] border border-slate-200 bg-white p-5 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 opacity-0 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            
            <div className="mb-8">
               <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-slate-100 rounded-full border border-slate-200">
                  Starter Choice
               </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 md:mb-3">Standard Plan</h3>
              <p className="text-slate-500 font-semibold text-base md:text-lg">Comprehensive tracking for growing fleets</p>
            </div>

            {/* Features */}
            <div className="flex-1 mb-8 md:mb-10">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6 text-slate-400 border-b border-slate-100 pb-2">Included Features</h4>
              <ul className="space-y-3 md:space-y-4">
                {standardFeatures.map((feature, index) => {
                  const exclusive = feature === "Hidden Mic (Voice Listening)";
                  return (
                    <li key={index} className="flex items-start gap-4">
                         {exclusive ? (
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                             <X className="w-3.5 h-3.5 text-slate-400" />
                           </div>
                         ) : (
                           <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                             <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3px]" />
                           </div>
                         )}
                      <span className={`text-[15px] font-semibold ${exclusive ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'}`}>
                          {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              className="w-full h-14 rounded-xl text-lg font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border-2 border-blue-200 shadow-sm transition-all hover:scale-[1.02]"
              onClick={() =>
                window.open(
                  "https://wa.me/923007609299?text=Hi%2C%20I'm%20interested%20in%20your%20Standard%20Plan.%20Can%20you%20provide%20me%20with%20more%20details%3F",
                  "_blank"
                )
              }
            >
              Request Standard Quote
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="flex flex-col h-full rounded-[2rem] border-2 border-blue-500 bg-white p-5 md:p-8 lg:p-10 shadow-2xl shadow-blue-500/20 relative hover:-translate-y-2 transition-transform duration-300 opacity-0 group overflow-hidden">
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent pointer-events-none" />

            {/* Badge - Shiny and Bolder */}
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-b-2xl text-sm font-extrabold tracking-wide shadow-lg shadow-blue-500/40 flex items-center gap-2 z-20">
               <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300 animate-pulse" /> 
                POPULAR
               {/* Shine animation on badge */}
               <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-2xl pointer-events-none">
                  <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-white/30 skew-x-[-20deg] animate-[shine_3s_infinite]" />
               </div>
            </div>

            <div className="mb-8 mt-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 md:mb-3">Premium Plan</h3>
              <p className="text-blue-600 font-bold text-base md:text-lg">Enterprise-grade tracking with voice monitoring</p>
            </div>

            {/* Features */}
            <div className="flex-1 mb-8 md:mb-10 relative z-10">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6 text-blue-900/40 border-b border-blue-100 pb-2">All Standard Features Plus</h4>
              <ul className="space-y-3 md:space-y-4">
                {premiumFeatures.map((feature, index) => {
                  const exclusive = feature === "Hidden Mic (Voice Listening)";
                  return (
                    <li key={index} className={`flex items-start gap-4 ${exclusive ? "bg-blue-50 p-3 -mx-3 rounded-xl border border-blue-100 shadow-sm" : ""}`}>
                       {exclusive ? (
                           <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-500/30">
                             <Mic className="w-3.5 h-3.5 text-white" />
                           </div>
                         ) : (
                           <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                             <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3px]" />
                           </div>
                         )}
                      <span className={`text-[15px] ${exclusive ? 'text-blue-800 font-extrabold' : 'text-slate-700 font-semibold'}`}>
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              className="w-full h-14 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] transition-all border-0 relative z-10"
              onClick={() =>
                window.open(
                  "https://wa.me/923007609299?text=Hi%2C%20I'm%20interested%20in%20your%20Premium%20Plan.%20Can%20you%20provide%20me%20with%20more%20details%3F",
                  "_blank"
                )
              }
            >
              Get Premium Access
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-20 px-4">
          <div className="text-slate-600 text-sm md:text-base font-semibold bg-white px-5 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-full shadow-lg shadow-slate-200/50 inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 border border-slate-100 max-w-full mx-auto">
             <div className="shrink-0 w-2 h-2 rounded-full bg-green-500 animate-pulse hidden md:block" />
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse md:hidden mb-1" />
             <span className="text-center md:text-left leading-snug">
                Both plans include <span className="text-slate-900 font-extrabold">24/7 call center support</span> and dedicated account management
             </span>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes shine {
          0% { left: -100%; opacity: 0; }
          40% { left: -100%; opacity: 0; }
          50% { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
