"use client";
import { Canvas } from "@react-three/fiber";
import GloveMesh from "./Glove";

export default function GloveScene() {
  return (
    <Canvas camera={{ position: [0, 0, 75], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <GloveMesh />
    </Canvas>
  );
}
