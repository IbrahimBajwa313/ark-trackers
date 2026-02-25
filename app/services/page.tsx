"use client";

import Navbar from "@/components/navbar";
import Footer2 from "@/components/Footer2";
import {
  MapPin,
  AlertTriangle,
  MapPinned,
  Clock,
  AlertCircle,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Users,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const coreServices = [
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description:
      "Live location updates with 5-meter accuracy, refreshing every second for complete visibility.",
    features: [
      "Real-time location monitoring",
      "5-meter accuracy precision",
      "Live route visualization",
      "Multi-device tracking",
      "Historical playback",
    ],
    image: "/car-tracking-dashboard.jpg",
  },
  {
    icon: AlertTriangle,
    title: "Theft Prevention & Alerts",
    description:
      "Advanced security system that instantly detects unauthorized movement and alerts you immediately.",
    features: [
      "Instant theft notifications",
      "Unauthorized movement alerts",
      "Engine immobilization",
      "Remote vehicle lockdown",
      "Emergency response coordination",
    ],
    image: "/businesswoman-opening-her-car-door.jpg",
  },
  {
    icon: MapPinned,
    title: "Geo-Fencing Technology",
    description:
      "Create virtual boundaries and receive instant alerts when your vehicle enters or exits designated areas.",
    features: [
      "Custom boundary creation",
      "Entry/exit notifications",
      "Speed limit alerts",
      "Parking zone monitoring",
      "Scheduled alerts",
    ],
    image: "/map-location.jpg",
  },
  {
    icon: Clock,
    title: "Trip History & Analytics",
    description:
      "Complete journey records with detailed analytics to optimize routes and monitor driver behavior.",
    features: [
      "Complete trip logs",
      "Route optimization",
      "Stop duration tracking",
      "Driver behavior analysis",
      "Mileage calculations",
    ],
    image: "/navigator-car-road-forest-area-closeup.jpg",
  },
  {
    icon: AlertCircle,
    title: "Emergency SOS System",
    description:
      "One-touch emergency alerts that instantly notify authorities and emergency contacts.",
    features: [
      "One-tap emergency alerts",
      "Automatic authority notification",
      "Emergency contact alerts",
      "Location sharing",
      "Incident reporting",
    ],
    image: "/sos.jpeg",
  },
  {
    icon: TrendingUp,
    title: "Fleet Analytics & Reports",
    description:
      "Comprehensive insights into fleet performance, fuel efficiency, and maintenance needs.",
    features: [
      "Fuel consumption analysis",
      "Maintenance scheduling",
      "Performance metrics",
      "Cost optimization reports",
      "Custom dashboard creation",
    ],
    image: "/app-features-interface.jpg",
  },
];

const additionalServices = [
  {
    title: "24/7 Call Center Support",
    description:
      "Round-the-clock customer support with dedicated account managers for enterprise clients.",
    icon: Phone,
  },
  {
    title: "Mobile App Access",
    description:
      "Full-featured mobile applications for iOS and Android with real-time tracking capabilities.",
    icon: Zap,
  },
  {
    title: "API Integration",
    description:
      "RESTful APIs for seamless integration with existing business systems and third-party applications.",
    icon: Shield,
  },
  {
    title: "Custom Solutions",
    description:
      "Tailored tracking solutions for specialized industries including logistics, construction, and mining.",
    icon: Users,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Device Installation",
    description:
      "Our certified technicians install GPS tracking devices with minimal vehicle modification.",
  },
  {
    step: "02",
    title: "Account Setup",
    description:
      "Create your account and configure tracking preferences, alerts, and user permissions.",
  },
  {
    step: "03",
    title: "Real-Time Monitoring",
    description:
      "Access live tracking data through our web platform and mobile applications.",
  },
  {
    step: "04",
    title: "Advanced Analytics",
    description:
      "Generate detailed reports and insights to optimize fleet performance and security.",
  },
];

