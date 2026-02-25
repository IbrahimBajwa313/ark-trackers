"use client";

import React, { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export interface CarModelRef {
  group: THREE.Group | null;
}

interface CarModelProps {
  onAnimationComplete?: () => void;
  isMobile: boolean;
}

export const CarModel = forwardRef<CarModelRef, CarModelProps>(({ onAnimationComplete, isMobile }, ref) => {
  const group = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  
  // Custom Mobile Interaction State
  const isDragging = useRef(false);
  const previousX = useRef(0);

  // Load the GLB model
  const { scene } = useGLTF("/models/car-transformed.glb");
  const clone = React.useMemo(() => scene.clone(), [scene]);

  // Removed Debug Logging

  useImperativeHandle(ref, () => ({
    group: group.current
  }));

  useGSAP(() => {
    // ... (GSAP code same as before, preserving it)
    if (!group.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
      }
    });

    // Spawn & drift – shorter durations for faster ready state
    tl.fromTo(group.current.position,
      { x: 10, y: 0, z: -4 },
      { x: 0, y: 0, z: 0, duration: 1.8, ease: "power2.out" }
    );
    tl.fromTo(group.current.rotation,
      { y: -Math.PI / 2, z: -0.12 },
      { y: Math.PI / 5, z: 0, duration: 1.4, ease: "power3.out" },
      "<+=0.15"
    );

  }, { scope: group });

  const { camera } = useThree();
  const initialCameraPos = useRef<THREE.Vector3>(null);

  useEffect(() => {
    if (!initialCameraPos.current) {
        initialCameraPos.current = camera.position.clone();
    }
  }, [camera]);

  const handleEndInteraction = () => {
    if (controlsRef.current && initialCameraPos.current && !isMobile) {
      const cam = controlsRef.current.object;
      gsap.to(cam.position, {
        x: initialCameraPos.current.x,
        y: initialCameraPos.current.y,
        z: initialCameraPos.current.z,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => { if (controlsRef.current) controlsRef.current.update(); } 
      });
    }
  };
  
  // Custom Mobile Rotation Logic
  const handlePointerDown = (e: any) => {
    if (!isMobile) return;
    isDragging.current = true;
    previousX.current = e.clientX;
  };

  const handlePointerMove = (e: any) => {
    if (!isMobile || !isDragging.current || !group.current) return;
    const deltaX = e.clientX - previousX.current;
    previousX.current = e.clientX;
    group.current.rotation.y += deltaX * 0.005; // Adjust sensitivity
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <>
      {!isMobile && (
        <OrbitControls 
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            onEnd={handleEndInteraction}
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 2.5} // Lock vertical rotation
            makeDefault 
        />
      )}

      {/* Mobile Interaction Mesh (Invisible Hitbox) */}
      {isMobile && (
        <mesh 
           visible={false} 
           scale={[10, 10, 10]} 
           onPointerDown={handlePointerDown}
           onPointerMove={handlePointerMove}
           onPointerUp={handlePointerUp}
           onPointerLeave={handlePointerUp}
        >
            <boxGeometry />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
      
      <group ref={group}>
         {/* Center component automatically centers the model and aligns pivot */}
         <Center top> 
             <primitive 
                object={clone} 
                scale={110} 
                rotation={[0, 0, 0]} 
             />
         </Center>
      </group>
    </>
  );
});

CarModel.displayName = "CarModel";

// Pre-load the model (same path as used in useGLTF)
useGLTF.preload("/models/car-transformed.glb");
