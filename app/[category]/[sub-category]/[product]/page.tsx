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
        <>
          <section className="hidden md:flex flex-row px-20 lg:px-40 py-16 gap-10">
            <div className="w-1/2">
              <Image
                src={productData.image}
                alt={productData.name}
                width={800}
                height={950}
                className="object-cover w-full"
              />
            </div>

            <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center px-20">
              <div className="flex flex-col gap-4">
                <h1 className="product-page-title text-[15px] text-shadow-3xl/50">
                  {productData.name}
                </h1>
                <h2 className="product-page-price">${productData.price}</h2>
              </div>

              <hr className="my-10" />

              <AddToCartButton product={productData} />

              <hr className="my-10" />

              <div className="flex flex-col gap-8">
                <h1 className="product-page-title">TRAILER COLLECTION</h1>
                <h2 className="product-page-description">
                  {productData.description}
                </h2>
              </div>

              <hr className="my-10" />

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

          <section className="flex md:hidden flex-col items-center">
            <Image
              src={productData.image}
              alt={productData.name}
              width={800}
              height={950}
              className="object-cover w-full"
            />

            <div className="w-full px-5 pt-6 pb-4 flex flex-col items-center text-center gap-1">
              <h1 className="product-page-title text-[14px]">
                {productData.name}
              </h1>
              <h2 className="product-page-price">${productData.price}</h2>
            </div>

            <div className="w-full px-5 pb-6">
              <AddToCartButton product={productData} />
            </div>

            <hr className="w-full mx-5" />

            <div className="w-full px-5 py-6 flex flex-col gap-4 text-center">
              <h1 className="product-page-title">TRAILER COLLECTION</h1>
              <h2 className="product-page-description">
                {productData.description}
              </h2>
            </div>

            <hr className="w-full mx-5" />

            <div className="w-full px-5 py-6 flex flex-col gap-5">
              <p className="product-page-extras">Product details</p>
              <p className="product-page-extras">Materials and maintenance</p>
              <p className="product-page-extras">Stock status</p>
              <p className="product-page-extras">
                Shipping, Exchange and Refunds
              </p>
            </div>
          </section>
        </>
      )}

      <hr className="mb-15 mx-4 md:mx-20 lg:mx-40 mt-8 md:mt-0" />

      <GalleryLightbox images={galleryImages} productName={productData.name} />
    </main>
  );
}
