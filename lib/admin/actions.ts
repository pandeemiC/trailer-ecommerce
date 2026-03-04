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
  await supabase.from("product_images").delete().eq("product_id", productId);

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

export async function createCategory(name: string, image: string | null) {
  const supabase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .insert({ name, slug, image });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function updateCategory(
  id: string,
  name: string,
  image: string | null,
) {
  const supabase = await verifyAdmin();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .update({ name, slug, image })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/");
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

//           //
//  CONTENT  //
//           //

export async function createSection(formData: {
  section_type: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  images: {
    url: string;
    alt: string;
    href: string;
    position: number;
    text_side: string | null;
  }[];
}) {
  const supabase = await verifyAdmin();

  const { count } = await supabase
    .from("homepage_sections")
    .select("*", { count: "exact", head: true });

  const { data: section, error } = await supabase
    .from("homepage_sections")
    .insert({
      section_type: formData.section_type,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      position: (count ?? 0) + 1,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // inserting images
  if (formData.images.length > 0) {
    const { error: imgError } = await supabase
      .from("homepage_section_images")
      .insert(
        formData.images.map((img) => ({
          section_id: section.id,
          url: img.url,
          alt: img.alt,
          href: img.href,
          position: img.position,
          text_side: img.text_side,
        })),
      );
    if (imgError) throw new Error(imgError.message);
  }

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}

export async function updateSection(
  sectionId: string,
  formData: {
    section_type: string;
    title: string | null;
    subtitle: string | null;
    description: string | null;
    images: {
      url: string;
      alt: string;
      href: string;
      position: number;
      text_side: string | null;
    }[];
  },
) {
  const supabase = await verifyAdmin();

  const { error } = await supabase
    .from("homepage_sections")
    .update({
      section_type: formData.section_type,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
    })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);

  // deleting and reinserting
  await supabase
    .from("homepage_section_images")
    .delete()
    .eq("section_id", sectionId);

  if (formData.images.length > 0) {
    const { error: imgError } = await supabase
      .from("homepage_section_images")
      .insert(
        formData.images.map((img) => ({
          section_id: sectionId,
          url: img.url,
          alt: img.alt,
          href: img.href,
          position: img.position,
          text_side: img.text_side,
        })),
      );
    if (imgError) throw new Error(imgError.message);
  }

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSection(sectionId: string) {
  const supabase = await verifyAdmin();
  // supabase cascade delete function
  const { error } = await supabase
    .from("homepage_sections")
    .delete()
    .eq("id", sectionId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}

export async function reorderSection(sectionId: string, newPosition: number) {
  const supabase = await verifyAdmin();

  const { error } = await supabase
    .from("homepage_sections")
    .update({ position: newPosition })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}
