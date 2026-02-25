"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function HeroSectionMobile() {
  return (
    <div className="lg:hidden">
      {" "}
      {/* Show on mobile/tablet, hidden on lg+ */}
      <section className="py-0 md:py-20 min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background decoration */}
        {/* <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" /> */}

        <div
          id="hero-section-mobile"
          className="mx-auto h-screen flex flex-row justify-start gap-2 items-center text-left max-w-screen-xs border-2 border-black relative px-2"
        >
          {/* LEFT SIDE - Text content */}
          <div className="basis-4/5 flex flex-col gap-4 px-0 sm:px-6 lg:px-8 border-2 border-black">
            <Badge className="w-fit mr-auto lg:mx-0 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-lg">
              AI-Powered Vehicle Tracking
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-3xl font-bold text-foreground text-balance leading-tight">
              Always Know Where Your Car Is
            </h1>

            <p className="text-base text-muted-foreground">
              Secure, reliable vehicle tracking with real-time GPS updates,
              theft <br className="hidden sm:block" /> alerts, and comprehensive
              trip history. Peace of mind for every journey.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <button
                className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors w-full sm:w-auto max-w-[200px]"
                onClick={() => (window.location.href = "/pricing")}
              >
                Track Your Car Now
              </button>
              <button
                className="px-6 py-2 border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted transition-colors w-full sm:w-auto max-w-[200px]"
                onClick={() => (window.location.href = "/services")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
