"use client";

import React, { useRef } from "react";
import { SatelliteDish, Folder, Eye, ShieldCheck, FileCheck } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LicensesSection() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const licenses = [
    {
      title: "PTA Approved",
      subtitle: "Pakistan Telecommunication Authority",
      id: "DIR (L)/CVAS-1021/PTA/2019",
      icon: SatelliteDish,
      color: "blue",
      gradient: "from-blue-600 to-cyan-500",
      text: "text-blue-500",
      border: "border-blue-500/30",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "SECP Registered",
      subtitle: "Securities & Exchange Commission",
      id: "No. 0124240",
      icon: Folder,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-400",
      text: "text-emerald-500",
      border: "border-emerald-500/30",
      shadow: "shadow-emerald-500/20"
    },
    {
      title: "FBR Compliant",
      subtitle: "Federal Bureau of Revenue",
      id: "Registered Entity",
      icon: FileCheck,
      color: "violet",
      gradient: "from-violet-500 to-purple-500",
      text: "text-violet-500",
      border: "border-violet-500/30",
      shadow: "shadow-violet-500/20"
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" }
      ).fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full py-24 lg:py-32 bg-slate-50 relative overflow-hidden perspective-2000"
    >
        {/* Deep Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[800px] bg-gradient-to-b from-slate-100/50 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-slate-500 uppercase bg-white/50 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
             <ShieldCheck className="w-4 h-4 text-blue-600" />
             Official Certifications
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.1]">
            Fully Licensed & <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-800">
              Government Approved
            </span>
          </h2>
          <p className="text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
             We operate with full legal compliance and are registered with all major regulatory authorities in Pakistan.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-10 w-full max-w-6xl mx-auto">
          {licenses.map((item, index) => (
            <div
              key={index}
              className="group min-h-[260px] md:min-h-[320px] h-auto relative perspective-2000"
            >
                {/* 3D Container - Inner content animates, wrapper stays stable for hover detection */}
                <div className={`
                    relative w-full h-full rounded-[2rem] border-2 ${item.border} 
                    bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-3xl 
                    shadow-2xl ${item.shadow}
                    transition-all duration-500 ease-out transform-gpu will-change-transform
                    group-hover:-translate-y-2 group-hover:rotate-x-3 group-hover:scale-[1.02]
                    flex flex-col items-center justify-center text-center p-6 md:p-8
                    preserve-3d backface-hidden
                `}>
                    
                    {/* Floating Icon - Pops out in Z-space */}
                    <div className="transform translate-z-20 transition-transform duration-500 mb-4 md:mb-6 group-hover:scale-110">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg shadow-black/5`}>
                             <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
                        </div>
                    </div>
                    
                    {/* Content Layer - Pops out */}
                    <div className="transform translate-z-10 transition-transform duration-500 flex flex-col items-center">
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">{item.title}</h3>
                        <p className={`text-sm font-bold uppercase tracking-wider ${item.text} mb-4`}>{item.subtitle}</p>
                        
                        <div className="bg-slate-900/5 px-4 py-2 rounded-lg border border-slate-900/5 transition-colors group-hover:bg-slate-900/10">
                             <p className="text-xs font-mono font-bold text-slate-600">
                                {item.id}
                             </p>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] overflow-hidden">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-45 transform translate-y-full group-hover:animate-shine-fast" />
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .perspective-2000 {
            perspective: 2000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .translate-z-10 {
            transform: translateZ(20px);
        }
        .translate-z-20 {
            transform: translateZ(40px);
        }
         .translate-z-30 {
            transform: translateZ(60px);
        }
        /* Custom rotate utilities for hover effects */
        .group-hover\:rotate-x-6:hover {
            transform: rotateX(6deg) translateY(-16px);
        }
        .group-hover\:rotate-y-3:hover {
            transform: rotateY(3deg);
        }
        
        @keyframes shine-fast {
            0% { transform: translateY(100%) rotate(45deg); }
            100% { transform: translateY(-100%) rotate(45deg); }
        }
        .animate-shine-fast {
            animation: shine-fast 0.8s ease-in-out forwards;
        }
        .will-change-transform {
            will-change: transform;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
