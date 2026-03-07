"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-ui";
import { X } from "lucide-react";
import { GalleryImage } from "@/lib/types";

export default function GalleryLightbox({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileThumbsRef = useRef<HTMLDivElement>(null);
  const mobileImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  function openAt(index: number) {
    setActiveIndex(index);
    setOpen(true);
    setTimeout(() => {
      imageRefs.current[index]?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
      mobileImageRefs.current[index]?.scrollIntoView({
        behavior: "instant",
        inline: "start",
      });
    }, 50);
  }

  useEffect(() => {
    if (open && thumbRefs.current[activeIndex]) {
      thumbRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex, open]);

  function handleThumbClick(index: number) {
    isClickScrolling.current = true;
    setActiveIndex(index);
    imageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }

  function handleMobileThumbClick(index: number) {
    isClickScrolling.current = true;
    setActiveIndex(index);
    mobileImageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }

  useEffect(() => {
    if (!open) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const containerTop = container.scrollTop;
      const containerMid = containerTop + container.clientHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const refMid = ref.offsetTop + ref.offsetHeight / 2;
        const distance = Math.abs(containerMid - refMid);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const container = mobileScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const containerLeft = container.scrollLeft;
      const containerMid = containerLeft + container.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      mobileImageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const refMid = ref.offsetLeft + ref.offsetWidth / 2;
        const distance = Math.abs(containerMid - refMid);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <>
      {/* gallery grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-0 md:px-40 gap-4 md:gap-12 pb-20">
        {images.map((img, index) => (
          <Image
            key={img.id}
            src={img.url}
            alt={productName}
            width={800}
            height={1000}
            className="object-cover w-full cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openAt(index)}
          />
        ))}
      </section>

      {/* lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="!fixed !inset-0 !max-w-none !w-full !h-full !translate-x-0 !translate-y-0 !top-0 !left-0 !rounded-none !border-none !bg-white/95 dark:!bg-neutral-800/95 !p-0 !gap-0 !overflow-hidden"
        >
          <VisuallyHidden.Root>
            <DialogTitle>{productName} Gallery</DialogTitle>
          </VisuallyHidden.Root>

          <button
            onClick={() => setOpen(false)}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 hover:opacity-60 transition-opacity"
          >
            <X size={30} strokeWidth={1} className="md:hidden" />
            <X size={45} strokeWidth={1} className="hidden md:block" />
          </button>

          <div className="hidden md:flex h-screen w-full">
            <div className="w-[150px] h-full overflow-y-auto flex flex-col gap-2 p-3 ml-16 shrink-0">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  ref={(el) => {
                    thumbRefs.current[index] = el;
                  }}
                  className={`cursor-pointer transition-opacity ${
                    activeIndex === index
                      ? "opacity-100 ring-1 ring-black dark:ring-white"
                      : "opacity-40 hover:opacity-70"
                  }`}
                  onClick={() => handleThumbClick(index)}
                >
                  <Image
                    src={img.url}
                    alt={productName}
                    width={110}
                    height={140}
                    className="object-cover w-full"
                  />
                </div>
              ))}
            </div>

            <div
              ref={scrollContainerRef}
              className="flex-1 h-full overflow-y-scroll flex flex-col items-center gap-20"
            >
              {images.map((img, index) => (
                <div
                  key={img.id}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="w-full h-[150vh] flex justify-center shrink-0"
                >
                  <Image
                    src={img.url}
                    alt={productName}
                    width={1500}
                    height={2000}
                    className="object-cover h-full w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex md:hidden flex-col h-screen w-full">
            <div
              ref={mobileScrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory"
            >
              {images.map((img, index) => (
                <div
                  key={img.id}
                  ref={(el) => {
                    mobileImageRefs.current[index] = el;
                  }}
                  className="w-full h-full shrink-0 snap-start flex items-center justify-center"
                >
                  <Image
                    src={img.url}
                    alt={productName}
                    width={1200}
                    height={1600}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>

            <div
              ref={mobileThumbsRef}
              className="h-[80px] shrink-0 overflow-x-auto flex items-center gap-2 px-3 bg-white/90 dark:bg-neutral-800/90 border-t border-black/10 dark:border-white/10"
            >
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className={`cursor-pointer transition-opacity shrink-0 ${
                    activeIndex === index
                      ? "opacity-100 ring-1 ring-black dark:ring-white"
                      : "opacity-40"
                  }`}
                  onClick={() => handleMobileThumbClick(index)}
                >
                  <Image
                    src={img.url}
                    alt={productName}
                    width={55}
                    height={70}
                    className="object-cover h-[60px] w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
