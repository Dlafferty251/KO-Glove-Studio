"use client";
import React from "react";

export default function StyleTab({
  style,
  setStyle,
}: {
  style: string;
  setStyle: (s: string) => void;
}) {
  return (
    <div>
      <h3>Choose Glove Style</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {["boxing", "mma"].map((type) => (
          <button
            key={type}
            onClick={() => setStyle(type)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: style === type ? "#222" : "#ccc",
              color: style === type ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
      <p style={{ marginTop: "1rem" }}>
        <em>
          {style === "mma"
            ? "Lightweight MMA glove with open fingers."
            : "Traditional boxing glove with full padding."}
        </em>
      </p>
    </div>
  );
}
