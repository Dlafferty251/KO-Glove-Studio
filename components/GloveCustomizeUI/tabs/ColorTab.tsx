'use client';
import React, { useState } from 'react';
import styles from '../GloveCustomizeUI.module.css';

const presetColors = ['#ff0000', '#000000', '#ffffff', '#007bff', '#00c851', '#ffbb33', '#ff4444'];

export default function ColorTab({ color, setColor }: { color: string; setColor: (c: string) => void }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (hex: string) => {
    setFavorites((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );
  };

  return (
    <div>
      <h3>Choose Glove Color</h3>
      <div className={styles.colorGrid}>
        {presetColors.map((preset) => (
          <div
            key={preset}
            onClick={() => setColor(preset)}
            className={styles.colorSwatch}
            style={{
              backgroundColor: preset,
              border: preset === color ? '3px solid #000' : '1px solid #aaa',
            }}
            title={preset}
          />
        ))}
      </div>

      <label className={styles.customColorLabel}>
        Custom Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <div className={styles.favoriteButtonWrapper}>
        <button onClick={() => toggleFavorite(color)}>
          {favorites.includes(color) ? '★ Remove Favorite' : '☆ Save Favorite'}
        </button>
      </div>

      {favorites.length > 0 && (
        <div className={styles.favoritesWrapper}>
          <h4>Favorite Colors</h4>
          <div className={styles.colorGrid}>
            {favorites.map((fav) => (
              <div
                key={fav}
                onClick={() => setColor(fav)}
                className={styles.colorSwatch}
                style={{
                  backgroundColor: fav,
                  border: fav === color ? '3px solid #000' : '1px solid #aaa',
                }}
                title={fav}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
