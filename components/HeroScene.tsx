"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Html, Line, PerspectiveCamera } from "@react-three/drei";
import { CarModel, CarModelRef } from "./CarModel";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, Camera, Map, Clock, History, Globe } from "lucide-react";
import Image from "next/image";

// --- UPDATED POSITIONS FOR BETTER LAYOUT ---
// We compressed the X values slightly so labels fit better when the camera is closer (larger car).
// 'pos' is the floating label position. 'targetLocal' is where the line connects to the car.
const PARTS_DATA = [
  { 
    label: "ADAS CAMERA", 
    icon: null, 
    isImage: true, 
    src: "/mdvr-adas-camera.png", 
    // Adjusted X from -2.5 to -1.8 to keep it in frame when zoomed in
    pos: [-1.8, 1.8, 2.0], 
    mobilePos: [-3.6, .3, -1.5], 
    targetLocal: [-0.5, 0.6, 2.0] 
  },
  { 
    label: "DMS CAMERA", 
    icon: null, 
    isImage: true, 
    src: "/mdvr-dsm-camera.png", 
    pos: [-1.6, 2.6, 0.5], 
    mobilePos: [-1.2, 2.9, -1.0], 
    targetLocal: [-0.2, 1.0, 0.5] 
  },
  // { 
  //   label: "4-CH MDVR", 
  //   icon: null, 
  //   isImage: true, 
  //   src: "/mdvr.png", 
  //   // Adjusted X and Y for a more balanced overhead look
  //   pos: [-0.2, 3.2, -1.5], 
  //   mobilePos: [0.5, 3.8, -1.0], 
  //   targetLocal: [0.8, 0.2, -1.0] 
  // },
  { 
    label: "DISPLAY", 
    icon: Monitor, 
    isImage: false, 
    src: "", 
    pos: [1.2, 3.2, -1.5], 
    mobilePos: [1.8, 2.9, -1.0], 
    targetLocal: [0.3, 1.0, 0.8] 
  },
  { 
    label: "CH-2", 
    icon: Camera, 
    isImage: false, 
    src: "", 
    pos: [2.2, 1.9, 0.8], 
    mobilePos: [3.8, .3, -1.0], 
    targetLocal: [1.1, 0.5, 0] 
  },
];

const BORDER_COLOR = "border-sky-400";
const LINE_COLOR = "#0EA5E9"; // Sky Blue

// --- IMPROVED CONNECTOR LINE ---
function ConnectorLine({ start, endLocal, carGroup, active }: { start: number[], endLocal: number[], carGroup: THREE.Group | null, active: boolean }) {
  const lineRef = useRef<any>(null);
  const endVec = useMemo(() => new THREE.Vector3(...endLocal), [endLocal]);
  const worldEnd = useMemo(() => new THREE.Vector3(), []);
  const currentEnd = useMemo(() => new THREE.Vector3(...start), [start]); 
  const progress = useRef(0);
  const timeActive = useRef(0);
  
  useFrame((state, delta) => {
    if (carGroup && lineRef.current) {
        // Calculate world position of the target point on the car
        worldEnd.copy(endVec);
        worldEnd.applyMatrix4(carGroup.matrixWorld);
        
        // Animation Logic
        if (active) {
            timeActive.current += delta;
            // Small delay before starting growth
            if (timeActive.current > 0.3) {
                // Smooth ease-out interpolation
                const t = progress.current;
                const ease = t * (2 - t); // Simple ease out
                progress.current = Math.min(progress.current + delta * 1.5, 1);
            }
        } else {
            timeActive.current = 0;
            progress.current = Math.max(progress.current - delta * 3, 0);
        }

        // Interpolate from start position to target world position
        currentEnd.lerpVectors(new THREE.Vector3(...start), worldEnd, progress.current);
        
        // Update Line Geometry
        if (lineRef.current.geometry) {
            const positions = lineRef.current.geometry.attributes.position.array;
            positions[0] = start[0]; positions[1] = start[1]; positions[2] = start[2]; // Start point
            positions[3] = currentEnd.x; positions[4] = currentEnd.y; positions[5] = currentEnd.z; // End point
            lineRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }
  });

  if (!carGroup) return null;

  return (
    <Line
      ref={lineRef}
      points={[start as [number, number, number], start as [number, number, number]]} 
      color={LINE_COLOR}
      lineWidth={2} // Slightly thinner for elegance
      transparent
      opacity={active ? 0.8 : 0} 
    />
  );
}

// --- RESPONSIVE CAMERA (FIXED FOR LARGER IMAGE) ---
function ResponsiveCamera({ setIsMobile }: { setIsMobile: (mobile: boolean) => void }) {
  const { camera, size } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);
  
  React.useEffect(() => {
    const mobile = size.width < 768; 
    const isTablet = size.width >= 768 && size.width < 1024;
    setIsMobile(mobile);

    // Default Target (Look at center)
    vec.set(0, 0, 0);

    if (mobile) {
       // Mobile: Further back to fit height
       camera.position.set(0, 3.5, 10);
    } else if (isTablet) {
       // Tablet: Moderate distance
       camera.position.set(0, 2.0, 7);
    } else {
       // Desktop: **MOVED CLOSER (Z=5.5)** to make the car larger
       // Adjusted Y slightly to center the visual mass
       camera.position.set(0, 1.4, 5.5);
    }
    
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size, setIsMobile, vec]);

  return null;
}

export default function HeroScene() {
  const [carReady, setCarReady] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
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
       }, 300); // Slightly faster stagger
       return () => clearInterval(interval);
    } else {
        setVisibleIndex(-1);
    }
  }, [carReady]);

  return (
    <div className="w-full h-full relative mt-16 touch-pan-y">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }} className="touch-pan-y">
        <ResponsiveCamera setIsMobile={setIsMobile} />
        <Suspense fallback={null}>
          <Environment preset="city" /> {/* Changed preset for better reflections */}
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} castShadow intensity={100} />
          <directionalLight position={[-5, 10, 5]} intensity={0.5} />
          
          <CarModel
            ref={carRef}
            isMobile={isMobile}
            onAnimationComplete={() => setCarReady(true)}
          />
          
          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={4} color="#000000" />

          {/* Floating UI & Lines */}
          {carReady && PARTS_DATA.map((item, index) => {
             const isVisible = index <= visibleIndex;
             const pos = isMobile && item.mobilePos ? item.mobilePos : item.pos;
             
             return (
             <group key={index}>
                 <Html 
                    position={pos as [number, number, number]} 
                    center 
                    distanceFactor={isMobile ? 10 : 7} // Adjusted scale based on camera distance
                    zIndexRange={[100, 0]} 
                    style={{ pointerEvents: 'none' }}
                 >
                    <div 
                        className={`flex flex-col items-center gap-2  transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}`}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className={`relative w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full shadow-xl p-2 border-2 ${BORDER_COLOR} flex items-center justify-center group hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                             {item.isImage ? (
                                <div className="relative w-full h-full"> 
                                    <Image src={item.src} alt={item.label} fill className="object-contain p-1.5" />
                                </div>
                             ) : (
                                item.icon && <item.icon className="w-8 h-8 md:w-8 md:h-8 text-slate-800" />
                             )}
                        </div>
                        <Badge className={`bg-white/90 backdrop-blur-md text-slate-800 border-2 ${BORDER_COLOR} text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 shadow-lg whitespace-nowrap`}>
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