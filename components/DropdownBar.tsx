"use client";

import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import FilterDropdown from "@/components/FilterDropdown";
import SortDropdown from "@/components/SortDropdown";
import SearchPageInput from "@/components/SearchPageInput";
import { Subcategory, Category } from "@/lib/types";

export default function DropdownBar({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  function handleToggle(name: string) {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }

  return (
    <div className="flex items-center gap-3 mb-10">
      <SearchPageInput />
      <CategoryFilter
        categories={categories}
        isOpen={activeDropdown === "category"}
        onToggle={() => handleToggle("category")}
      />
      {subcategories.length > 0 && (
        <FilterDropdown
          subcategories={subcategories}
          isOpen={activeDropdown === "filter"}
          onToggle={() => handleToggle("filter")}
        />
      )}
      <SortDropdown
        isOpen={activeDropdown === "sort"}
        onToggle={() => handleToggle("sort")}
      />
    </div>
  );
}
