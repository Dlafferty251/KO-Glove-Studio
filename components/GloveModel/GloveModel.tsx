"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Decal } from "@react-three/drei";
import {
  Texture,
  Mesh,
  MeshStandardMaterial,
  Group,
  Euler,
  Vector3,
} from "three";

export interface DecalData {
  id: number;
  texture: Texture;
  position: [number, number, number];
  rotation: number;
  scale: number;
}

export default function GloveModel({
  color,
  decals,
  wrapMode,
  wrapTexture,
  activeDecalId,
}: {
  color: string;
  decals: DecalData[];
  wrapMode: boolean;
  wrapTexture: Texture | null;
  activeDecalId: number | null;
}) {
  const group = useRef<Group>(null);
  const { nodes } = useGLTF("/models/boxing_gloves.glb") as any;
  const mesh = nodes?.Boxing_Glove as Mesh;

  useEffect(() => {
    if (!mesh) return;

    const mat = new MeshStandardMaterial({
      color,
      map: wrapMode ? wrapTexture : null,
    });

    mat.needsUpdate = true;
    mesh.material = mat;
  }, [color, wrapMode, wrapTexture]);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.005;
  });

  if (!mesh) return null;

  return (
    <group ref={group} scale={0.8} position={[0, 0.6, 0.7]}>
      <mesh geometry={mesh.geometry} material={mesh.material}>
        {!wrapMode &&
          decals.map((decal) => (
            <Decal
              key={`${decal.id}-${decal.rotation}-${decal.scale}`}
              map={decal.texture}
              position={new Vector3(...decal.position)}
              rotation={new Euler(0, 0, decal.rotation)}
              scale={decal.scale}
              depthTest
              depthWrite={false}
              polygonOffset
              polygonOffsetFactor={-10}
              transparent
            />
          ))}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/boxing_gloves.glb");
