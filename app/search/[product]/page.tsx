import Image from "next/image";
import { getProductById } from "@/lib/queries";
import GalleryLightbox from "@/components/GalleryLightbox";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const productData = await getProductById(product);

  if (!productData) {
    return {
      title: "Product Not Found | Trailer",
      description: "The product you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${productData.name} | Trailer`;
  const description = `Shop ${productData.name} at Trailer. View all the premium collections. Available now for $${productData.price}.`;

  const url = `https://trailer-ecommerce.vercel.app/search/${product}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Trailer",
      type: "product",
      images: [
        {
          url: productData.image,
          width: 1200,
          height: 1200,
          alt: productData.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [productData.image],
    },

    other: {
      "product:price:amount": productData.price,
      "product:price:currency": "USD",
    },
  };
}

export default async function SearchProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const productData = await getProductById(product);

  if (!productData) {
    return <div>Product Not Found</div>;
  }

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
              src={productData.image}
              alt={productData.name}
              width={800}
              height={950}
              quality={100}
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

      <hr className="mb-15 mx-40" />

      <GalleryLightbox images={galleryImages} productName={productData.name} />
    </main>
  );
}
