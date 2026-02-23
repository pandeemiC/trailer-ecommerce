"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ViewAllSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (input) {
        params.set("search", input);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [input, router, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search products"
      className="flex-1 border-b border-black/15 px-4 py-2.5 text-[11px] font-light tracking-widest uppercase outline-none placeholder:text-black/40"
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
