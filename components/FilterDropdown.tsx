"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Subcategory } from "@/lib/types";

export default function FilterDropdown({
  subcategories,
  isOpen,
  onToggle,
}: {
  subcategories: Subcategory[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("subcategory") ?? "";

  function handleFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("subcategory", slug);
    } else {
      params.delete("subcategory");
    }
    router.push(`?${params.toString()}`);
    onToggle();
  }
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="border border-black/15 px-5 py-2.5 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
      >
        Filter
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-black/10 z-50 min-w-[200px]">
          <button
            onClick={() => handleFilter("")}
            className={`block w-full text-left px-4 py-3 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black/5 transition-colors ${
              currentFilter === "" ? "text-black" : "text-black/50"
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleFilter(sub.slug)}
              className={`block w-full text-left px-4 py-3 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black/5 transition-colors ${
                currentFilter === sub.slug ? "text-black" : "text-black/50"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
