'use client';

import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Decal,
  Environment,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { useState, useRef } from 'react';

export default function GloveScene() {
  // Shared control state (top-level so Controls & GloveMesh can both use)
  const [scale, setScale] = useState(0.5);
  const [rotation, setRotation] = useState(0); // in radians

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="studio" />
        <GloveMesh scale={scale} rotation={rotation} />
        <OrbitControls />
      </Canvas>
      <Controls
        scale={scale}
        setScale={setScale}
        rotation={rotation}
        setRotation={setRotation}
      />
    </>
  );
}

function GloveMesh({
  scale,
  rotation,
}: {
  scale: number;
  rotation: number;
}) {
  const texture = useTexture('/images/boxinggloves.png');
  const meshRef = useRef<THREE.Mesh>(null);
  const [decals, setDecals] = useState<
    {
      position: THREE.Vector3;
      rotation: [number, number, number];
      scale: number;
    }[]
  >([]);
  const [preview, setPreview] = useState<THREE.Vector3 | null>(null);

  const { camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const updatePreview = (e: React.PointerEvent<HTMLCanvasElement>) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(meshRef.current!);
    if (intersects.length > 0) {
      setPreview(intersects[0].point.clone());
    } else {
      setPreview(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    updatePreview(e);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    updatePreview(e);

    if (preview) {
      setDecals((prev) => [
        ...prev,
        {
          position: preview.clone(),
          rotation: [0, 0, rotation],
          scale: scale,
        },
      ]);
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      geometry={new THREE.IcosahedronGeometry(1.5, 1)}
      material={new THREE.MeshStandardMaterial({ color: '#ccc' })}
    >
      {/* Placed decals */}
      {decals.map((decal, i) => (
        <Decal
          key={i}
          position={decal.position}
          rotation={decal.rotation}
          scale={decal.scale}
          map={texture}
          transparent
          depthTest
          depthWrite={false}
        />
      ))}

      {/* Preview decal */}
      {preview && (
        <Decal
          position={preview}
          rotation={[0, 0, rotation]}
          scale={scale}
          map={texture}
          transparent
          opacity={0.4}
          depthTest
          depthWrite={false}
        />
      )}
    </mesh>
  );
}

function Controls({
  scale,
  setScale,
  rotation,
  setRotation,
}: {
  scale: number;
  setScale: (value: number) => void;
  rotation: number;
  setRotation: (value: number) => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#222',
        color: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        zIndex: 10,
      }}
    >
      <div>
        <label>
          <strong>Size:</strong> {scale.toFixed(2)}
          <br />
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          <strong>Rotation:</strong> {Math.round((rotation * 180) / Math.PI)}°
          <br />
          <input
            type="range"
            min="0"
            max={(2 * Math.PI).toFixed(2)}
            step="0.1"
            value={rotation}
            onChange={(e) => setRotation(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
