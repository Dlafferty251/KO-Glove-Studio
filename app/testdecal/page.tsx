"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Mesh, MeshStandardMaterial, TextureLoader, Vector3, Euler } from "three";

export default function DecalTestPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <DecalSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}

function DecalSphere() {
  const meshRef = useRef<Mesh>(null);
  const texture = new TextureLoader().load("/images/decal/boxinggloves.webp");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="red" />
      <Decal
        position={new Vector3(0, 0.5, 0.9)}
        rotation={new Euler(0, 0, 0)}
        scale={0.6}
        map={texture}
        depthTest={true}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-10}
      />
    </mesh>
  );
}
