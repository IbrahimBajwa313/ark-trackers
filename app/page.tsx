import Navbar from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { LicensesSection } from "@/components/licenses-section";
import Footer2 from "@/components/Footer2";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden text-foreground selection:bg-sky-200/70 selection:text-slate-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <PricingSection />
      <LicensesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer2 />
    </main>
  );
}
