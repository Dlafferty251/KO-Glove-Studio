"use client";
import { Decal, useTexture } from "@react-three/drei";
import { Euler, Mesh } from "three";
import { useRef } from "react";

export default function DecalBall() {
  const texture = useTexture("/images/reaper.webp");
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />

      <Decal
        map={texture}
        position={[0, 0, 1]}
        rotation={new Euler(0, 0, 0)}
        scale={0.5}
      />
    </mesh>
  );
}
