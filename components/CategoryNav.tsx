"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type NavLink = {
  title: string;
  href: string;
};

export default function CategoryNav({
  links,
  basePath,
}: {
  links: readonly NavLink[];
  basePath: string;
}) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track if user has scrolled past the top area
      setScrolled(currentScrollY > 100);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN past 100px → hide
        setVisible(false);
      } else {
        // Scrolling UP → show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-[10vh] right-0 z-20 flex items-center gap-6 h-[5vh] pr-8 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled && visible ? "bg-white/90 backdrop-blur-sm w-full" : ""}`}
    >
      {links.map((link) => {
        const fullHref = link.href
          ? `${basePath}${link.href.startsWith("/") ? "" : "/"}${link.href}`
          : basePath;

        return (
          <Link
            key={link.title}
            href={fullHref}
            className="text-[11px] font-light tracking-widest uppercase hover:border-b border-black transition-all duration-100"
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
