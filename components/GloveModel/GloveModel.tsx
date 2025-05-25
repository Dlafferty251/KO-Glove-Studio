"use client";
import { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, MeshStandardMaterial, TextureLoader, Mesh } from "three";

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
  const gltf = useLoader(GLTFLoader, "/models/boxing_gloves.glb");
  const texture = decal ? useLoader(TextureLoader, decal) : null;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const material = new MeshStandardMaterial({ color });
        if (texture) {
          material.map = texture;
        }
        mesh.material = material;
      }
    });
  }, [gltf, color, texture]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={gltf.scene} scale={0.25} position={[0, -1, 0]} />
    </group>
  );
}
