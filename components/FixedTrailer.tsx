"use client";
import { useEffect, useState } from "react";

export default function FixedTrailer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsVisible(anyVisible);
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" }, // Trigger when at least 10% of the section is visible
    );

    const sections = document.querySelectorAll(".full-section-trigger");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`hidden md:block fixed bottom-40 right-0 z-50 transition-opacity duration-500 pointer-events-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-white text-[20vw] md:text-[12vw] lg:text-[180px] font-bold tracking-tighter leading-[0.8] select-none italic lg:not-italic">
        TRAILER
      </h2>
    </div>
  );
}
