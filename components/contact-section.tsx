"use client";

import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phoneNumber } from "@/lib/contact-info";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sendIconRef = useRef<HTMLSpanElement>(null);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Animate Icon Out (Fly to Top-Right Corner)
    gsap.to(sendIconRef.current, {
        x: 200,
        y: -100,
        opacity: 0,
        scale: 0.5,
        rotate: 45,
        duration: 0.5,
        ease: "power2.in"
    });

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => {
          setSubmitted(false);
          // Animate Icon In (From Left)
          gsap.fromTo(sendIconRef.current, 
            { x: -50, y: 50, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
      }, 3000);
    }, 1500);
  };

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
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="contact"
      className="relative py-8 lg:py-16 bg-slate-50 overflow-hidden"
    >
      {/* Background Decor - Consistent with Hero/About */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm">
             <Mail className="w-4 h-4" />
             Get in Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.1]">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400">Optimize</span> <br className="hidden md:block" />
            Your Fleet?
          </h2>
          <p className="text-lg md:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
             From single vehicles to enterprise fleets, our team is ready to engineer the perfect tracking solution for your needs.
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="space-y-6">
            {/* Info Cards - Glassmorphism */}
            <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Call Us Card */}
                <div className="relative group transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                    <a href={`tel:+92${phoneNumber.slice(1)}`} className="relative block h-full p-6 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/50 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />
                        
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Call Us Now</h3>
                        <p className="text-slate-500 font-medium text-sm mb-3">24/7 Expert Support</p>
                        <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                            +92 {phoneNumber.slice(1, 4)}... <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </a>
                </div>

                {/* Email Us Card */}
                <div className="relative group transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                    <a href="mailto:contact@arktrackers.com" className="relative block h-full p-5 md:p-6 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/50 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

                         <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Email Us</h3>
                        <p className="text-slate-500 font-medium text-sm mb-3">Fast Response Time</p>
                        <div className="flex items-center text-cyan-600 font-bold group-hover:gap-2 transition-all">
                            Send Email <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </a>
                </div>
            </div>

            {/* Interactive Map - Enhanced Container */}
            <div className="hidden md:block w-full h-[400px] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-[6px] border-white relative group transform transition-transform hover:scale-[1.01] duration-500">
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none ring-1 ring-black/5 rounded-[2rem]" />
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3404.862113810456!2d73.10220717560752!3d31.417924874261058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI1JzA0LjUiTiA3M8KwMDYnMTcuMiJF!5e0!3m2!1sen!2s!4v1771635827103!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3404.862113810456!2d73.10220717560752!3d31.417924874261058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI1JzA0LjUiTiA3M8KwMDYnMTcuMiJF!5e0!3m2!1sen!2s!4v1771635827103!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-700 w-full h-full"
                ></iframe>
                
                {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute inset-0 opacity-75" />
                        <div className="w-3 h-3 rounded-full bg-green-500 relative" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Headquarters</p>
                        <p className="text-base font-bold text-slate-900 leading-none">Faislabad, PK</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Form - Premium Look */}
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2.5rem] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-60 group-focus-within:opacity-60" />
              <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-5 md:p-8 lg:p-12 border border-white/60 shadow-2xl shadow-slate-200/50 relative overflow-hidden h-full">
                
                {/* Subtle Grid Pattern Overlay inside form */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Send us a Message</h3>
                    <p className="text-slate-500 font-medium mb-8">We usually respond within 2 hours during business days.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                        <div className="group/input">
                             <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1 mb-2 block uppercase tracking-wide">Your Name</label>
                            <input
                            type="text"
                            id="name"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full px-5 py-3 md:px-6 md:py-4 bg-white/50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium hover:bg-white text-sm md:text-base"
                            required
                            />
                        </div>
                        <div className="group/input">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1 mb-2 block uppercase tracking-wide">Email Address</label>
                            <input
                            type="email"
                            id="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full px-5 py-3 md:px-6 md:py-4 bg-white/50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium hover:bg-white text-sm md:text-base"
                            required
                            />
                        </div>
                    </div>

                    <div className="group/input">
                        <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1 mb-2 block uppercase tracking-wide">Your Message</label>
                        <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about your fleet requirements..."
                        rows={4}
                        className="w-full px-5 py-3 md:px-6 md:py-4 bg-white/50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium resize-none hover:bg-white text-sm md:text-base"
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || submitted}
                        className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl transition-all duration-500 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 overflow-hidden relative group/btn ${
                            submitted 
                            ? "bg-slate-900 text-white shadow-slate-900/20 border border-slate-800"
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/30 hover:shadow-blue-600/40"
                        }`}
                    >
                        {loading ? (
                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : submitted ? (
                            <>Message Sent</>
                        ) : (
                            <>
                                <span ref={sendIconRef} className="send-icon-wrapper transform transition-transform duration-300 group-hover/btn:translate-x-1 relative z-10 flex items-center justify-center">
                                    <Send className="w-5 h-5" />
                                </span>
                                <span className="relative z-10">Send Message</span>
                            </>
                        )}
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 font-medium pt-2">
                        Trusted by 500+ businesses across Pakistan.
                    </p>
                    </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
