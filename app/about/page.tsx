"use client";

import Navbar from "@/components/navbar";
import Footer2 from "@/components/Footer2";
import {
  Shield,
  Zap,
  Lightbulb,
  Award,
  Users,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { phoneNumber } from "@/lib/contact-info";

export default function AboutPage() {
  const [missionVisible, setMissionVisible] = useState(false);
  const [whyChooseVisible, setWhyChooseVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [statsCounts, setStatsCounts] = useState([0, 0, 0]);
  const [technologyVisible, setTechnologyVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const missionRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current && entry.isIntersecting) setMissionVisible(true);
          if (entry.target === whyChooseRef.current && entry.isIntersecting) setWhyChooseVisible(true);
          if (entry.target === storyRef.current && entry.isIntersecting) setStoryVisible(true);
          if (entry.target === technologyRef.current && entry.isIntersecting) setTechnologyVisible(true);
          if (entry.target === testimonialsRef.current && entry.isIntersecting) setTestimonialsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    [missionRef, whyChooseRef, storyRef, technologyRef, testimonialsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!storyVisible) return;
    const duration = 2000;
    const startTime = Date.now();
    const targets = [5000, 98, 95];
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setStatsCounts(targets.map((t) => Math.floor(t * progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [storyVisible]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero: image left (centered, equal spacing), text right */}
      <section className="min-h-screen flex items-center py-20 bg-[linear-gradient(to_bottom_right,var(--muted)_0.5,transparent)]">
        <div className="site-container w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image left – equal space from container edges, vertically centered */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/car-security-gps.jpg"
                  alt="Ark Trackers - Secure Vehicle Tracking"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                About Ark Trackers PVT
              </h1>
              <p className="text-base lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Pakistan's most trusted vehicle tracking service, protecting over 5,000 vehicles with cutting-edge GPS technology and military-grade security.
              </p>
              <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
                <li className="flex items-center gap-2 text-sm lg:text-base font-medium text-foreground">
                  <Award className="w-5 h-5 text-accent shrink-0" />
                  10+ Years Experience
                </li>
                <li className="flex items-center gap-2 text-sm lg:text-base font-medium text-foreground">
                  <Globe className="w-5 h-5 text-accent shrink-0" />
                  Nationwide Coverage
                </li>
                <li className="flex items-center gap-2 text-sm lg:text-base font-medium text-foreground">
                  <Users className="w-5 h-5 text-accent shrink-0" />
                  5000+ Vehicles Protected
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision – no boxes, clean typography */}
      <section className="section-padding" ref={missionRef}>
        <div className="site-container max-w-4xl">
          <div className={`text-center section-header-gap ${missionVisible ? "animate-fade-in" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-muted-foreground">
              Driving innovation in vehicle security and fleet management across Pakistan and beyond
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className={missionVisible ? "fade-in-stagger-1" : "opacity-0"}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-accent shrink-0" />
                <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To provide unparalleled vehicle security and fleet management solutions that give peace of mind to vehicle owners across Pakistan. We combine cutting-edge GPS technology with military-grade security to protect what matters most.
              </p>
            </div>
            <div className={missionVisible ? "fade-in-stagger-2" : "opacity-0"}>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-accent shrink-0" />
                <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be Pakistan's leading vehicle tracking company, setting the standard for innovation, reliability, and customer service in the automotive security industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us – list style, no cards */}
      <section className="section-padding bg-muted/30" ref={whyChooseRef}>
        <div className="site-container max-w-4xl">
          <div className={`text-center section-header-gap ${whyChooseVisible ? "animate-fade-in" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Ark Trackers?
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover what makes us Pakistan's most trusted vehicle tracking service
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-8 list-none p-0 m-0">
            {[
              { icon: Shield, title: "Military-Grade Security", text: "AES-256 encryption and SOC 2 compliance keep your data secure and private." },
              { icon: Zap, title: "Real-Time Updates", text: "Live GPS tracking with 5-meter accuracy and instant notifications." },
              { icon: Lightbulb, title: "AI-Powered Insights", text: "Analytics and predictive maintenance to optimize fleet performance." },
              { icon: Award, title: "24/7 Support", text: "Round-the-clock customer support with fast response times." },
              { icon: Globe, title: "Nationwide Coverage", text: "Comprehensive tracking across Pakistan and international borders." },
              { icon: Users, title: "Proven Track Record", text: "Over 5000 vehicles protected with 98% uptime and 95% theft recovery rate." },
            ].map((item, i) => (
              <li
                key={i}
                className={`flex gap-4 ${whyChooseVisible ? ["fade-in-stagger-1", "fade-in-stagger-2", "fade-in-stagger-3", "fade-in-stagger-4", "fade-in-stagger-5", "fade-in-stagger-6"][i] : "opacity-0"}`}
              >
                <item.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Story – image left (equal spacing), text right */}
      <section className="section-padding" ref={storyRef}>
        <div className="site-container w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-md">
                <Image
                  src="/reasoning.jpeg"
                  alt="Ark Trackers Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            <div className={`order-1 lg:order-2 ${storyVisible ? "animate-fade-in-right" : "opacity-0"}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Story: A Decade of Excellence
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Founded over a decade ago, Ark Trackers PVT began with a simple mission: to make vehicle tracking accessible, reliable, and secure for everyone in Pakistan. What started as a small operation has grown into Pakistan's most trusted vehicle tracking service.
                </p>
                <p>
                  We've learned that vehicle owners don't just want tracking—they want peace of mind. That's why we've invested heavily in cutting-edge technology, military-grade security, and exceptional customer service.
                </p>
                <p>
                  Today, we protect over 5000 vehicles across Pakistan with a 98% uptime guarantee and industry-leading theft recovery rates.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <span className="text-2xl font-bold text-accent tabular-nums">{statsCounts[0].toLocaleString()}+</span>
                  <span className="block text-sm text-muted-foreground mt-1">Vehicles Protected</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-accent tabular-nums">{statsCounts[1]}%</span>
                  <span className="block text-sm text-muted-foreground mt-1">Uptime</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-accent tabular-nums">{statsCounts[2]}%</span>
                  <span className="block text-sm text-muted-foreground mt-1">Recovery Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology – image left, list right */}
      <section className="section-padding bg-muted/30" ref={technologyRef}>
        <div className="site-container w-full">
          <div className={`text-center section-header-gap ${technologyVisible ? "animate-fade-in" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Technology That Sets Us Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We innovate to provide the most advanced security solutions
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`flex justify-center lg:justify-start ${technologyVisible ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="w-full max-w-md">
                <Image
                  src="/car-tracking-dashboard.jpg"
                  alt="Advanced GPS Tracking Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            <ul className={`space-y-6 list-none p-0 m-0 ${technologyVisible ? "animate-fade-in-right" : "opacity-0"}`}>
              {[
                "Smartphone Integration – Advanced smartphone-based tracking that rivals traditional hardware GPS in accuracy.",
                "AI-Powered Analytics – Machine learning analyzes driving patterns for predictive maintenance and fuel optimization.",
                "Multi-Device Support – Compatible with all major GPS hardware brands.",
                "Real-Time Alerts – Instant notifications for unauthorized movement, geo-fence breaches, and maintenance.",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials – minimal, no heavy cards */}
      <section className="section-padding" ref={testimonialsRef}>
        <div className="site-container max-w-4xl">
          <div className={`text-center section-header-gap ${testimonialsVisible ? "animate-fade-in" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands across Pakistan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Ark Trackers PVT has reduced our vehicle losses by 95%. The real-time tracking is invaluable for our delivery fleet.", name: "Sarah Chen", role: "Fleet Manager", avatar: "/professional-woman-avatar.jpg" },
              { quote: "The peace of mind knowing my vehicle is protected 24/7 is priceless. Best investment for my business.", name: "Marcus Johnson", role: "Rideshare Driver", avatar: "/professional-man-avatar.jpg" },
              { quote: "I recommend Ark Trackers PVT to all my clients. The data has helped us process claims faster.", name: "Emma Rodriguez", role: "Insurance Agent", avatar: "/professional-woman-avatar-2.jpg" },
            ].map((t, i) => (
              <div
                key={i}
                className={`${testimonialsVisible ? ["fade-in-stagger-1", "fade-in-stagger-2", "fade-in-stagger-3"][i] : "opacity-0"}`}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent/5">
        <div className="site-container max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Protect Your Vehicle?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join over 5000 satisfied customers who trust Ark Trackers PVT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Get Started Today
            </Link>
            <a
              href={`tel:+92${phoneNumber.slice(1)}`}
              className="inline-block border border-border bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Call {phoneNumber.slice(0, 4)}-{phoneNumber.slice(4, 7)}{phoneNumber.slice(7)}
            </a>
          </div>
        </div>
      </section>

      <Footer2 />
    </main>
  );
}
