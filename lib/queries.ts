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
