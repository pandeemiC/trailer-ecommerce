import { createClient } from "@/lib/supabase/server";
import { ProductWithSubcategories } from "../types";
import { supabase } from "../supabase";

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

export async function getAdminProductsById(
  productId: string,
): Promise<ProductWithSubcategories | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, product_images(*), product_subcategories(subcategory_id), categories(name)",
    )
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Failed to fetch product: ", error.message);
    return null;
  }

  return data as ProductWithSubcategories;
}

export async function getAdminCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Failed to fetch categories: ", error.message);
    return null;
  }
  return data;
}

export async function getAdminSubcategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Failed to fetch subcategories: ", error.message);
    return null;
  }

  return data;
}

export async function getRecentProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*), categories(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Faled to fetch recent products: ", error.message);
    return null;
  }

  return data;
}
