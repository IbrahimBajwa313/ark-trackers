"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import CarModel from "./CarModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Spinner } from "@/components/ui/spinner";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const carRef = useRef<any>(null);
  const [animationState] = useState({
    position: { x: 0.5, y: 0, z: 0 }, // Closer to center
    rotation: { y: Math.PI * 2 }, // 360 degrees (same as 0, or 180 more)
    opacity: 1,
    scale: 0.25, // Even smaller for mobile
  });

  useEffect(() => {
    // Basic scroll animation for mobile - simplified
    ScrollTrigger.refresh();

    // Simple position animation
    const positionTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom center",
        scrub: true,
      },
    });
    positionTl
      .to(animationState.position, { x: 0.5, y: -0.5, ease: "none" })
      .to(animationState.position, { x: -1, y: -0.5, ease: "none" });

    // Simple rotation
    gsap.to(animationState.rotation, {
      y: Math.PI * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // Scale animation - grow slightly
    gsap.to(animationState, {
      scale: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    // Fade out
    gsap.to(animationState, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "center+=200px center",
        end: "bottom-=200px top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animationState]);

  // Update Three.js object on every frame
  useFrame(() => {
    if (carRef.current) {
      carRef.current.position.set(
        animationState.position.x,
        animationState.position.y,
        animationState.position.z
      );
      carRef.current.rotation.y = animationState.rotation.y;
      carRef.current.scale.setScalar(animationState.scale);

      // Update opacity
      carRef.current.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = animationState.opacity;
        }
      });
    }
  });

  return (
    <>
      <CarModel ref={carRef} scale={0.25} />
    </>
  );
}

function Loader() {
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="md" className="text-accent" />
        <p className="text-xs text-muted-foreground">
          Loading 3D Model... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

export default function CarCanvasMobile() {
  return (
    <div className="relative w-full h-full">
      <Loader />
      <Canvas
        camera={{ position: [0, 3, 0], fov: 60 }}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 3]} intensity={1} />

        <Scene />

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
