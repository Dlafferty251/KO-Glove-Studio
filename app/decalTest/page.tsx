'use client';

import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const GloveMesh = dynamic(() => import('./Glove'), { ssr: false });

export default function DecalTestPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
          <GloveMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
