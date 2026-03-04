import Image from "next/image";
import Link from "next/link";
import ShrinkingImageContainer from "@/components/ShrinkingImageContainer";
import FixedTrailer from "@/components/FixedTrailer";

import { getHomepageSections } from "@/lib/admin/queries";
import { HomepageSection } from "@/lib/types";

export default async function Home() {
  const sections = await getHomepageSections();

  function DuoSection({ section }: { section: HomepageSection }) {
    const images = section.homepage_section_images.sort(
      (a, b) => a.position - b.position,
    );
    return (
      <ShrinkingImageContainer>
        <section className="flex justify-center items-center py-20 overflow-auto">
          {images.map((img) => (
            <Link key={img.id} href={img.href || "#"}>
              <Image
                src={img.url}
                alt={img.alt}
                width={520}
                height={620}
                quality={100}
                className="shadow-md object-cover"
              />
            </Link>
          ))}
        </section>
      </ShrinkingImageContainer>
    );
  }

  function FullSection({ section }: { section: HomepageSection }) {
    const img = section.homepage_section_images[0];
    if (!img) return null;
    return (
      <>
        {/* <ShrinkingImageContainer> */}

        <section className="full-section-trigger w-screen">
          <Link href={img.href || "#"}>
            <Image
              src={img.url}
              alt={img.alt}
              width={1920}
              height={1080}
              className="w-full h-auto shadow-md"
              priority
              quality={90}
            />
            <FixedTrailer />
          </Link>
        </section>
        {/* </ShrinkingImageContainer> */}
      </>
    );
  }

  function EditorialSection({ section }: { section: HomepageSection }) {
    const images = section.homepage_section_images.sort(
      (a, b) => a.position - b.position,
    );
    const textSide = images[0]?.text_side || "left";

    const textBlock = (
      <div
        className={`flex flex-col justify-center items-center ${textSide === "left" ? "mr-30" : "ml-30"} font-light text-sm tracking-widest`}
      >
        {section.title && (
          <h1 className="font-bold text-2xl mb-10">{section.title}</h1>
        )}
        {section.subtitle && <h3 className="mb-10 p-2">{section.subtitle}</h3>}
        {section.description && (
          <p className="p-2 mb-10">{section.description}</p>
        )}
        {images[0] && (
          <Link href={images[0].href || "#"}>
            <Image
              src={images[0].url}
              alt={images[0].alt}
              width={420}
              height={620}
              quality={100}
              className="shadow-md object-cover"
            />
          </Link>
        )}
      </div>
    );

    const sideImage = images[1] && (
      <Link href={images[1].href || "#"}>
        <Image
          src={images[1].url}
          alt={images[1].alt}
          width={720}
          height={620}
          quality={100}
          className="shadow-md object-cover"
        />
      </Link>
    );

    return (
      <ShrinkingImageContainer>
        <section className="flex justify-center items-center py-10 overflow-auto">
          {textSide === "left" ? (
            <>
              {textBlock}
              {sideImage}
            </>
          ) : (
            <>
              {sideImage}
              {textBlock}
            </>
          )}
        </section>
      </ShrinkingImageContainer>
    );
  }
  return (
    <main className="w-full overflow-x-hidden">
      {sections && sections.length > 0 ? (
        sections.map((section) => {
          switch (section.section_type) {
            case "duo":
              return <DuoSection key={section.id} section={section} />;
            case "full":
              return <FullSection key={section.id} section={section} />;
            case "editorial":
              return <EditorialSection key={section.id} section={section} />;
            default:
              return null;
          }
        })
      ) : (
        <div className="h-screen flex items-center justify-center">
          <p className="text-[12px] tracking-wider text-gray-400">
            Homepage content coming soon.. Refer to admin panel.
          </p>
        </div>
      )}
      {/* newsletter */}
    </main>
  );
}
