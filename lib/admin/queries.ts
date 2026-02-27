import { createClient } from "@/lib/supabase/server";
import { ProductWithSubcategories } from "../types";

export async function getAdminStats() {
  const supabase = await createClient();

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: categoryCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: subCategoryCount } = await supabase
    .from("subcategories")
    .select("*", { count: "exact", head: true });

  return {
    productCount: productCount ?? 0,
    categoryCount: categoryCount ?? 0,
    subCategoryCount: subCategoryCount ?? 0,
  };
}

export async function getAdminProducts(): Promise<
  ProductWithSubcategories[] | null
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, product_images(*), products_subcategories(subcategory_id), categories(name)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch admin products: ", error.message);
    return null;
  }

  return data as ProductWithSubcategories[];
}
