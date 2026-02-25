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
    position: { x: 2, y: 0, z: 0 }, // Start on the right
    rotation: { y: -Math.PI / 4 }, // Start facing slightly left
    opacity: 1, // Start fully visible
    scale: 0.8, // Start at smaller size
  });

  useEffect(() => {
    // Make sure ScrollTrigger is working
    ScrollTrigger.refresh();

    // Animate car position - move from right to left using a timeline
    const positionTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        // markers: true, // Enable markers for debugging
      },
    });
    positionTl
      .to(animationState.position, { x: -3.5, y: -1, ease: "none" })
      .to(animationState.position, { x: -3.5, y: -1, ease: "none" })
      .to(animationState.position, { x: -18, y: -1, ease: "none" });

    // Animate rotation
    gsap.to(animationState.rotation, {
      y: Math.PI * 1.6,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // Animate scale - grow from 0.8 to 1
    gsap.to(animationState, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    // Fade out after middle of second section
    gsap.to(animationState, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "center+=300px center",
        end: "bottom-=300px top",
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

      // Update opacity for fade effect
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
      <CarModel ref={carRef} scale={0.8} />
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
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-accent" />
        <p className="text-sm text-muted-foreground">
          Loading 3D Model... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

export default function CarCanvas() {
  return (
    <div className="relative w-full h-full">
      <Loader />
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

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
