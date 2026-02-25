import Navbar from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { MobileMapSection } from "@/components/mobile-map-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { LicensesSection } from "@/components/licenses-section";
import Footer2 from "@/components/Footer2";
import Reasoning from "@/components/WhyWeAreTheBest";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {/* <div className="max-w-[1440px] mx-auto">
        <MobileMapSection />
      </div> */}
      
      <AboutSection />
      
      {/* <ServicesSection /> */}
      {/* <FeaturesSection /> */}
      
      <StatsSection />
      
      {/* <div className="max-w-[1440px] mx-auto"> */}
        {/* <Reasoning /> */}
        <PricingSection />
        <LicensesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      {/* </div> */}
      <Footer2 />
    </main>
  );
}
// Trigger rebuild to fix runtime chunk error

