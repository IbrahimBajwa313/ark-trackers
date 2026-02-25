"use client";

import { useState, useRef } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "How does the real-time tracking work?",
      answer:
        "Our GPS technology provides real-time location updates every second with accuracy up to 5 meters. Data is transmitted securely through encrypted connections and displayed on your dashboard instantly.",
    },
    {
      question: "Is my vehicle data private and secure?",
      answer:
        "Yes, we use military-grade AES-256 encryption for all data transmission and storage. Your vehicle location is only accessible by you and authorized users. We comply with GDPR and SOC 2 standards.",
    },
    {
      question: "What happens if my GPS signal is lost?",
      answer:
        "If GPS signal is temporarily lost, we use alternative location methods including cellular triangulation and Wi-Fi positioning. Last known location is displayed, and you'll be alerted when signal returns.",
    },
    {
      question: "Can I set up multiple vehicles?",
      answer:
        "Yes, you can track unlimited vehicles on a single account. Our plans are per-vehicle, so you only pay for what you track.",
    },
    {
      question: "What's your customer support like?",
      answer:
        "We offer 24/7 customer support via chat, email, and phone. Average response time is under 2 minutes for live chat.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.",
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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        faqRef.current?.children ? Array.from(faqRef.current.children) : [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: container }
  );

  return (
    <section id="faq" ref={container} className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      
      {/* Top Gradient -> Blends with Testimonials */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-10" />

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-sky-50/50 rounded-full blur-[100px] pointer-events-none -z-0" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-sky-600 uppercase bg-sky-50 rounded-full border border-sky-100">
             <HelpCircle className="w-4 h-4" />
             Support & Answers
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl font-medium text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about Ark Trackers and our fleet management solutions.
          </p>
        </div>

        <div ref={faqRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                ? "bg-white border-blue-200 shadow-xl shadow-blue-500/10" 
                : "bg-white/60 border-slate-200 hover:border-blue-200 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 md:px-8 md:py-6 flex items-center justify-between gap-4 md:gap-6 text-left"
              >
                <h3 className={`font-bold text-base md:text-xl transition-colors ${
                    openIndex === index ? "text-blue-600" : "text-slate-800"
                }`}>
                  {faq.question}
                </h3>
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    openIndex === index 
                    ? "bg-blue-500 border-blue-600 text-white rotate-180" 
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                    <div className="px-5 pb-5 md:px-8 md:pb-8 pt-0 text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                        {faq.answer}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
