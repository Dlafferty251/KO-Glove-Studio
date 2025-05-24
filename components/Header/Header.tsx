"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/koglovestudio.png"
          alt="KO Glove Studio"
          width={50}
          height={50}
        />
        <span>KO Glove Studio</span>
      </Link>
      <nav className={styles.links}>
        <Link href="/customize">Customize</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
