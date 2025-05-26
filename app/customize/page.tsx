"use client";
import dynamic from "next/dynamic";
import GloveCustomizerUI from "../../components/GloveCustomizeUI/GloveCustomizerUI";
import { useState } from "react";

const GloveViewer = dynamic(() => import("./GloveViewer"), {
  ssr: false,
  loading: () => <p>Loading Glove Customizer...</p>,
});

export default function CustomizePage() {
  const [color, setColor] = useState("#ff0000");
  const [text, setText] = useState("");
  const [decal, setDecal] = useState("");

  return (
    <main style={{ display: "flex", height: "100vh" }}>
      <section style={{ flex: 1, padding: "1rem", backgroundColor: "#f4f4f4" }}>
        <h2>Customize Your Glove</h2>

        <GloveCustomizerUI
          color={color}
          text={text}
          decal={decal}
          setColor={setColor}
          setText={setText}
          setDecal={setDecal}
        />
      </section>

      <section style={{ flex: 2, position: "relative" }}>
        <GloveViewer color={color} text={text} decal={decal} />
      </section>
    </main>
  );
}
