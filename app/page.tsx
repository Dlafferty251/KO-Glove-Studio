import Link from "next/link";
import HeroBackground from "../components/HeroBackground/HeroBackground";
import styles from "./home.module.css";
import React from 'react';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroBackground />
        <div className={styles.content}>
          <h1 className={styles.title}>🥊 KO Glove Studio</h1>
          <p className={styles.tagline}>
            Custom boxing gloves built by champions—for champions.
          </p>
          <Link href="/customize" className={styles.button}>
            Start Designing
          </Link>
          <div className={styles.scrollHint}>↓ Scroll to Explore</div>
        </div>
      </section>

      {/*  About Section */}
      <section className={`${styles.section} ${styles.about}`}>
        <h2>What We Do</h2>
        <p>
          KO Glove Studio empowers fighters, trainers, and fans to design
          their own high-quality boxing gloves. Our interactive glove customizer
          puts creative control in your hands — literally.
        </p>
        <p>
          From gym rats to pros, we give you the tools to craft gloves
          that reflect your style, your name, your story.
        </p>
      </section>

      {/* Features Section */}
      <section className={`${styles.section} ${styles.features}`}>
        <div className={styles.featureBox}>
          <h3>🎨 Design Studio</h3>
          <p>Customize glove colors, sizes, and upload logos or initials.</p>
        </div>
        <div className={styles.featureBox}>
          <h3>🛒 Seamless Checkout</h3>
          <p>Powered by Square. Fast. Secure. Built for fighters.</p>
        </div>
        <div className={styles.featureBox}>
          <h3>💪 Built for Champions</h3>
          <p>Whether training or competing, rock gloves that hit different.</p>
        </div>
      </section>

      {/*  Legacy Section */}
      <section className={`${styles.section} ${styles.legacy}`}>
        <h2>🥊 The Legacy of the Glove</h2>
        <p className={styles.slogan}>
          We're not just selling gloves — we’re selling <strong>history</strong>,
          <strong> power</strong>, <strong> identity</strong>.
        </p>
        <p>
          Since the days of bare-knuckle brawls, boxing gloves have transformed the sport — 
          protecting fighters, extending careers, and becoming a canvas for identity.
        </p>
        <div className={styles.quotes}>
          <blockquote>
            <p>“Float like a butterfly, sting like a bee.”</p>
            <footer>— Muhammad Ali</footer>
          </blockquote>
          <blockquote>
            <p>“Everyone has a plan until they get punched in the mouth.”</p>
            <footer>— Mike Tyson</footer>
          </blockquote>
          <blockquote>
            <p>“To be a champion, fight one more round.”</p>
            <footer>— James J. Corbett</footer>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
