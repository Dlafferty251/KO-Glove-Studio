"use client";

import {
  useGLTF,
  Decal,
  useTexture,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";

const GLOVE_MODEL_PATH = "/models/boxing_gloves.glb";
const DECAL_IMAGE = "/images/fire.png"; // ✅ Make sure this is in public/images

export default function GloveMesh() {
  const { nodes } = useGLTF(GLOVE_MODEL_PATH) as any;
  const gloveGroupRef = useRef<Group>(null);
  const [previewPos, setPreviewPos] = useState<Vector3 | null>(null);
  const [decalPos, setDecalPos] = useState<Vector3 | null>(null);
  const decalTexture = useTexture(DECAL_IMAGE);

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    const point = e.point;
    if (point) setPreviewPos(point.clone());
  };

  const handleClick = () => {
    if (previewPos) {
      console.log("✅ PLACING AT:", previewPos.toArray());
      setDecalPos(previewPos.clone());
    }
  };

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <Environment preset="studio" />

      <group
        ref={gloveGroupRef}
        dispose={null}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        scale={[5, 5, 5]} // 🔍 Zoomed in for detail
      >
        <mesh
          geometry={nodes["Boxing_Glove_1_3"].geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="white" />

          {/* Placed decal */}
          {decalPos && (
            <Decal
              position={decalPos}
              rotation={[0, 0, 0]}
              scale={[0.15, 0.15, 0.15]}
              map={decalTexture}
              transparent
            />
          )}

          {/* Hover preview decal */}
          {previewPos && (
            <Decal
              position={previewPos}
              rotation={[0, 0, 0]}
              scale={[0.15, 0.15, 0.15]}
              map={decalTexture}
              depthTest={false}
              polygonOffset
              polygonOffsetFactor={-10}
              transparent
            />
          )}
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload(GLOVE_MODEL_PATH);
