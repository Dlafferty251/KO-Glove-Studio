import Link from "next/link";
import HeroBackground from "../components/HeroBackground/HeroBackground";
import RotatingQuotes from "../components/RotatingQuotes/RotatingQuotes";
import styles from "./home.module.css";
import React from "react";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroBackground />
        <div className={styles.content}>
          <h1 className={styles.title}> KO Glove Studio</h1>
          <p className={styles.tagline}>
            Custom boxing gloves built by champions—for champions.
          </p>
          <Link href="/customize" className={styles.button}>
            Start Designing
          </Link>
          <div className={styles.scrollHint}>↓ Scroll to Explore</div>
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Why KO Glove Studio?</h2>

      <section className={styles.splitSection}>
        {/* LEFT SIDE — About */}
        <div className={styles.leftPane}>
          <h2>What We Do</h2>
          <p>
            At KO Glove Studio, you're not just designing boxing gloves — you're
            crafting an extension of your spirit. Every stitch tells a story.
            Every color, a statement. Every glove, a legacy in motion.
          </p>
          <p>
            Whether you're stepping into the ring or repping your roots outside
            of it, we give you the tools to build gear that speaks your name
            before the bell even rings. From first-time fighters to seasoned
            champions — your style. Your identity. Your gloves.
          </p>
        </div>

        {/* RIGHT SIDE — Features + Quotes */}
        <div className={styles.rightPane}>
          <div className={styles.featureGrid}>
            <div className={styles.card}>
              <h3>🎨 Design Studio</h3>
              <p>
                Customize glove colors, sizes, and upload logos or initials.
              </p>
            </div>
            <div className={styles.card}>
              <h3>🛒 Seamless Checkout</h3>
              <p>Powered by Square. Fast. Secure. Built for fighters.</p>
            </div>
            <div className={styles.card}>
              <h3>💪 Built for Champions</h3>
              <p>
                Whether training or competing, rock gloves that hit different.
              </p>
            </div>

            <div className={styles.card}>
              <h3>📦 Fast Fulfillment</h3>
              <p>
                Gloves built and shipped within days — no long waits, no
                excuses.
              </p>
            </div>
          </div>

          <RotatingQuotes />
        </div>
      </section>
    </main>
  );
}
