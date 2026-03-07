"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { PiMoonLight, PiSunLight } from "react-icons/pi";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-[18px] h-[18px]" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <PiSunLight size={18} />
      ) : (
        <PiMoonLight size={18} />
      )}
    </button>
  );
}
