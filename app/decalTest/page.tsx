'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Scene = dynamic(() => import('./Glove'), {
  ssr: false,
});

export default function DecalTestPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#111' }}>
      <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
        <Scene />
      </Suspense>
    </div>
  );
}
