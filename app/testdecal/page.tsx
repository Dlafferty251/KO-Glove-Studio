"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DecalBall from "@/components/GloveCustomizeUI/DecalBall";
export default function TestDecalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />

      <DecalBall />
    </Canvas>
  );
}
