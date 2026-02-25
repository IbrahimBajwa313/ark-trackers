"use client";

import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Ibrahim Bajwa",
      title: "Fleet Manager, Logistics Co.",
      quote:
        "Ark Trackers PVT has reduced our vehicle losses by 95%. The real-time tracking is invaluable for managing our delivery fleet.",
      rating: 5,
      avatar: "/professional-woman-avatar.jpg",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "Muhammad Imran",
      title: "Rideshare Driver",
      quote:
        "The peace of mind knowing my vehicle is protected 24/7 is priceless. Best investment I've made for my business.",
      rating: 5,
      avatar: "/professional-man-avatar.jpg",
      gradient: "from-indigo-500 to-purple-400"
    },
    {
      name: "Rashid Yaseen",
      title: "Nustian",
      quote:
        "I recommend Ark Trackers PVT to all my Friends. It has helped us to keep our cars safe and sound.",
      rating: 5,
      avatar: "",
      gradient: "from-emerald-500 to-teal-400"
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.4"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      
      {/* Top Gradient -> Blends with Pricing */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-10" />

      {/* Bottom Gradient -> Blends with FAQ */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
             <Star className="w-4 h-4 fill-blue-600" />
             Client Success
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Business Leaders</span>
          </h2>
           <p className="text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
             Join thousands of satisfied usage who rely on Ark Trackers for their fleet security and management.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative h-full"
            >
              <div className="h-full p-6 md:p-8 rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                
                {/* Decorative Quote Icon used as background trait */}
                <Quote className="absolute top-6 right-6 w-16 h-16 md:w-24 md:h-24 text-slate-50 opacity-[0.05] rotate-180" />

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-700 text-base md:text-lg font-medium leading-relaxed mb-6 md:mb-8 flex-1 relative z-10">
                    "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 relative z-10">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} p-0.5 shadow-md`}>
                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for avatar if image fails or is missing, using initials */}
                            <span className="font-bold text-slate-400 text-sm">
                                {testimonial.name.charAt(0)}
                            </span>
                             {/* <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                            /> */}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base">
                            {testimonial.name}
                        </h4>
                        <p className="text-sm font-semibold text-slate-500">
                            {testimonial.title}
                        </p>
                    </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
