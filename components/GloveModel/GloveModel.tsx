"use client";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Decal } from "@react-three/drei";
import {
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  Group,
  Euler,
  Texture,
} from "three";

export default function GloveModel({
  color,
  text,
  decal,
}: {
  color: string;
  text: string;
  decal: string;
}) {
  const group = useRef<Group>(null);
  const { nodes } = useGLTF("/models/boxing_gloves.glb") as any;

  const mesh = nodes.Boxing_Glove as Mesh;

  const [material, setMaterial] = useState<MeshStandardMaterial | null>(null);
  const [decalTexture, setDecalTexture] = useState<Texture | null>(null);

  // Load the decal texture when decal path changes
  useEffect(() => {
    if (!decal) return;
    const loader = new TextureLoader();
    loader.load(decal, (loaded) => {
      setDecalTexture(loaded);
    });
  }, [decal]);

  // Assign glove material
  useEffect(() => {
    if (!mesh || material) return;
    const baseMaterial = new MeshStandardMaterial({ color });
    baseMaterial.wireframe = true; // See through glove for now
    mesh.material = baseMaterial;
    setMaterial(baseMaterial);
  }, [mesh, material]);

  // React to color changes
  useEffect(() => {
    if (material) material.color.set(color);
  }, [color, material]);

  // Debug UVs exist
  useEffect(() => {
    console.log("🔍 GLB Nodes:", nodes);
    console.log("🧪 UVs exist?:", !!mesh.geometry.attributes.uv);
  }, [nodes]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  if (!mesh) return null;

  return (
    <group ref={group} scale={0.25} position={[0, -1, 0]}>
      {/* Glove */}
      <mesh geometry={mesh.geometry} material={mesh.material} key={decal}>
        {decalTexture && (
          <Decal
            map={decalTexture}
            position={[0, 0.2, 0]}
            rotation={new Euler(0, 0, 0)}
            scale={[5, 5, 5]}
            debug
          />
        )}
      </mesh>

      {/* Debug Sphere with Decal (side view) */}
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="green" wireframe />
        {decalTexture && (
          <Decal
            map={decalTexture}
            position={[0, 0, 1]}
            rotation={new Euler(0, 0, 0)}
            scale={0.5}
          />
        )}
      </mesh>
    </group>
  );
}
