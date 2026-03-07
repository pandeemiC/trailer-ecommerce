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
      className={`fixed z-20 bg-white/90 backdrop-blur-sm transition-opacity duration-300
        top-[48px] md:top-[7vh] left-0 md:left-auto right-0 w-full md:w-auto
        flex items-center justify-evenly md:justify-end gap-4 md:gap-6
        h-[44px] md:h-[5vh] px-4 md:pr-8 md:pl-3 md:rounded-md overflow-x-auto ${
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
            className="text-[10px] md:text-[11px] font-light tracking-wider md:tracking-widest uppercase hover:border-b border-black transition-all duration-100 whitespace-nowrap shrink-0"
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
