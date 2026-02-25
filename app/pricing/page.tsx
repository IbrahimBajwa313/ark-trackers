"use client";

import Navbar from "@/components/navbar";
import Footer2 from "@/components/Footer2";
import {
  Check,
  Mic,
  X,
  Star,
  Shield,
  Zap,
  Award,
  Users,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const comparisonFeatures = [
  {
    category: "Core Tracking Features",
    features: [
      { name: "Real-time GPS tracking", standard: true, premium: true },
      { name: "Pin-point location accuracy", standard: true, premium: true },
      { name: "Speed alerts", standard: true, premium: true },
      { name: "Geo-fencing", standard: true, premium: true },
      { name: "Route history", standard: true, premium: true },
      { name: "Trip reports", standard: true, premium: true },
    ],
  },
  {
    category: "Safety & Security",
    features: [
      { name: "Anti-jammer protection", standard: true, premium: true },
      { name: "Battery tamper alerts", standard: true, premium: true },
      { name: "Ignition monitoring", standard: true, premium: true },
      { name: "24/7 location alerts", standard: true, premium: true },
      { name: "Recovery assistance", standard: true, premium: true },
      { name: "Hidden voice monitoring", standard: false, premium: true },
    ],
  },
  {
    category: "Reports & Analytics",
    features: [
      { name: "Driving behavior reports", standard: true, premium: true },
      { name: "Fuel consumption tracking", standard: true, premium: true },
      { name: "Mileage reports", standard: true, premium: true },
      { name: "Parking reports", standard: true, premium: true },
      { name: "Overspeed reports", standard: true, premium: true },
      { name: "Custom report generation", standard: true, premium: true },
    ],
  },
  {
    category: "Support & Service",
    features: [
      { name: "24/7 call center support", standard: true, premium: true },
      { name: "Multiple user accounts", standard: true, premium: true },
      { name: "Mobile app access", standard: true, premium: true },
      { name: "Dedicated account manager", standard: false, premium: true },
      { name: "Priority support", standard: false, premium: true },
      { name: "Custom integrations", standard: false, premium: true },
    ],
  },
];

export default function PricingPage() {
  // Animation states for sections
  const [pricingCardsVisible, setPricingCardsVisible] = useState(false);
  const [trustIndicatorsVisible, setTrustIndicatorsVisible] = useState(false);
  const [featureComparisonVisible, setFeatureComparisonVisible] =
    useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);

  // Counter animation states
  const [trustCounts, setTrustCounts] = useState([0, 0, 0]);

  // Refs for sections
  const pricingCardsRef = useRef<HTMLDivElement>(null);
  const trustIndicatorsRef = useRef<HTMLDivElement>(null);
  const featureComparisonRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObservers = [
      { ref: pricingCardsRef, setter: setPricingCardsVisible },
      { ref: trustIndicatorsRef, setter: setTrustIndicatorsVisible },
      { ref: featureComparisonRef, setter: setFeatureComparisonVisible },
      { ref: testimonialsRef, setter: setTestimonialsVisible },
      { ref: faqRef, setter: setFaqVisible },
      { ref: finalCtaRef, setter: setFinalCtaVisible },
    ];

    const observers = sectionObservers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold: 0.1, rootMargin: "0px" }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Counter animation for trust indicators
  useEffect(() => {
    if (!trustIndicatorsVisible) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const targets = [500, 98, 95]; // Targets for 500K+, 98%, 95%

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const newCounts = targets.map((target) => {
        const count = Math.floor(target * progress);
        return count;
      });

      setTrustCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trustIndicatorsVisible]);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-0 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              GPS Vehicle Tracker Plans
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Pakistan's 1st AI Operator Application Available. Choose the
              perfect plan for your vehicle tracking needs with military-grade
              security and 24/7 support.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm sm:text-base font-semibold text-accent">
                  Military-Grade Security
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm sm:text-base font-semibold text-accent">
                  Real-Time Tracking
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm sm:text-base font-semibold text-accent">
                  24/7 Support
                </span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12">
              <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground animate-bounce-down mx-auto" />
            </div>
          </div>
        </div>
      </section>

      

      {/* Feature Comparison */}
      <section
        ref={featureComparisonRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 ${
              featureComparisonVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Plan Comparison
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Detailed comparison of features to help you choose the right plan
              for your needs
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              {/* Header */}
              <div className="p-2 sm:p-4 md:p-6 border-b border-border">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-foreground">
                  Features
                </h3>
              </div>
              <div className="p-2 sm:p-4 md:p-6 border-b border-border bg-muted/50">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-foreground">
                  Standard Plan
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                  Essential tracking
                </p>
              </div>
              <div className="p-2 sm:p-4 md:p-6 border-b border-border bg-accent/5 relative">
                <div className="absolute hidden sm:block sm:top-2 sm:right-2 md:top-4 md:right-4 bg-accent text-accent-foreground px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-semibold">
                  Recommended
                </div>
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-foreground">
                  Premium Plan
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                  Advanced features
                </p>
              </div>

              {/* Feature Categories */}
              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex} className="contents">
                  <div className="col-span-3 bg-muted/30 px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-border">
                    <h4 className="font-semibold text-foreground text-xs sm:text-sm md:text-base">
                      {category.category}
                    </h4>
                  </div>

                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="contents border-b border-border/50"
                    >
                      <div className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-foreground wrap-break-words">
                        {feature.name}
                      </div>
                      <div className="p-2 sm:p-3 md:p-4 flex justify-center">
                        {feature.standard ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent" />
                        ) : (
                          <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="p-2 sm:p-3 md:p-4 flex justify-center">
                        {feature.premium ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent" />
                        ) : (
                          <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 ${
              testimonialsVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by businesses across Pakistan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div
              className={`bg-card border border-border rounded-xl p-4 sm:p-6 ${
                testimonialsVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The Premium Plan's voice monitoring feature helped us recover
                our stolen vehicle within hours. The investment paid for itself
                immediately."
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/professional-man-avatar.jpg"
                  alt="Ahmed Khan"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    Ahmed Khan
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Fleet Manager, Karachi
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-4 sm:p-6 ${
                testimonialsVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Started with Standard Plan for our delivery vans. The detailed
                reports helped us optimize routes and reduce fuel costs by 15%."
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/professional-woman-avatar.jpg"
                  alt="Fatima Ahmed"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    Fatima Ahmed
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Operations Manager, Lahore
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-4 sm:p-6 ${
                testimonialsVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The 24/7 support team is exceptional. When we had technical
                issues during peak season, they resolved everything within
                minutes. Highly recommend their Premium Plan."
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/professional-woman-avatar-2.jpg"
                  alt="Sara Malik"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    Sara Malik
                  </div>
                  <div className="text-sm text-muted-foreground">
                    CEO, Islamabad Logistics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 ${
              faqVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Pricing FAQ
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our pricing and plans
            </p>
          </div>

          <div className="space-y-4">
            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How does the pricing work?
              </h3>
              <p className="text-muted-foreground">
                Our pricing is customized based on your fleet size, vehicle
                types, and specific requirements. We offer competitive rates
                with no hidden fees. Contact us for a personalized quote.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I upgrade from Standard to Premium later?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade your plan at any time. The transition is
                seamless, and you'll only pay the difference for the remaining
                term. No data or settings will be lost.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What is included in the setup process?
              </h3>
              <p className="text-muted-foreground">
                Setup includes device installation, account creation, user
                training, and initial configuration. Our technical team handles
                everything to ensure you're up and running quickly.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqVisible ? "fade-in-stagger-4" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Do you offer discounts for large fleets?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer volume discounts for large fleet deployments. The
                more vehicles you track, the better the per-unit pricing
                becomes. Contact our sales team for enterprise pricing.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqVisible ? "fade-in-stagger-5" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What happens if I need to cancel?
              </h3>
              <p className="text-muted-foreground">
                We offer flexible terms with no long-term contracts. You can
                cancel anytime, though we recommend giving us notice to properly
                deactivate your devices and transfer any data you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCtaRef}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-accent/5 ${
          finalCtaVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Secure Your Fleet?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join over 5000 vehicles already protected by Ark Trackers
            PVT. Get started with a custom quote tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Your Quote Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Sales Team
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free consultation • No obligation • Custom pricing
          </p>
        </div>
      </section>

      <Footer2 />
    </main>
  );
}
