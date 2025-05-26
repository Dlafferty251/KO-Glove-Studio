"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import GloveModel from "../../components/GloveModel/GloveModel";
import { Texture, TextureLoader, LinearFilter } from "three";

export default function GloveViewer({
  color,
  text,
  decal,
}: {
  color: string;
  text: string;
  decal: string;
}) {
  const [wrapMode, setWrapMode] = useState(false);
  const [wrapTexture, setWrapTexture] = useState<Texture | null>(null);
  const [decalTexture, setDecalTexture] = useState<Texture | null>(null);
  const [decals, setDecals] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    if (!decal) return;

    const loader = new TextureLoader();
    loader.load(
      decal,
      (loaded) => {
        loaded.flipY = false;
        loaded.generateMipmaps = false;
        loaded.minFilter = LinearFilter;
        loaded.magFilter = LinearFilter;
        console.log("✅ Loaded Decal Texture", loaded);
        setDecalTexture(loaded);
      },
      undefined,
      (err) => {
        console.error("❌ Failed to load decal texture", err);
      }
    );
  }, [decal]);

  useEffect(() => {
    if (wrapMode && decalTexture) {
      setWrapTexture(decalTexture);
    } else {
      setWrapTexture(null);
    }
  }, [wrapMode, decalTexture]);

  const handleAddDecal = () => {
    if (!decalTexture) {
      console.warn("No decal texture loaded.");
      return;
    }

    const newDecal = {
      id: Date.now(),
      texture: decalTexture,
      position: [0, 0.85, 0.1],
      rotation: 0,
      scale: 0.3,
    };

    console.log("🎯 Adding decal:", newDecal);
    setDecals((prev) => [...prev, newDecal]);
    setActiveId(newDecal.id);
  };

  const updateScale = (value: number) => {
    if (activeId === null) return;
    setDecals((prev) =>
      prev.map((d) => (d.id === activeId ? { ...d, scale: value } : d))
    );
  };

  const updateRotation = (value: number) => {
    if (activeId === null) return;
    setDecals((prev) =>
      prev.map((d) => (d.id === activeId ? { ...d, rotation: value } : d))
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas style={{ background: "#111" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <OrbitControls />
        <Suspense fallback={null}>
          <GloveModel
            color={color}
            decals={decals}
            wrapMode={wrapMode}
            wrapTexture={wrapTexture}
            activeDecalId={activeId}
          />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "rgba(0,0,0,0.7)",
          padding: 12,
          borderRadius: 8,
          color: "white",
          zIndex: 999,
        }}
      >
        <button onClick={() => setWrapMode((prev) => !prev)}>
          {wrapMode ? "Disable Wrap Mode" : "Enable Wrap Mode"}
        </button>
        <button
          onClick={handleAddDecal}
          style={{ marginLeft: 10 }}
          disabled={!decalTexture}
        >
          Add Decal
        </button>

        {activeId !== null && (
          <>
            <div>
              <label>Scale:</label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={decals.find((d) => d.id === activeId)?.scale || 0.5}
                onChange={(e) => updateScale(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label>Rotation:</label>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.01}
                value={decals.find((d) => d.id === activeId)?.rotation || 0}
                onChange={(e) => updateRotation(parseFloat(e.target.value))}
              />
            </div>
          </>
        )}

        <div style={{ marginTop: 10 }}>
          Decals Placed: {decals.length} {wrapMode ? "(Wrap mode active)" : ""}
        </div>
      </div>
    </div>
  );
}
