"use client";

import { useEffect, useState } from "react";
import styles from "./RotatingQuotes.module.css";

const quotes = [
  {
    text: "Float like a butterfly, sting like a bee.",
    author: "Muhammad Ali",
  },
  {
    text: "Everyone has a plan until they get punched in the mouth.",
    author: "Mike Tyson",
  },
  {
    text: "To be a champion, fight one more round.",
    author: "James J. Corbett",
  },
  {
    text: "It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward.",
    author: "Rocky Balboa",
  },
];

export default function RotatingQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div key={index} className={styles.quoteBox}>
      <p className={styles.text}>"{quote.text}"</p>
      <span className={styles.author}>— {quote.author}</span>
    </div>
  );
}
