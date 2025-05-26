"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import GloveModel from "../../components/GloveModel/GloveModel";

export default function GloveViewer({
  color,
  text,
  decal,
}: {
  color: string;
  text: string;
  decal: string;
}) {
  return (
    <Canvas style={{ height: "100vh", width: "100%", background: "#111" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <OrbitControls />
      <Suspense fallback={<Placeholder />}>
        <GloveModel color={color} text={text} decal={decal} />
      </Suspense>
    </Canvas>
  );
}

function Placeholder() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
