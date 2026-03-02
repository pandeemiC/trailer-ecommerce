import {
  getAdminProductsById,
  getAdminCategories,
  getAdminSubcategories,
} from "@/lib/admin/queries";

import ProductForm from "@/components/admin/ProductForm";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductsById(id);
  const categories = await getAdminCategories();
  const subcategories = await getAdminSubcategories();

  if (product) {
    redirect("/admin/products");
  }
  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Edit Product
      </h1>
      <ProductForm
        product={product}
        categories={categories ?? []}
        subcategories={subcategories ?? []}
      />
    </div>
  );
}
