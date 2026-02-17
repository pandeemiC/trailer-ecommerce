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
              <p className="mt-1 tracking-widest">${heroProduct.price}</p>
            </div>
          </div>
        </section>
      )}

      {featuredProduct && (
        <section className="flex justify-center items-start gap-5 py-10">
          {featuredProduct.product_images
            .filter((img) => img.image_type === "thumbnail")
            .sort((a, b) => a.position - b.position)
            .map((img) => (
              <div key={img.id} className="flex flex-col items-start">
                <Image
                  src={img.url}
                  alt={featuredProduct.name}
                  width={500}
                  height={620}
                  className="object-cover"
                />
                <div className="mt-3 text-black/70 text-sm font-light">
                  <h2 className="tracking-widest uppercase bg-gray-100 p-1">
                    {featuredProduct.name}
                  </h2>
                  <p className="mt-1 tracking-widest">
                    ${featuredProduct.price}
                  </p>
                </div>
              </div>
            ))}
        </section>
      )}
    </main>
  );
}
