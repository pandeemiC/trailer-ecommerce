"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { sortOptions } from "@/lib/navigationData";

export default function SortDropdown({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
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
        Sort
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-white border border-black/10 z-50 min-w-[200px]">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`block w-full text-left px-4 py-3 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black/5 transition-colors
            ${currentSort === option.value ? "text-black" : "text-black/50"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
