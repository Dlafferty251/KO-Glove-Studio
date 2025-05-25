'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GloveViewer = dynamic(() => import('./GloveViewer'), {
  ssr: false,
  loading: () => <p>Loading Glove Customizer...</p>,
});

export default function CustomizePage() {
  const [color, setColor] = useState('#ff0000');
  const [text, setText] = useState('');
  const [decal, setDecal] = useState('');

  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      <section style={{ flex: 1, padding: '1rem', backgroundColor: '#f4f4f4' }}>
        <h2>Customize Your Glove</h2>

        <label style={{ display: 'block', margin: '1rem 0' }}>
          Choose Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <label style={{ display: 'block', margin: '1rem 0' }}>
          Add Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your name or phrase"
          />
        </label>

        <label style={{ display: 'block', margin: '1rem 0' }}>
          Upload Decal (URL):
          <input
            type="text"
            value={decal}
            onChange={(e) => setDecal(e.target.value)}
            placeholder="Image URL for decal"
          />
        </label>
      </section>

      <section style={{ flex: 2, position: 'relative' }}>
        <GloveViewer color={color} text={text} decal={decal} />
      </section>
    </main>
  );
}
