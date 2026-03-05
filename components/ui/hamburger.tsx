"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { NavCategory } from "@/lib/types";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(true);

  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("categories")
        .select("*, subcategories(*)")
        .order("name");

      if (data) {
        setCategories(data);
        setActiveCategory(data[0]?.slug ?? "");
      }
    };
    fetchCategories();
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setIsOpen(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }
  };

  const handleCategoryClick = (slug: string) => {
    if (activeCategory !== slug) {
      setIsContentLoaded(false);
      setTimeout(() => {
        setIsContentLoaded(true);
        setActiveCategory(slug);
      }, 300);
    }
  };

  return (
    <div>
      <div className="fixed top-3 left-3 z-30">
        <button
          onClick={handleToggle}
          aria-label="Toggle Menu"
          className="cursor-pointer ml-10 w-[120px] h-[75px] flex flex-col justify-center items-center"
        >
          {/* top line */}
          <span
            className={`block w-[70px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[22px]" : "rotate-0 translate-y-0"
            }`}
          />
          {/* middle line */}
          <span
            className={`block w-[70px] my-[20px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* bottom line */}
          <span
            className={`block w-[70px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen
                ? "-rotate-45 -translate-y-[22px]"
                : "rotate-0 translate-y-0"
            }`}
          />
        </button>
      </div>

      {(isOpen || isAnimating) && (
        <div>
          <div
            className={`fixed inset-0 bg-white/70 z-0 transition-opacity duration-800 ease-in-out ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleToggle}
          ></div>

          <div
            className={`fixed top-0 left-0 md:h-[100px] 2xl:h-[150px] bg-white border-none transition-opacity duration-800 ease-in-out z-20 w-full ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            className={`fixed top-0 left-0 h-full bg-white transition-opacity duration-800 ease-in-out z-20 ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            } w-full md:w-[600px] 2xl:w-[650px] flex`}
          >
            {/* left side south side */}
            <div className="w-1/3 p-6 flex flex-row justify-center items-center mb-[170px]">
              <ul className="space-y-4 tracking-widest">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`uppercase text-lg font-light cursor-pointer transition-colors duration-300 ${
                        activeCategory === cat.slug
                          ? "border-b-1 border-black"
                          : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* right side east side */}
            <div
              className={`w-2/3 p-6 overflow-y-auto flex flex-row justify-center items-center transition-opacity duration-800 ease-in-out ${
                isContentLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              {(() => {
                const activeCat = categories.find(
                  (c) => c.slug === activeCategory,
                );
                if (!activeCat) return null;
                return (
                  <div className="mt-20">
                    <Link href={`/${activeCat.slug}`} onClick={handleToggle}>
                      <Image
                        src={activeCat.image || "/category-img1.jpg"}
                        alt={activeCat.name}
                        width={250}
                        height={300}
                        className="mb-8 rounded-md cursor-pointer"
                      />
                    </Link>
                    <ul>
                      <li className="mb-5 font-light tracking-widest text-md">
                        <Link
                          href={`/${activeCat.slug}`}
                          className="hover:border-b-1 border-black p-1"
                          onClick={handleToggle}
                        >
                          OVERVIEW
                        </Link>
                      </li>
                      <li className="mb-5 font-light tracking-widest text-md">
                        <Link
                          href={`/search?category=${activeCat.slug}`}
                          className="hover:border-b-1 border-black p-1"
                          onClick={handleToggle}
                        >
                          VIEW ALL
                        </Link>
                      </li>
                      {activeCat.subcategories.map((sub) => (
                        <li
                          key={sub.id}
                          className="mb-5 font-light tracking-widest text-md"
                        >
                          <Link
                            href={`/${activeCat.slug}/${sub.slug}`}
                            className="hover:border-b-1 border-black p-1"
                            onClick={handleToggle}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
