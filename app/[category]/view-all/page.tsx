import SortDropdown from "@/components/SortDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import {
  getCategoryBySlug,
  getAllProductsWithImages,
  getSubCategories,
} from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function ViewAll({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; subcategory?: string }>;
}) {
  const { category } = await params;
  const { sort, subcategory } = await searchParams;
  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    return <div>Category Not Found</div>;
  }

  const products =
    (await getAllProductsWithImages(categoryData.id, sort)) ?? [];
  const subcategories = (await getSubCategories(categoryData.id)) ?? [];

  return (
    <main className="overflow-x-hidden">
      <section className="view-all-container mt-50">
        {/* search + filter/sort bar */}
        <div className="flex items-center gap-3 mb-10">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 border-b border-black/15 px-4 py-2.5 text-[11px] font-light tracking-widest uppercase outline-none placeholder:text-black/40"
          />
          <FilterDropdown subcategories={subcategories} />
          <SortDropdown />
        </div>

        {/* product count */}
        <p className="text-[10px] font-light tracking-widest text-black/40 uppercase mb-6">
          {products.length} Products
        </p>

        <div className="grid grid-cols-4 gap-5">
          {products.map((product) => (
            <Link key={product.id} href={`/${category}/view-all/${product.id}`}>
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
