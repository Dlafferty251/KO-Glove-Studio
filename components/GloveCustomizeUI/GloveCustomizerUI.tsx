'use client';
import React, { useState } from 'react';
import styles from './GloveCustomizeUI.module.css';
import ColorTab from './tabs/ColorTab';
import TextTab from './tabs/TextTab';
import DecalTab from './tabs/DecalTab';

interface Props {
  color: string;
  text: string;
  decal: string;
  setColor: (c: string) => void;
  setText: (t: string) => void;
  setDecal: (d: string) => void;
}

export default function GloveCustomizerUI({
  color,
  text,
  decal,
  setColor,
  setText,
  setDecal,
}: Props) {
  const [activeTab, setActiveTab] = useState<'color' | 'text' | 'decal'>('color');

  return (
    <div className={styles.wrapper}>
      <nav className={styles.tabNav}>
        {['color', 'text', 'decal'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={activeTab === tab ? styles.activeTab : styles.inactiveTab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {activeTab === 'color' && <ColorTab color={color} setColor={setColor} />}
      {activeTab === 'text' && <TextTab text={text} setText={setText} />}
      {activeTab === 'decal' && <DecalTab decal={decal} setDecal={setDecal} />}
    </div>
  );
}
