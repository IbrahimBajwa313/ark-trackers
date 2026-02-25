
"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Html, Line, PerspectiveCamera } from "@react-three/drei";
import { CarModel, CarModelRef } from "./CarModel";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, Camera, Map, Clock, History, Globe } from "lucide-react";
import Image from "next/image";

// Predefined Icon Data
// We map the labels from the original file to 3D positions
// Left Side (Features) are handled by HTML/CSS in parent.
// Right Side (Car Parts) are what we need here.
const PARTS_DATA = [
  { 
    label: "ADAS CAMERA", 
    icon: null, 
    isImage: true, 
    src: "/mdvr-adas-camera.png", 
    pos: [-2.5, 1.8, 2.5], 
    mobilePos: [-2.4, 2.2, 1.5], // Moved closer and higher
    targetLocal: [-0.6, 0.6, 2.2] 
  },
  { 
    label: "DMS CAMERA", 
    icon: null, 
    isImage: true, 
    src: "/mdvr-dsm-camera.png", 
    pos: [-2.5, 2.9, 0.5], 
    mobilePos: [-1.0, 3.2, 1.0], // Moved closer and higher
    targetLocal: [-0.3, 1.0, 0.5] 
  },
  { 
    label: "4-CH MDVR", 
    icon: null, 
    isImage: true, 
    src: "/mdvr.png", 
    pos: [-0.8, 3.4, -1.5], 
    mobilePos: [0.5, 3.8, -1.0], // Centered and higher
    targetLocal: [1.0, 0.2, -1.0] 
  },
  { 
    label: "DISPLAY", 
    icon: Monitor, 
    isImage: false, 
    src: "", 
    pos: [1.2, 3.4, -1.5], 
    mobilePos: [2.0, 3.2, -1.0], // Moved closer to center
    targetLocal: [0.3, 1.0, 0.8] 
  },
  { 
    label: "CH-2", 
    icon: Camera, 
    isImage: false, 
    src: "", 
    pos: [2.8, 1.9, 0.8], 
    mobilePos: [2.8, 2.2, 0.8], // Moved closer
    targetLocal: [1.1, 0.5, 0] 
  },
];

const BORDER_COLOR = "border-sky-400";
const LINE_COLOR = "#0EA5E9"; // Sky Blue

function ConnectorLine({ start, endLocal, carGroup, active }: { start: number[], endLocal: number[], carGroup: THREE.Group | null, active: boolean }) {
  const lineRef = useRef<any>(null);
  const endVec = useMemo(() => new THREE.Vector3(...endLocal), [endLocal]);
  const worldEnd = useMemo(() => new THREE.Vector3(), []);
  const currentEnd = useMemo(() => new THREE.Vector3(...start), [start]); 
  const progress = useRef(0);
  const timeActive = useRef(0); // Track how long it's been active
  
  useFrame((state, delta) => {
    if (carGroup && lineRef.current) {
        // Transform local point to world
        worldEnd.copy(endVec);
        worldEnd.applyMatrix4(carGroup.matrixWorld);
        
        // Animate Growth with Delay
        if (active) {
            timeActive.current += delta;
            if (timeActive.current > 0.25) {
                progress.current = Math.min(progress.current + delta * 1.2, 1);
            }
        } else {
            timeActive.current = 0;
            progress.current = Math.max(progress.current - delta * 2, 0);
        }

        // Interpolate current end point
        currentEnd.lerpVectors(new THREE.Vector3(...start), worldEnd, progress.current);
        
        // Update line geometry
        if (lineRef.current.geometry) {
            lineRef.current.geometry.setPositions([
                start[0], start[1], start[2],
                currentEnd.x, currentEnd.y, currentEnd.z
            ]);
            lineRef.current.computeLineDistances();
        }
    }
  });

  if (!carGroup) return null;

  return (
    <Line
      ref={lineRef}
      points={[start as [number, number, number], start as [number, number, number]]} // Initial points
      color={LINE_COLOR}
      lineWidth={3}
      transparent
      opacity={active ? 1 : 0} 
    />
  );
}

// Responsive Camera Component
function ResponsiveCamera({ setIsMobile }: { setIsMobile: (mobile: boolean) => void }) {
  const { camera, size } = useThree();
  
  React.useEffect(() => {
    const mobile = size.width < 768; // Mobile Breakpoint
    setIsMobile(mobile); // Update parent state

    const isTablet = size.width >= 768 && size.width < 1024;

    if (mobile) {
       camera.position.set(0, 3.5, 12);
       camera.lookAt(0, 0, 0);
    } else if (isTablet) {
       camera.position.set(0, 2.2, 9);
    } else {
       camera.position.set(0, 1.8, 7.5);
    }
    camera.updateProjectionMatrix();
  }, [camera, size, setIsMobile]);

  return null;
}

export default function HeroScene() {
  const [carReady, setCarReady] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false); // Track mobile state
  const carRef = useRef<CarModelRef>(null);

  // Staggered Animation Sequence
  React.useEffect(() => {
    if (carReady) {
       const interval = setInterval(() => {
          setVisibleIndex((prev) => {
             if (prev < PARTS_DATA.length - 1) return prev + 1;
             clearInterval(interval);
             return prev;
          });
       }, 320);
       return () => clearInterval(interval);
    } else {
        setVisibleIndex(-1);
    }
  }, [carReady]);

  return (
    <div className="w-full h-full relative touch-pan-y">
      <Canvas shadows dpr={1} camera={{ fov: 50 }} className="touch-pan-y">
        <ResponsiveCamera setIsMobile={setIsMobile} />
        <Suspense fallback={null}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} castShadow intensity={80} />
          <CarModel
            ref={carRef}
            isMobile={isMobile}
            onAnimationComplete={() => setCarReady(true)}
          />
          <ContactShadows resolution={512} scale={18} blur={1.5} opacity={0.35} far={1} />

          {/* Floating UI & Lines */}
          {carReady && PARTS_DATA.map((item, index) => {
             const isVisible = index <= visibleIndex;
             // Choose position based on mobile state
             const pos = isMobile && item.mobilePos ? item.mobilePos : item.pos;
             
             return (
             <group key={index}>
                 {/* The floating icon */}
                 <Html position={pos as [number, number, number]} center distanceFactor={12} zIndexRange={[2000, 1000]} style={{ pointerEvents: 'none' }}>
                    <div 
                        className={`flex flex-col items-center gap-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className={`relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-xl p-2 border-2 ${BORDER_COLOR} flex items-center justify-center group hover:scale-110 transition-transform duration-300`}>
                             {item.isImage ? (
                                <div className="relative w-full h-full"> 
                                    <Image src={item.src} alt={item.label} fill className="object-contain p-1" />
                                </div>
                             ) : (
                                item.icon && <item.icon className="w-6 h-6 md:w-8 md:h-8 text-slate-800" />
                             )}
                        </div>
                        <Badge className={`bg-white text-slate-800 border-2 ${BORDER_COLOR} text-[8px] md:text-[10px] font-bold px-2 py-0.5 shadow-sm whitespace-nowrap`}>
                            {item.label}
                        </Badge>
                    </div>
                 </Html>

                 <ConnectorLine 
                    start={pos} 
                    endLocal={item.targetLocal} 
                    carGroup={carRef.current?.group || null}
                    active={isVisible}
                 />
             </group>
             );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
}