export default function ServicesPage() {
  const [visibleServices, setVisibleServices] = useState<Set<number>>(
    new Set()
  );
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation states for sections
  const [additionalServicesVisible, setAdditionalServicesVisible] =
    useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);
  const [whyChooseVisible, setWhyChooseVisible] = useState(false);
  const [customersSayVisible, setCustomersSayVisible] = useState(false);
  const [servicesFaqVisible, setServicesFaqVisible] = useState(false);

  // Refs for sections
  const additionalServicesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const customersSayRef = useRef<HTMLDivElement>(null);
  const servicesFaqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !visibleServices.has(index)) {
            setVisibleServices((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.05, rootMargin: "0px" }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  // Intersection Observers for section animations
  useEffect(() => {
    const sectionObservers = [
      { ref: additionalServicesRef, setter: setAdditionalServicesVisible },
      { ref: howItWorksRef, setter: setHowItWorksVisible },
      { ref: whyChooseRef, setter: setWhyChooseVisible },
      { ref: customersSayRef, setter: setCustomersSayVisible },
      { ref: servicesFaqRef, setter: setServicesFaqVisible },
    ];

    const observers = sectionObservers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold: 0.0, rootMargin: "100px 0px -100px 0px" }
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

  const setServiceRef = (index: number) => (el: HTMLDivElement | null) => {
    serviceRefs.current[index] = el;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-0 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive vehicle tracking solutions designed to protect your
              assets, optimize operations, and provide peace of mind with
              military-grade security and 24/7 support.
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
                <CheckCircle className="w-5 h-5 text-accent" />
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

      {/* Core Services */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Core Tracking Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of GPS tracking services provides complete
              vehicle protection and fleet management capabilities.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-20">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={setServiceRef(index)}
                  className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
                    isEven ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  <div
                    className={`${isEven ? "" : "lg:col-start-2"} ${
                      visibleServices.has(index)
                        ? isEven
                          ? "animate-fade-in-left"
                          : "animate-fade-in-right"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6 sm:mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => (window.location.href = "/contact")}
                      className="group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <div
                    className={`${isEven ? "lg:col-start-2" : ""} relative ${
                      visibleServices.has(index)
                        ? isEven
                          ? "animate-fade-in-right"
                          : "animate-fade-in-left"
                        : ""
                    }`}
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section
        ref={additionalServicesRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 ${
              additionalServicesVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Enhanced support and advanced features to maximize the value of
              your tracking investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                    additionalServicesVisible
                      ? `fade-in-stagger-${index + 1}`
                      : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howItWorksRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 ${
              howItWorksVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Getting started with Ark Trackers is simple. Our
              streamlined process ensures you're up and running quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className={`text-center ${
                  howItWorksVisible
                    ? `fade-in-stagger-${index + 1}`
                    : "opacity-0"
                }`}
              >
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={whyChooseRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 ${
              whyChooseVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the difference with Pakistan's most trusted vehicle
              tracking service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Unmatched Security
              </h3>
              <p className="text-muted-foreground">
                Military-grade encryption and anti-jamming technology protect
                your vehicle data and ensure reliable tracking.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Real-Time Accuracy
              </h3>
              <p className="text-muted-foreground">
                Live GPS updates with 5-meter accuracy, providing precise
                location data when you need it most.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                24/7 Support
              </h3>
              <p className="text-muted-foreground">
                Round-the-clock customer support with dedicated account managers
                and emergency response coordination.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-4" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Cost Optimization
              </h3>
              <p className="text-muted-foreground">
                Reduce fuel costs, improve driver efficiency, and minimize
                vehicle downtime with detailed analytics.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-5" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Scalable Solutions
              </h3>
              <p className="text-muted-foreground">
                From single vehicles to large fleets, our solutions scale to
                meet your growing business needs.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center ${
                whyChooseVisible ? "fade-in-stagger-6" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Proven Results
              </h3>
              <p className="text-muted-foreground">
                Over 5000 vehicles protected with 95% recovery rate and
                industry-leading customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={customersSayRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 ${
              customersSayVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from businesses using our services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                customersSayVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The real-time tracking and geo-fencing features have
                revolutionized our delivery operations. We've reduced fuel costs
                by 20%."
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
                    Logistics Manager, Karachi
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                customersSayVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The emergency SOS feature saved my business. We recovered our
                stolen truck within hours thanks to the instant alerts."
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
                    Fleet Owner, Lahore
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                customersSayVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The analytics reports help us maintain our vehicles better and
                predict maintenance needs. Excellent ROI on our investment."
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
                    Operations Director, Islamabad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={servicesFaqRef}
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 ${
              servicesFaqVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Services FAQ
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our services and implementation
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                servicesFaqVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How accurate is the GPS tracking?
              </h3>
              <p className="text-muted-foreground">
                Our GPS tracking provides accuracy up to 5 meters under normal
                conditions. In urban areas with tall buildings, accuracy may
                vary slightly, but our system automatically compensates using
                cellular triangulation when needed.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                servicesFaqVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I track multiple vehicles at once?
              </h3>
              <p className="text-muted-foreground">
                Yes, our platform is designed for fleet management. You can
                track unlimited vehicles on a single account with consolidated
                reporting, bulk operations, and hierarchical user permissions.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                servicesFaqVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What happens if GPS signal is lost?
              </h3>
              <p className="text-muted-foreground">
                Our devices automatically switch to cellular triangulation and
                Wi-Fi positioning when GPS signals are weak or unavailable.
                You'll receive notifications about signal status and last known
                location.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                servicesFaqVisible ? "fade-in-stagger-4" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How quickly do you respond to emergencies?
              </h3>
              <p className="text-muted-foreground">
                Emergency alerts are processed instantly. Our 24/7 emergency
                response team coordinates with local authorities and provides
                real-time updates. Most recovery operations begin within minutes
                of alert receipt.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                servicesFaqVisible ? "fade-in-stagger-4" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Do you provide training for using the system?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide comprehensive training including dashboard
                navigation, report generation, alert configuration, and best
                practices. Training is included for all new installations and
                available on-demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="services-page-get-started"
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-accent/5"
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Protect Your Fleet?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of businesses across Pakistan who trust Ark Trackers
            with their vehicle security and fleet management
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => (window.location.href = "/pricing")}
            >
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free consultation • Custom solutions • 24/7 support
          </p>
        </div>
      </section>

      <Footer2 />
    </main>
  );
}
