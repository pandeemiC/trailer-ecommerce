import Image from "next/image";
import { getProductById } from "@/lib/queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    category: string;
    "sub-category": string;
    product: string;
  }>;
}) {
  const { product } = await params;
  const productData = await getProductById(product);

  if (!productData) {
    return <div>Product Not Found</div>;
  }

  const heroImage = productData.product_images.find(
    (img) => img.image_type === "hero",
  );
  const galleryImages = productData.product_images.filter(
    (img) => img.image_type === "gallery",
  );

  return (
    <main className="overflow-x-hidden">
      {productData && (
        <section className="flex flex-row px-40 py-16 gap-10">
          {/* left hero */}
          <div className="w-1/2">
            <Image
              src={heroImage?.url ?? productData.image}
              alt={productData.name}
              width={800}
              height={950}
              className="object-cover w-full"
            />
          </div>

          {/* right info */}
          <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center px-20">
            <div className="flex flex-col gap-4">
              <h1 className="product-page-title text-[15px] text-shadow-3xl/50">
                {productData.name}
              </h1>
              <h2 className="product-page-price">${productData.price}</h2>
            </div>

            <hr className="my-10" />

            {/* Add to cart */}
            <button className="w-full py-3 bg-white border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black hover:text-white transition-colors">
              ADD TO CART
            </button>

            <hr className="my-10" />

            {/* desc */}
            <div className="flex flex-col gap-8">
              <h1 className="product-page-title">TRAILER COLLECTION</h1>
              <h2 className="product-page-description">
                {productData.description}
              </h2>
            </div>

            <hr className="my-10" />

            {/* extras */}
            <div className="flex flex-col gap-5">
              <p className="product-page-extras">Product details</p>
              <p className="product-page-extras">Materials and maintenance</p>
              <p className="product-page-extras">Stock status</p>
              <p className="product-page-extras">
                Shipping, Exchange and Refunds
              </p>
            </div>
          </div>
        </section>
      )}

      <hr className="mb-15 px-20" />

      <section className="grid grid-cols-2 min-w-[1000px] px-40 gap-12">
        {galleryImages.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt={productData.name}
            width={800}
            height={1000}
            className="object-cover w-full cursor-pointer"
          />
        ))}
      </section>
    </main>
  );
}
