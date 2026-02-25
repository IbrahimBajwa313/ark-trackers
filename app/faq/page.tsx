"use client";

import Navbar from "@/components/navbar";
import Footer2 from "@/components/Footer2";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { phoneNumber } from "@/lib/contact-info";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: HelpCircle,
    faqs: [
      {
        question: "How do I get started with Ark Trackers?",
        answer:
          "Getting started is simple! Contact our sales team for a free consultation. We'll assess your needs, provide a custom quote, and schedule professional installation. Most customers are up and running within 24 hours.",
      },
      {
        question: "What vehicles are compatible with your tracking system?",
        answer:
          "Our GPS trackers work with all vehicle types including cars, motorcycles, trucks, buses, and commercial vehicles. We offer both installed and smartphone-based solutions to fit any vehicle.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Professional installation typically takes 1-2 hours per vehicle. Our certified technicians ensure minimal disruption to your operations and provide comprehensive training during the process.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started. Contact us to begin your trial today.",
      },
    ],
  },
  {
    id: "tracking-features",
    title: "Tracking & Features",
    icon: Search,
    faqs: [
      {
        question: "How accurate is the GPS tracking?",
        answer:
          "Our GPS tracking provides accuracy up to 5 meters under normal conditions. In urban areas with tall buildings or parking structures, accuracy may vary slightly, but our system automatically compensates using cellular triangulation and Wi-Fi positioning.",
      },
      {
        question: "What happens if GPS signal is lost?",
        answer:
          "If GPS signal is temporarily lost, our devices automatically switch to alternative location methods including cellular triangulation and Wi-Fi positioning. You'll receive notifications about signal status and last known location is always displayed.",
      },
      {
        question: "Can I track multiple vehicles at once?",
        answer:
          "Absolutely! Our platform is designed for fleet management. You can track unlimited vehicles on a single account with consolidated reporting, bulk operations, and hierarchical user permissions for different team members.",
      },
      {
        question: "How do geo-fences work?",
        answer:
          "Geo-fences are virtual boundaries you create around specific areas. You'll receive instant notifications when vehicles enter or exit these zones. Perfect for monitoring parking areas, delivery zones, or restricted areas.",
      },
      {
        question: "Can I set speed alerts?",
        answer:
          "Yes, you can set custom speed limits for different zones and receive instant alerts when vehicles exceed these limits. This helps improve driver safety and fuel efficiency.",
      },
    ],
  },
  {
    id: "security-privacy",
    title: "Security & Privacy",
    icon: Phone,
    faqs: [
      {
        question: "Is my vehicle data private and secure?",
        answer:
          "Yes, we use military-grade AES-256 encryption for all data transmission and storage. Your vehicle location data is only accessible by you and authorized users. We comply with GDPR and SOC 2 standards.",
      },
      {
        question: "Who can access my vehicle data?",
        answer:
          "Only you and users you explicitly authorize can access your vehicle data. We never share your information with third parties without your consent. You have full control over user permissions and access levels.",
      },
      {
        question: "What security measures protect against theft?",
        answer:
          "Our devices include anti-jamming technology, tamper detection, and remote immobilization features. In case of theft, we coordinate with authorities and provide real-time tracking assistance for recovery.",
      },
      {
        question: "How do you protect against hacking?",
        answer:
          "We employ multiple layers of security including encrypted communications, secure server infrastructure, regular security audits, and compliance with international security standards. Our systems are monitored 24/7 for suspicious activity.",
      },
    ],
  },
  {
    id: "pricing-support",
    title: "Pricing & Support",
    icon: Mail,
    faqs: [
      {
        question: "How does pricing work?",
        answer:
          "Our pricing is customized based on fleet size, vehicle types, and specific requirements. We offer competitive rates with no hidden fees. Contact us for a personalized quote tailored to your needs.",
      },
      {
        question: "What are your payment terms?",
        answer:
          "We offer flexible payment terms including monthly, quarterly, and annual billing options. Enterprise customers may qualify for volume discounts and extended payment terms.",
      },
      {
        question: "What's included in your customer support?",
        answer:
          "We offer 24/7 customer support via phone, email, and live chat. Average response time is under 2 minutes for live chat. Enterprise customers get dedicated account managers and priority support.",
      },
      {
        question: "Can I cancel my service anytime?",
        answer:
          "Yes, we offer flexible terms with no long-term contracts. You can cancel anytime, though we recommend giving us notice to properly deactivate devices and transfer any data you need.",
      },
      {
        question: "Do you offer training for new users?",
        answer:
          "Yes, comprehensive training is included with all installations. This covers dashboard navigation, report generation, alert setup, and best practices. Additional training sessions are available on-demand.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Questions",
    icon: MessageSquare,
    faqs: [
      {
        question: "What mobile apps do you offer?",
        answer:
          "We provide native iOS and Android apps with full functionality including real-time tracking, alerts, trip history, and remote commands. Apps are available for both drivers and fleet managers.",
      },
      {
        question: "Can I integrate with other business systems?",
        answer:
          "Yes, we offer RESTful APIs for seamless integration with existing business systems, accounting software, ERP systems, and third-party logistics platforms.",
      },
      {
        question: "How does the emergency SOS feature work?",
        answer:
          "The emergency SOS button instantly alerts our 24/7 emergency response team and sends notifications to predefined emergency contacts. It includes your exact location and can trigger automatic authority notifications.",
      },
      {
        question: "What reports are available?",
        answer:
          "We provide comprehensive reports including trip history, fuel consumption, driver behavior, maintenance schedules, geofence activity, and custom reports. All reports can be scheduled for automatic delivery.",
      },
      {
        question: "How often is data updated?",
        answer:
          "GPS location data is updated every second for real-time tracking. Other data like fuel levels and diagnostics are updated based on vehicle systems and typically refresh every 30 seconds to 2 minutes.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: number | null }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Animation states
  const [contactSectionVisible, setContactSectionVisible] = useState(false);
  const [relatedResourcesVisible, setRelatedResourcesVisible] = useState(false);

  // Refs for sections
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const relatedResourcesRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (categoryId: string, index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.faqs.length > 0 &&
        (activeCategory === null || category.id === activeCategory)
    );

  // Intersection Observer for animations
  useEffect(() => {
    const sectionObservers = [
      { ref: contactSectionRef, setter: setContactSectionVisible },
      { ref: relatedResourcesRef, setter: setRelatedResourcesVisible },
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-0 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to common questions about Ark Trackers
              services, features, pricing, and support. Can't find what you're
              looking for? Contact our team.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12">
              <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground animate-bounce-down mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-y border-border hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.map((category) => (
            <div key={category.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(category.id, index)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors text-left"
                    >
                      <h3 className="font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                          openItems[category.id] === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openItems[category.id] === index && (
                      <div className="px-6 py-4 bg-background border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any FAQs matching "{searchTerm}". Try different
                keywords or contact our support team.
              </p>
              <Button onClick={() => (window.location.href = "/contact")}>
                Contact Support
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactSectionRef}
        className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 ${
          contactSectionVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our expert team is here to
            help. Get in touch with us and we'll provide personalized
            assistance.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                contactSectionVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-3">24/7 Support</p>
              <p className="text-accent font-semibold">
                {phoneNumber.slice(0, 4)}-{phoneNumber.slice(4, 7)}
                {phoneNumber.slice(7)}
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                contactSectionVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-3">
                Response within 2 hours
              </p>
              <p className="text-accent font-semibold">
                contact@arktrackers.com
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 ${
                contactSectionVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <MessageSquare className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-3">
                Average response: 2 minutes
              </p>
              <Button
                onClick={() => (window.location.href = "/contact")}
                className="w-full"
              >
                Start Chat
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => (window.location.href = "/contact")}
              className={
                contactSectionVisible ? "fade-in-stagger-4" : "opacity-0"
              }
            >
              Contact Us Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/services")}
              className={
                contactSectionVisible ? "fade-in-stagger-5" : "opacity-0"
              }
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section
        ref={relatedResourcesRef}
        className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 ${
          relatedResourcesVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Related Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn more about our services and how they can benefit your
              business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                relatedResourcesVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Our Services
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore our comprehensive range of GPS tracking solutions and
                features.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/services")}
                className="w-full"
              >
                View Services
              </Button>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                relatedResourcesVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Pricing Plans
              </h3>
              <p className="text-muted-foreground mb-4">
                Compare our plans and find the perfect solution for your fleet
                size.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/pricing")}
                className="w-full"
              >
                View Pricing
              </Button>
            </div>

            <div
              className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                relatedResourcesVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                About Us
              </h3>
              <p className="text-muted-foreground mb-4">
                Learn about our mission, values, and commitment to vehicle
                security.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/about")}
                className="w-full"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </main>
  );
}
