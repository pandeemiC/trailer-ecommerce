import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsWithImages,
} from "@/lib/queries";
import Image from "next/image";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; "sub-category": string }>;
}) {
  const { category, "sub-category": subCategory } = await params;
  const category_data = await getCategoryBySlug(category);
  if (!category_data) {
    return <div>Category Not Found</div>;
  }
  const subcategory_data = await getSubcategoryBySlug(
    subCategory,
    category_data.id,
  );
  if (!subcategory_data) {
    return <div>Subcategory Not Found</div>;
  }

  const productsData = await getProductsWithImages(subcategory_data.id);
  console.log(productsData);

  // Unwrap present
  const products = productsData ?? [];

  //featured type
  const heroProduct = products.find((p) => p.featured_type === "hero");
  const featuredProduct = products.find((p) => p.featured_type === "featured");
  const gridProducts = products.filter((p) => !p.featured_type);

  console.log(heroProduct);
  return (
    <main className="overflow-x-hidden">
      {heroProduct && (
        <section className="w-full min-h-screen flex justify-center items-center p-5">
          <div className="flex flex-col items-start w-full max-w-[1000px]">
            <Image
              src={
                heroProduct.product_images.find(
                  (img) => img.image_type === "hero",
                )?.url ?? heroProduct.image
              }
              alt={heroProduct.name}
              width={1000}
              height={1200}
              className="object-cover w-full h-auto"
            />

            <div className="mt-3 text-black/70 text-sm font-light text-left">
              <h1 className="tracking-widest uppercase bg-gray-100 p-1">
                {heroProduct.name}
              </h1>
              <p className="mt-1">${heroProduct.price}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
