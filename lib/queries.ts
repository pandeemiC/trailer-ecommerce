import { supabase } from "@/lib/supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Failed to fetch categories: ", error.message);
    return null;
  }
  return data;
}

export async function getSubCategories(categoryId: string) {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error("Failed to fetch SubCategories: ", error.message);
    return null;
  }

  return data;
}

export async function getProducts(categoryId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error("Failed to fetch Products: ", error.message);
    return null;
  }

  return data;
}

export async function getProductsBySubcategory(subcategoryId: string) {
  const { data, error } = await supabase
    .from("product_subcategories")
    .select("products(*)")
    .eq("subcategory_id", subcategoryId);

  if (error) {
    console.error("Failed to fetch Subcategories: ", error.message);
    return null;
  }

  return data;
}
