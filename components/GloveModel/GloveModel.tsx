// GloveModel.tsx
"use client";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";

export default function GloveModel({
  color,
  meshRef,
}: {
  color: string;
  meshRef: React.MutableRefObject<Mesh | null>;
}) {
  const { nodes } = useGLTF("/models/boxing_gloves.glb") as any;
  const mesh = nodes?.Boxing_Glove as Mesh;

  useEffect(() => {
    if (mesh) {
      if (mesh.material instanceof MeshStandardMaterial) {
        mesh.material.color.set(color);
      } else {
        mesh.material = new MeshStandardMaterial({ color });
      }
      mesh.name = "Boxing_Glove";
      meshRef.current = mesh;
      console.log("🧤 Available nodes:", nodes);
    }
  }, [mesh, color]);

  if (!mesh) return null;
  return <primitive object={mesh} />;
}
