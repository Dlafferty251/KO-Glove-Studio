'use client';
import React from 'react';
import styles from '../GloveCustomizeUI.module.css';

const presetDecals = [
  "/images/star.png",
  "/images/ko-logo.png",
  "/images/flame.png"
];

export default function DecalTab({ decal, setDecal }: { decal: string; setDecal: (d: string) => void }) {
  return (
    <div>
      <h3>Upload Decal (Image URL)</h3>
      <input
        type="text"
        value={decal}
        onChange={(e) => setDecal(e.target.value)}
        placeholder="Image URL for decal"
      />

      <h4 className={styles.decalHeader}>Preset Decals</h4>
      <div className={styles.decalGrid}>
        {presetDecals.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setDecal(img)}
            alt="preset decal"
            className={styles.decalImage}
            style={{ border: decal === img ? '2px solid #000' : '1px solid #aaa' }}
          />
        ))}
      </div>
    </div>
  );
}
