"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ShrinkingImageContainer.module.css";

export default function ShrinkingImageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Once the element's bottom passes above the viewport bottom,
      // start shrinking proportionally
      if (rect.bottom < viewportHeight && rect.bottom > 0) {
        const progress = 1 - rect.bottom / viewportHeight;
        const minScale = 1;
        const newScale = 1 - progress * (1 - minScale);
        setScale(Math.max(minScale, newScale));
      } else {
        setScale(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={styles.stickyWrapper}
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
