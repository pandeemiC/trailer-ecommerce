import { getAdminCategories, getAdminSubcategories } from "@/lib/admin/queries";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function CategoriesPage() {
  const categories = await getAdminCategories();
  const subcategories = await getAdminSubcategories();

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Categories
      </h1>

      <CategoryManager
        categories={categories ?? []}
        subcategories={subcategories ?? []}
      />
    </div>
  );
}
