import { getCategoryBySlug, getAllProductsWithImages } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function ViewAll({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    return <div>Category Not Found</div>;
  }

  const products = (await getAllProductsWithImages(categoryData.id)) ?? [];

  return (
    <main className="overflow-x-hidden">
      <section className="px-53 pt-40 pb-20">
        <h1 className="text-[13px] font-light uppercase tracking-widest mb-10 pl-1">
          View All
        </h1>

        {/* search + filter/sort bar */}
        <div className="flex items-center gap-3 mb-10">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 border-b border-black/15 px-4 py-2.5 text-[11px] font-light tracking-widest uppercase outline-none placeholder:text-black/40"
          />
          <button className="border border-black/15 px-5 py-2.5 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-colors duration-200">
            Filter
          </button>
          <button className="border border-black/15 px-5 py-2.5 text-[11px] font-light tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-colors duration-200">
            Sort
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {products.map((product) => (
            <Link key={product.id} href={`/${category}/view-all/${product.id}`}>
              <div className="flex flex-col flex-wrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="object-cover cursor-pointer"
                />
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
