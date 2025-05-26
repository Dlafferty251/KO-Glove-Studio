
// DecalTab.tsx
"use client";
import React, { useState, useRef } from "react";
import styles from "../GloveCustomizeUI.module.css";

const presetDecals = [
  "/images/boxinggloves.png",
  "/images/fire.png",
  "/images/reaper.webp",
];

export default function DecalTab({
  decal,
  setDecal,
  addCustomDecal,
}: {
  decal: string;
  setDecal: (d: string) => void;
  addCustomDecal: (d: string) => void;
}) {
  const [customUrl, setCustomUrl] = useState("");
  const [uploadedDecals, setUploadedDecals] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddCustom = () => {
    if (customUrl.trim()) {
      setDecal(customUrl.trim());
      addCustomDecal(customUrl.trim());
      setCustomUrl("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDecal(reader.result);
        addCustomDecal(reader.result);
        setUploadedDecals((prev) => [...prev, reader.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const allDecals = [...presetDecals, ...uploadedDecals];

  return (
    <div>
      <h3>Choose or Upload a Decal</h3>
      <h4 className={styles.decalHeader}>Available Decals</h4>
      <div className={styles.decalGrid}>
        {allDecals.map((img, index) => {
          const fileName = img.split("/").pop()?.split(".")[0];
          const isSelected = decal === img;

          return (
            <div
              key={img}
              className={`${styles.decalItem} ${isSelected ? styles.selected : ""}`}
              onClick={() => setDecal(img)}
            >
              <img src={img} alt={fileName} className={styles.decalImage} />
              <p className={styles.decalLabel}>{fileName}</p>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Paste image URL"
          style={{ width: "80%", marginRight: "0.5rem" }}
        />
        <button onClick={handleAddCustom}>Use</button>

        <div style={{ marginTop: "1rem" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {decal && (
        <div style={{ marginTop: "1rem" }}>
          <p>Current Decal:</p>
          <img
            src={decal}
            alt="selected decal"
            style={{ width: 100, border: "2px solid black" }}
          />
        </div>
      )}
    </div>
  );
}
