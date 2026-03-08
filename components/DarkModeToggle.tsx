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

  if (!mounted) return <div className="w-[18px] h-[18px] 2xl:w-[22px] 2xl:h-[22px] min-[2560px]:w-[26px] min-[2560px]:h-[26px]" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer [&_svg]:w-[18px] [&_svg]:h-[18px] 2xl:[&_svg]:w-[22px] 2xl:[&_svg]:h-[22px] min-[2560px]:[&_svg]:w-[26px] min-[2560px]:[&_svg]:h-[26px]"
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
