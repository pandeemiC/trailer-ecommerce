import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsWithImages,
} from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; "sub-category": string }>;
}) {
  const { category, "sub-category": subCategory } = await params;
  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: "Category Not Been Found",
      description: "The Category you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const subCategoryData = await getSubcategoryBySlug(
    subCategory,
    categoryData.id,
  );

  if (!subCategoryData) {
    return {
      title: "Subcategory Not Been Found",
      description: "The Subcategory you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${subCategoryData.name} - ${categoryData.name} | Trailer`;
  const description = `Shop ${categoryData.name}'s ${subCategoryData.name} collection at Trailer.`;
  const url = `https://trailer-ecommerce.vercel.app/${category}/${subCategory}`;

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
      type: "website",
      images: [
        {
          url: subCategoryData.image,
          width: 1200,
          height: 1200,
          alt: subCategoryData.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [subCategoryData.image],
    },
  };
}

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

  // Unwrap present
  const products = productsData ?? [];

  //featured type
  const heroProduct = products.find((p) => p.featured_type === "hero");
  const featuredProduct = products.find((p) => p.featured_type === "featured");
  const gridProducts = products.filter((p) => !p.featured_type);
  const heroBottomProduct = products.find(
    (p) => p.featured_type === "hero_bottom",
  );

  return (
    <main className="overflow-x-hidden relative">
      <div className="hidden md:block absolute top-20 right-15 z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-1">
          {subcategory_data.name.split("").map((letter: string, i: number) => (
            <span
              key={i}
              className="text-[clamp(80px,9vw,130px)] font-extralight uppercase leading-none tracking-widest watermark-text"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {heroProduct && (
        <section className="w-full min-h-screen flex justify-center items-center px-3 md:px-5">
          <Link href={`/${category}/${subCategory}/${heroProduct.id}`}>
            <div className="flex flex-col items-start w-full max-w-[1000px] 2xl:max-w-[1300px] min-[2560px]:max-w-[1600px] min-[3840px]:max-w-[2200px]">
              <Image
                src={
                  heroProduct.product_images.find(
                    (img) => img.image_type === "hero",
                  )?.url ?? heroProduct.image
                }
                alt={heroProduct.name}
                width={1200}
                height={1500}
                quality={100}
                className="object-cover w-full h-auto cursor-pointer"
              />

              <div className="product-label px-1">
                <h1 className="product-title">{heroProduct.name}</h1>
                <p className="product-price">${heroProduct.price}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {featuredProduct && (
        <section className="flex flex-col sm:flex-row justify-center items-start gap-2 md:gap-5 2xl:gap-8 min-[2560px]:gap-10 px-3 sm:px-0 pb-10">
          {featuredProduct.product_images
            .filter((img) => img.image_type === "thumbnail")
            .map((img) => (
              <Link
                key={img.id}
                href={`/${category}/${subCategory}/${featuredProduct.id}`}
              >
                <div key={img.id} className="flex flex-col items-start">
                  <Image
                    src={img.url}
                    alt={featuredProduct.name}
                    width={500}
                    height={620}
                    quality={100}
                    className="object-cover cursor-pointer w-[500px] 2xl:w-[650px] min-[2560px]:w-[800px] min-[3840px]:w-[1050px] h-auto"
                  />
                  <div className="product-label cursor-pointer">
                    <h2 className="product-title">{featuredProduct.name}</h2>
                    <p className="product-price">${featuredProduct.price}</p>
                  </div>
                </div>
              </Link>
            ))}
        </section>
      )}
      {gridProducts && (
        <section className="px-4 sm:px-10 lg:px-20 xl:px-53 2xl:px-64 min-[2560px]:px-80 min-[3840px]:px-[420px] py-10">
          <h1 className="text-[13px] font-light tracking-[0.3em] uppercase mb-8 pl-1">
            Trails
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {gridProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${category}/${subCategory}/${product.id}`}
              >
                <div key={product.id} className="flex flex-col flex-wrap">
                  <Image
                    src={product.image}
                    alt={product.description}
                    width={300}
                    height={400}
                    quality={100}
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
      )}

      {heroBottomProduct && (
        <section className="w-full min-h-screen flex justify-center items-center px-3 md:px-5 py-20">
          <Link href={`/${category}/${subCategory}/${heroBottomProduct.id}`}>
            <div className="flex flex-col items-start w-full max-w-[1000px] 2xl:max-w-[1300px] min-[2560px]:max-w-[1600px] min-[3840px]:max-w-[2200px]">
              <Image
                src={
                  heroBottomProduct.product_images.find(
                    (img) => img.image_type === "hero",
                  )?.url ?? heroBottomProduct.image
                }
                alt={heroBottomProduct.name}
                width={1000}
                height={1200}
                quality={100}
                className="object-cover w-full h-auto cursor-pointer"
              />
              <div className="product-label">
                <h1 className="product-title">{heroBottomProduct.name}</h1>
                <p className="product-price">${heroBottomProduct.price}</p>
              </div>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
