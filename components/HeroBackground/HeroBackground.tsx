"use client";

import { useEffect, useState } from "react";
import styles from "./HeroBackground.module.css";

const gifs = [
  "../../images/gifs/floydGif.gif",
  "../../images/gifs/Knockout.gif",
  "../../images/gifs/muhammad.webp",
  "../../images/gifs/oldschool.gif",
  "../../images/gifs/tyson.gif",
];

export default function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % gifs.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.background}>
      <img src={gifs[index]} alt="Boxing scene" className={styles.image} />
      <div className={styles.overlay}></div>
    </div>
  );
}
