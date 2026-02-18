import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";

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

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Failed to fetch category by slug: ", error.message);
    return null;
  }
  return data;
}

export async function getSubcategoryBySlug(slug: string, categoryId: string) {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("slug", slug)
    .eq("category_id", categoryId)
    .single();

  if (error) {
    console.error("Failed to fetch subcategory by slug: ", error.message);
    return null;
  }
  return data;
}

export async function getProductsWithImages(
  subcategoryId: string,
): Promise<Product[] | null> {
  const { data, error } = await supabase
    .from("product_subcategories")
    .select("products(*, product_images(*))")
    .eq("subcategory_id", subcategoryId)
    .returns<{ products: Product }[]>();

  if (error) {
    console.error("Failed to fetch products with images: ", error.message);
    return null;
  }
  return data.map((item) => item.products);
}

export async function getProductById(productId: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Failed to fetch product by id: ", error.message);
    return null;
  }
  return data as Product;
}
