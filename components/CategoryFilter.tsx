"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Category } from "@/lib/types";

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentCategory = searchParams.get("category") ?? "";

  function handleCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    // Clear subcategory when category changes
    params.delete("subcategory");
    router.push(`/search?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border border-black/15 px-5 py-2.5 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
      >
        {currentCategory || "Category"}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-black/10 z-50 min-w-[200px]">
          <button
            onClick={() => handleCategory("")}
            className={`block w-full text-left px-4 py-3 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black/5 transition-colors ${
              currentCategory === "" ? "text-black" : "text-black/50"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.slug)}
              className={`block w-full text-left px-4 py-3 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black/5 transition-colors ${
                currentCategory === cat.slug ? "text-black" : "text-black/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
