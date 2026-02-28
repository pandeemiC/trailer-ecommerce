"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

//verification for admin

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!admin) throw new Error("Not authorized");

  return supabase;
}

//                 //
// PRODUCT ACTIONS //
//                 //

export async function createProduct(formData: {
  name: string;
  price: number;
  description: string;
  category_id: string;
  featured_type: string | null;
  image: string;
  subcategory_ids: string[];
  gallery_images: { url: string; image_type: string; position: number }[];
}) {
  const supabase = await verifyAdmin();

  // inserting product
  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: formData.name,
      price: formData.price,
      description: formData.description,
      category_id: formData.category_id,
      featured_type: formData.featured_type || null,
      image: formData.image,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // inserting product image
  if (formData.gallery_images.length > 0) {
    const { error: imgError } = await supabase.from("product_images").insert(
      formData.gallery_images.map((img) => ({
        product_id: product.id,
        url: img.url,
        image_type: img.image_type,
        position: img.position,
      })),
    );
    if (imgError) throw new Error(imgError.message);
  }

  // Insert product subacategory respective product
  if (formData.subcategory_ids.length > 0) {
    const { error: subCatError } = await supabase
      .from("product_subcategories")
      .insert(
        formData.subcategory_ids.map((sid) => ({
          product_id: product.id,
          subcategory_id: sid,
        })),
      );
    if (subCatError) throw new Error(subCatError.message);
  }

  revalidatePath("/admin/products");
  return { success: true, productId: product.id };
}

// updating product
export async function updateProduct(
  productId: string,
  formData: {
    name: string;
    price: number;
    description: string;
    category_id: string;
    featured_type: string | null;
    image: string;
    subcategory_ids: string[];
    gallery_images: { url: string; image_type: string; position: number }[];
  },
) {
  const supabase = await verifyAdmin();

  // update product row
  const { error } = await supabase
    .from("products")
    .update({
      name: formData.name,
      price: formData.price,
      description: formData.description,
      category_id: formData.category_id,
      featured_type: formData.featured_type || null,
      image: formData.image,
    })
    .eq("id", productId);

  if (error) throw new Error(error.message);

  // replacement of current images
  await supabase.from("prouct_images").delete().eq("product_id", productId);

  if (formData.gallery_images.length > 0) {
    const { error: imgError } = await supabase.from("product_images").insert(
      formData.gallery_images.map((img) => ({
        product_id: productId,
        url: img.url,
        image_type: img.image_type,
        position: img.position,
      })),
    );
    if (imgError) throw new Error(imgError.message);
  }

  // replace subcategory or new
  await supabase
    .from("product_subcategories")
    .delete()
    .eq("product_id", productId);

  if (formData.subcategory_ids.length > 0) {
    const { error: subCatError } = await supabase
      .from("product_subcategories")
      .insert(
        formData.subcategory_ids.map((sid) => ({
          product_id: productId,
          subcategory_id: sid,
        })),
      );
    if (subCatError) throw new Error(subCatError.message);
  }

  revalidatePath("/admin/products");
  return { success: true };
}
// delete related rows or the product
export async function deleteProduct(productId: string) {
  const supabase = await verifyAdmin();

  await supabase
    .from("product_subcategories")
    .delete()
    .eq("product_id", productId);
  await supabase.from("product_images").delete().eq("product_id", productId);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  return { success: true };
}

//             //
// CAT ACTIONS //
//             //

export async function createCategory(name: string) {
  const supbase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supbase.from("categories").insert({ name, slug });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function updateCategory(id: string, name: string) {
  const supabase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .update({ name, slug })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const supabase = await verifyAdmin();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}

//        //
// SUBCAT //
//        //

export async function createSubcategory(name: string, categoryId: string) {
  const supabase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("subcategories")
    .insert({ name, slug, category_id: categoryId });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function updateSubcategory(id: string, name: string) {
  const supabase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("subcategories")
    .update({ name, slug })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteSubcategory(id: string) {
  const supabase = await verifyAdmin();

  const { error } = await supabase.from("subcategories").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  return { success: true };
}
