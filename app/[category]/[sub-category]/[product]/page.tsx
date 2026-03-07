import Image from "next/image";
import { getProductById } from "@/lib/queries";
import GalleryLightbox from "@/components/GalleryLightbox";
import AddToCartButton from "@/components/AddToCartButton";

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
        <section className="flex flex-col md:flex-row px-4 md:px-20 lg:px-40 py-8 md:py-16 gap-6 md:gap-10">
          {/* left hero */}
          <div className="w-full md:w-1/2">
            <Image
              src={productData.image}
              alt={productData.name}
              width={800}
              height={950}
              className="object-cover w-full"
            />
          </div>

          {/* right info */}
          <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen flex flex-col justify-center px-0 md:px-20">
            <div className="flex flex-col gap-4">
              <h1 className="product-page-title text-[15px] text-shadow-3xl/50">
                {productData.name}
              </h1>
              <h2 className="product-page-price">${productData.price}</h2>
            </div>

            <hr className="my-10" />

            {/* Add to cart */}
            <AddToCartButton product={productData} />

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

      <hr className="mb-15 mx-4 md:mx-20 lg:mx-40" />

      <GalleryLightbox images={galleryImages} productName={productData.name} />
    </main>
  );
}
