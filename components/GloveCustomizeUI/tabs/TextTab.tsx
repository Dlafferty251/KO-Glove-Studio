"use client";
import React from "react";
import styles from "../GloveCustomizeUI.module.css";

export default function TextTab({
  text,
  setText,
}: {
  text: string;
  setText: (t: string) => void;
}) {
  return (
    <div>
      <h3>Add Text</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your name or phrase"
      />
    </div>
  );
}
