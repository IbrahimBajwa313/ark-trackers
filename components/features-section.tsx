"use client";
import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function FeaturesSection() {
  const [featuresSectionVisible, setFeaturesSectionVisible] = useState(false);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const features = [
    "25/7 customer support",
    "Works with all vehicle types",
    "Unlimited trip history",
    "Multi-device access",
    "Dark mode dashboard",
    "API access for integrations",
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesSectionVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={featuresSectionRef}
      className="py-8 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div
            className={
              featuresSectionVisible ? "animate-fade-in-left" : "opacity-0"
            }
          >
            <p className="text-accent text-sm font-semibold mb-2">
              Additional Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Everything You Need in One Platform
            </h2>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`relative ${
              featuresSectionVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
          >
            <div className="aspect-square bg-background rounded-2xl border border-border overflow-hidden flex items-center justify-center">
              <img
                src="/everything-you-need.png"
                alt="TrackRide features"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
