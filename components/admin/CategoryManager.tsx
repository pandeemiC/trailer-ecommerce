"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Subcategory } from "@/lib/types";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "@/lib/admin/actions";

import { PiPencilSimpleLight, PiTrashLight } from "react-icons/pi";

interface CategoryManagerProps {
  categories: Category[];
  subcategories: Subcategory[];
}

export default function CategoryManager({
  categories,
  subcategories,
}: CategoryManagerProps) {
  const router = useRouter();

  // states
  return <div>CategoryManager</div>;
}
