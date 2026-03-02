import { getAdminCategories, getAdminSubcategories } from "@/lib/admin/queries";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getAdminCategories();
  const subcategories = await getAdminSubcategories();
  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Add Product
      </h1>
      <ProductForm
        categories={categories ?? []}
        subcategories={subcategories ?? []}
      />
    </div>
  );
}
