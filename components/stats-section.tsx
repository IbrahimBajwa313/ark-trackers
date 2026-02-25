"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Users, Globe, Star } from "lucide-react"; // Import some icons

// Register ScrollTrigger to ensure animations work correctly
gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  const container = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const stats = [
    {
      target: 5000,
      suffix: "+",
      label: "Active Vehicles",
      description: "Tracked Daily in Pakistan",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      target: 98,
      suffix: "%",
      label: "Uptime",
      description: "Service reliability",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
    },
    {
      target: 10,
      suffix: "+",
      label: "Cities",
      description: "Nationwide coverage",
      icon: Globe,
      color: "from-violet-500 to-purple-500",
    },
    {
      target: 4.9,
      suffix: "/5",
      label: "User Rating",
      description: "Customer satisfaction",
      icon: Star,
      color: "from-amber-400 to-orange-500",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse", // Reverse when scrolling back up
        },
      });

      // 1. Title Fade In
      tl.fromTo(titleRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // 2. Cards Stagger
      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      
      tl.fromTo(cards, 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // 3. Counting Animation
      cards.forEach((card, index) => {
        const stat = stats[index];
        const numElement = card.querySelector(".stat-number");
        
        if (numElement) {
            const counter = { val: 0 };
            gsap.to(counter, {
                val: stat.target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                onUpdate: () => {
                   const isDecimal = stat.target % 1 !== 0;
                   numElement.textContent = isDecimal 
                     ? counter.val.toFixed(1) 
                     : Math.floor(counter.val).toString();
                }
            });
        }
      });
      
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative py-20 lg:py-32 overflow-hidden flex flex-col items-center"
      id="stats"
    >
        {/* Ambient Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent pointer-events-none" />
        
        {/* Top Fade - blends with About Section */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Bottom Fade - blends with Pricing Section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/80 to-transparent z-10 pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 ref={titleRef} className="text-2xl md:text-5xl font-bold text-slate-900 leading-tight opacity-0 px-4">
             Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Hundreds of Thousands</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/60 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center opacity-0"
            >
              {/* Icon Bubble */}
              <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-3 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                 <stat.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>

              {/* Number with Gradient */}
              <div className="flex items-baseline gap-0.5 md:gap-1 mb-1 md:mb-2">
                 <span className={`stat-number text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} tabular-nums`}>
                    0
                 </span>
                 <span className={`text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.suffix}
                 </span>
              </div>

              <h3 className="font-bold text-slate-800 text-sm md:text-lg mb-0.5 md:mb-1">{stat.label}</h3>
              <p className="text-slate-500 font-medium text-xs md:text-base">{stat.description}</p>
              
              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-shine" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
          @keyframes shine {
              from { transform: translateX(-100%); }
              to { transform: translateX(100%); }
          }
          .group:hover .group-hover\\:animate-shine {
              animation: shine 1s;
          }
      `}</style>
    </section>
  );
}
