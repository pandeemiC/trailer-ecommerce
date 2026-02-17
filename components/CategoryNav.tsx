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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-[7vh] right-0 z-20 flex items-center rounded-md gap-6 h-[5vh] pr-8 pl-3 bg-white/90 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
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
