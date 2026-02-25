"use client";

import Navbar from "@/components/navbar";
import Footer2 from "@/components/Footer2";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  HeadphonesIcon,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { phoneNumber } from "@/lib/contact-info";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Animation states
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [locationSectionVisible, setLocationSectionVisible] = useState(false);
  const [faqSectionVisible, setFaqSectionVisible] = useState(false);

  // Refs for sections
  const contactFormRef = useRef<HTMLDivElement>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const sectionObservers = [
      { ref: contactFormRef, setter: setContactFormVisible },
      { ref: locationSectionRef, setter: setLocationSectionVisible },
      { ref: faqSectionRef, setter: setFaqSectionVisible },
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

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      primary: `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(
        4,
        7
      )}${phoneNumber.slice(7)}`,
      description: "24/7 customer support",
      action: `tel:+92${phoneNumber.slice(1)}`,
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "contact@arktrackers.com",
      description: "Response within 2 hours",
      action: "mailto:contact@arktrackers.com",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      primary: "Office No. 2-D, St. 28",
      secondary: "Javed Market, I-10/4, Islamabad",
      description: "Monday - Saturday, 9AM - 6PM",
      action: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-0 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to secure your vehicle? Get in touch with our expert team.
              We're here to help you choose the perfect tracking solution for
              your needs.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="bg-card border border-border rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-accent transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                      {method.title}
                    </h3>
                  </div>
                  <p className="text-accent font-semibold text-base sm:text-lg mb-1">
                    {method.primary}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    {method.secondary}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12">
            <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground animate-bounce-down mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              ref={contactFormRef}
              className={`${
                contactFormVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder={`${phoneNumber.slice(
                          0,
                          4
                        )}-${phoneNumber.slice(4, 7)}${phoneNumber.slice(7)}`}
                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="pricing">Pricing Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Office Info */}
            <div ref={locationSectionRef} className="space-y-8">
              {/* Map */}
              <div
                className={`bg-card border border-border rounded-xl overflow-hidden ${
                  locationSectionVisible ? "fade-in-stagger-1" : "opacity-0"
                }`}
              >
                <div className="p-4 sm:p-6 border-b border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Our Location
                  </h3>
                  <p className="text-muted-foreground">
                    Visit our office in Islamabad
                  </p>
                </div>
                <div
                  className={`aspect-video relative ${
                    locationSectionVisible ? "fade-in-stagger-1" : "opacity-0"
                  }`}
                >
                  <Image
                    src="/map-location.jpg"
                    alt="Ark Trackers Office Location - Javed Market, I-10/4, Islamabad"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                      <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="font-semibold text-foreground">
                        Office No. 2-D, St. 28
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Javed Market, I-10/4, Islamabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div
                className={`bg-card border border-border rounded-xl p-6 ${
                  locationSectionVisible ? "fade-in-stagger-2" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Business Hours
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Monday - Friday</span>
                    <span className="text-muted-foreground font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Saturday</span>
                    <span className="text-muted-foreground font-medium">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Sunday</span>
                    <span className="text-muted-foreground font-medium">
                      Closed
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HeadphonesIcon className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-accent">
                      24/7 Emergency Support
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our emergency response team is available 24 hours a day, 7
                    days a week for critical situations.
                  </p>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div
                className={`bg-accent/5 border border-accent/20 rounded-xl p-6 ${
                  locationSectionVisible ? "fade-in-stagger-3" : "opacity-0"
                }`}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Quick Response Guarantee
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Phone calls answered within 2 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Email responses within 2 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Emergency situations handled immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqSectionRef}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 ${
          faqSectionVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqSectionVisible ? "fade-in-stagger-1" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How quickly can I get started with vehicle tracking?
              </h3>
              <p className="text-muted-foreground">
                Most customers are up and running within 24 hours. Our setup
                process is streamlined, and our team provides personalized
                guidance throughout the installation.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqSectionVisible ? "fade-in-stagger-2" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Do you provide training for using the tracking system?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide comprehensive training for all our clients. This
                includes dashboard navigation, report generation, alert setup,
                and best practices for fleet management.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqSectionVisible ? "fade-in-stagger-3" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What kind of support do you offer after installation?
              </h3>
              <p className="text-muted-foreground">
                We offer 24/7 technical support, regular system updates, and
                ongoing optimization services. Our support team is always ready
                to help with any questions or issues.
              </p>
            </div>

            <div
              className={`bg-card border border-border rounded-lg p-6 ${
                faqSectionVisible ? "fade-in-stagger-4" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I track multiple vehicles with one account?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! Our platform is designed for fleet management. You
                can track unlimited vehicles on a single account with
                consolidated reporting and management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </main>
  );
}
