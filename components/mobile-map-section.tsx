"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MobileMapSection() {
  const carRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.to(carRef.current, { x: 120, duration: 1 })
      .to(carRef.current, {
        rotation: "+=90",
        x: "+=5",
        y: "+=10",
        duration: 1,
      })
      .to(carRef.current, { y: "+=140", duration: 1 })
      .to(carRef.current, { rotation: "-=90", y: "+=10", duration: 1 })
      .to(carRef.current, { x: "+=400", duration: 1.2, ease: "none" });

    ScrollTrigger.create({
      trigger: mapRef.current,
      start: "top bottom",
      end: "bottom top+=100px",
      scrub: true,
      animation: tl,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="lg:hidden">
      {/* Mobile-only map section */}
      <section className="p-2 bg-background relative overflow-hidden">
        <div className="max-w-screen-sm mx-auto">
          {/* Map container with background */}
          <div
            ref={mapRef}
            className="relative h-64 bg-cover overflow-hidden w-[500px] mx-auto bg-center bg-no-repeat rounded-lg shadow-lg"
            style={{
              backgroundImage: "url('/map2.webp')",
            }}
          >
            {/* Animated car positioned over the map */}
            <div ref={carRef} className="absolute top-3.5 scale-70 left-2">
              <Image
                src="/mapcar.png"
                alt="Car on map"
                width={40}
                height={40}
                className="drop-shadow-lg rotate-90"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
