"use client";

import {
  MapPin,
  AlertTriangle,
  MapPinned,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay the image animation by 200ms
          setTimeout(() => setImageVisible(true), 200);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description:
        "Live GPS location updates with accuracy up to 5 meters, refreshing every second.",
    },
    {
      icon: AlertTriangle,
      title: "Theft Alerts",
      description:
        "Instant notifications if your vehicle moves without authorization.",
    },
    {
      icon: MapPinned,
      title: "Geo-Fencing",
      description:
        "Set virtual boundaries and receive alerts when your vehicle enters or exits.",
    },
    {
      icon: Clock,
      title: "Trip History",
      description:
        "Complete historical data of all journeys with detailed route maps.",
    },
    {
      icon: AlertCircle,
      title: "Emergency SOS",
      description: "One-tap emergency alerts to police and emergency contacts.",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description:
        "Detailed insights into driving patterns, fuel efficiency, and maintenance.",
    },
  ];

  return (
    <section id="services" className="py-8 md:py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-4 sm:mb-4 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <p className="text-accent text-sm font-semibold mb-2">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Comprehensive Vehicle Protection
          </h2>
        </div>
        <Image
          src="/car1_1.png"
          alt="Car Image"
          width={600}
          height={400}
          className={`mx-auto -mb-10 z-90 relative ${
            imageVisible ? "animate-fade-in" : "opacity-0"
          }`}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`p-6 bg-muted/50 border border-border rounded-xl hover:border-accent hover:bg-muted transition-all duration-300 group ${
                  isVisible
                    ? `fade-in-stagger-${Math.min(index + 1, 5)}`
                    : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
