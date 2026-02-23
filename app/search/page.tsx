import SortDropdown from "@/components/SortDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import SearchPageInput from "@/components/SearchPageInput";
import CategoryFilter from "@/components/CategoryFilter";
import {
  searchProducts,
  getCategories,
  getCategoryBySlug,
  getSubCategories,
} from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const { q, sort, category, subcategory } = await searchParams;
  const products = (await searchProducts(q, sort, category, subcategory)) ?? [];
  const categories = (await getCategories()) ?? [];

  // fetching only subcata's if category is selected
  let subcategories: {
    id: string;
    name: string;
    slug: string;
    category_id: string;
  }[] = [];
  if (category) {
    const categoryData = await getCategoryBySlug(category);
    if (categoryData) {
      subcategories = (await getSubCategories(categoryData.id)) ?? [];
    }
  }

  return (
    <main className="overflow-x-hidden">
      <section className="view-all-container mt-50">
        {/* search + category filter + subcategory filter + sort bar */}
        <div className="flex items-center gap-3 mb-10">
          <SearchPageInput />
          <CategoryFilter categories={categories} />
          {subcategories.length > 0 && (
            <FilterDropdown subcategories={subcategories} />
          )}
          <SortDropdown />
        </div>

        {/* product count */}
        <p className="text-[10px] font-light tracking-widest text-black/40 uppercase mb-6">
          {products.length} Products
        </p>

        <div className="grid grid-cols-4 gap-5">
          {products.map((product) => (
            <Link key={product.id} href={`/search/${product.id}`}>
              <div className="group flex flex-col flex-wrap">
                <div className="overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="object-cover cursor-pointer transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                </div>
                <div className="product-label cursor-pointer">
                  <h2 className="product-title">{product.name}</h2>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
