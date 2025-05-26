// GloveViewer.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
  Vector3,
  Euler,
  Quaternion,
  Group,
} from "three";
import DecalGeometry from "../../lib/DecalGeometry";
import GloveModel from "../../components/GloveModel/GloveModel";

export default function GloveViewer({ color, decal }: { color: string; decal: string }) {
  const gloveRef = useRef<Mesh>(null);
  const decalGroupRef = useRef<Group>(null);
  const [decalTexture, setDecalTexture] = useState<any>(null);

  useEffect(() => {
    if (!decal) return;
    const loader = new TextureLoader();
    loader.load(
      decal,
      (texture) => {
        texture.flipY = false;
        setDecalTexture(texture);
      },
      undefined,
      (err) => console.error("Decal load failed:", err)
    );
  }, [decal]);

  const handleClick = (e: any) => {
    const clickedName = e.object?.name;
    if (
      !gloveRef.current ||
      !decalTexture ||
      !decalGroupRef.current ||
      !e.point ||
      !e.face ||
      clickedName !== "Boxing_Glove"
    ) {
      console.warn("❌ Invalid click — not on valid mesh");
      return;
    }

    const hitPoint = e.point.clone();
    const normal = e.face.normal.clone().transformDirection(e.object.matrixWorld);
    const orientation = new Euler().setFromQuaternion(
      new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal)
    );
    const size = new Vector3(0.25, 0.25, 0.25);
    const decalGeo = new DecalGeometry(gloveRef.current, hitPoint, orientation, size);
    const decalMat = new MeshStandardMaterial({
      map: decalTexture,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    });
    const decalMesh = new Mesh(decalGeo, decalMat);
    decalGroupRef.current.add(decalMesh);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas onPointerDown={handleClick}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <OrbitControls />
        <Suspense fallback={null}>
          <group ref={decalGroupRef} />
          <GloveModel color={color} meshRef={gloveRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}