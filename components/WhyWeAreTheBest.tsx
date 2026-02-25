"use client";
<<<<<<< HEAD

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Clock, TrendingUp, Users } from "lucide-react";

// Register usage
gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Background Blobs Animation
      gsap.to(blob1Ref.current, {
        x: 30,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: -30,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Section Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%", // Trigger a bit earlier
          toggleActions: "play none none reverse",
        },
      });

      // Stagger content children for smoother feel
      tl.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Image Reveal to run concurrently with content
      tl.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.6" // Slight overlap
      );

    },
    { scope: container }
  );

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      description: "AES-256 encryption ensures your data is only accessible to you.",
    },
    {
      icon: MapPin,
      title: "Pinpoint Precision",
      description: "Utilizing multi-constellation GPS for sub-meter accuracy.",
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "View fleet movements with less than 1-second latency.",
    },
  ];

  return (
    <section ref={container} className="py-24 relative overflow-hidden bg-slate-50/50">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern-why"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-200"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-why)" />
        </svg>
      </div>

       {/* Animated Blobs */}
       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div
           ref={blob1Ref}
           className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] opacity-60 mix-blend-multiply"
         />
         <div
           ref={blob2Ref}
           className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/60 rounded-full blur-[100px] opacity-60 mix-blend-multiply"
         />
       </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <div ref={contentRef} className="flex flex-col justify-center order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-bold tracking-wide mb-6 shadow-sm opacity-0">
                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                 WHY CHOOSE US
             </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6 opacity-0">
              Engineering the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Fleet Intelligence.</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg opacity-0">
              We don't just track vehicles; we provide the intelligence needed to optimize operations, reduce costs, and ensure safety at scale. 
              Our platform is built for reliability in the most demanding environments.
            </p>

            {/* Feature List */}
            <div className="space-y-8 mb-10 opacity-0">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1 p-2 bg-white border border-blue-100 rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                     <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 opacity-0">
              <a
                href="/services"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md shadow-blue-500/20 group"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
               <a
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-white border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all"
              >
                View Demo
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative order-1 lg:order-2 h-full min-h-[400px] lg:min-h-[600px] flex items-center">
             
             {/* Main Image Container */}
             <div ref={imageRef} className="relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl opacity-0">
                <Image
                  src="/young-uber-driver-car-interior.jpg" 
                  alt="Driver using Ark Trackers App"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glass Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 shadow-2xl">
                   <div className="flex items-center justify-between text-white gap-4">
                      
                      {/* Success Rate */}
                      <div className="flex-1 flex flex-col items-center">
                         <div className="flex items-center gap-1.5 mb-0.5 opacity-80">
                             <TrendingUp className="w-3.5 h-3.5 text-blue-200" />
                             <p className="text-[10px] font-bold uppercase tracking-wider">Success Rate</p>
                         </div>
                         <div className="text-3xl lg:text-3xl font-extrabold text-white drop-shadow-md">99.99<span className="text-blue-200">%</span></div>
                      </div>

                      {/* Active Fleets */}
                      <div className="flex-1 flex flex-col items-center">
                         <div className="flex items-center gap-1.5 mb-0.5 opacity-80">
                             <Users className="w-3.5 h-3.5 text-blue-200" />
                             <p className="text-[10px] font-bold uppercase tracking-wider">Active Fleets</p>
                         </div>
                         <div className="text-3xl lg:text-3xl font-extrabold text-white drop-shadow-md">500<span className="text-blue-200">+</span></div>
                      </div>

                   </div>
                </div>
             </div>
             
             {/* Decorative Background Element */}
             <div className="absolute -z-10 top-12 -right-12 w-full h-full bg-gradient-to-br from-blue-100/50 to-transparent rounded-[3rem] blur-2xl" />
          </div>

=======
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Reasoning() {
  const [reasoningSectionVisible, setReasoningSectionVisible] = useState(false);
  const reasoningSectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReasoningSectionVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (reasoningSectionRef.current) {
      observer.observe(reasoningSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={reasoningSectionRef}
      className="bg-muted/30 text-foreground py-8 md:py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div
          className={
            reasoningSectionVisible ? "animate-fade-in-left" : "opacity-0"
          }
        >
          <h2 className="text-4xl font-bold mb-6">
            How we are the best at GPS trackings
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <span className="text-foreground font-semibold">
              Everyone says they're different. We prove it!
            </span>{" "}
            There are many myths that smartphone-based vehicle tracking cannot
            work, that it's not precise and you should go with installed
            hardware. But hey, we are more than 10 years on the market, have
            thousands of happy customers with fleet sizes from 2 to several
            hundreds of vehicles. During that time we carefully listened to our
            users and created features that overlap standard hardware GPS
            trackers.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            If you are convinced that you need an installed GPS tracker we
            support all major brands too – it's all about the platform, and Al
            Khaliq Tracker Company wins.
          </p>

          <a
            href="/services"
            className="inline-block bg-accent text-accent-foreground px-5 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Learn More
          </a>
        </div>

        <div
          className={`rounded-xl overflow-hidden shadow-md border bg-muted ${
            reasoningSectionVisible ? "animate-fade-in-right" : "opacity-0"
          }`}
        >
          <Image
            src="/young-uber-driver-car-interior.jpg"
            alt="Ark Trackers App"
            width={700}
            height={450}
            className="w-full h-auto object-cover "
          />
>>>>>>> 16f58d1e05a2c181d3735c22969c331da9a8d90b
        </div>
      </div>
    </section>
  );
}
