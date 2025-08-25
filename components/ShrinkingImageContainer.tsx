"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ShrinkingImageContainer.module.css";

const useIntersectionObserver = (
  options: IntersectionObserverInit
): [(node: HTMLElement | null) => void, IntersectionObserverEntry | null] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

export default function ShrinkingImageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  const threshold = Array.from(Array(101).keys(), (i) => i / 100);
  const [setNode, entry] = useIntersectionObserver({ threshold });

  useEffect(() => {
    if (!entry) return;

    const triggerPercent = 100;
    const minScale = 0.5;

    const hiScale = 1; // Not used, but could be useful for future adjustments
    const loScale = minScale; // Not used, but could be useful for future adjustments

    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * (triggerPercent / 100);

    const elementBottom = entry.boundingClientRect.bottom;
    const animationRange = triggerPoint;

    const progress = (triggerPoint - elementBottom) / animationRange;

    const clampedProgress = Math.max(0, Math.min(progress, 1));
    const newScale = 1 - clampedProgress * (1 - minScale);
    setScale(newScale);
  }, [entry]);

  return (
    <div ref={setNode} className={styles.container}>
      <div
        className={styles.stickyWrapper}
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
