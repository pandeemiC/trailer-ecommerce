"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import burgerOpenNav from "@/public/tool/burger-open-nav.svg";
import { navigationData, type Category } from "@/components/ui/navigationData";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("WOMAN");

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

  const handleCategoryClick = (category: Category) => {
    if (activeCategory !== category) {
      setIsContentLoaded(false);
      setTimeout(() => {
        setIsContentLoaded(true);
        setActiveCategory(category);
      }, 300);
    }
  };

  return (
    <div>
      <div className="fixed top-3 left-3 z-30">
        <button
          onClick={handleToggle}
          aria-label="Toggle Menu"
          className="cursor-pointer"
        >
          <Image
            src={burgerOpenNav}
            alt="Menu"
            width={120}
            height={75}
            className={`transition-transform duration-300 ease-in-out ml-10 ${
              isOpen ? "rotate-90" : "rotate-0"
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
            } w-full md:w-[600px] 2xl:w-[900px] flex`}
          >
            {/* left side south side */}
            <div className="w-1/3 p-6 flex flex-row justify-center items-center mb-[170px]">
              <ul className="space-y-4 tracking-widest">
                {(Object.keys(navigationData) as Category[]).map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`uppercase text-lg font-light cursor-pointer transition-colors duration-300 ${
                        activeCategory === category
                          ? "border-b-1 border-black"
                          : ""
                      }`}
                    >
                      {category}
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
              {activeCategory && navigationData[activeCategory] && (
                <div className="mt-20">
                  <Image
                    src={navigationData[activeCategory].image}
                    alt={activeCategory}
                    width={250}
                    height={300}
                    className="mb-8 rounded-md"
                  />
                  <ul>
                    {navigationData[activeCategory].links.map((link) => {
                      const categoryInfo = navigationData[activeCategory];
                      const fullHref =
                        link.href === ""
                          ? categoryInfo.basePath
                          : `${categoryInfo.basePath}/${link.href}`;

                      return (
                        <li
                          key={link.title}
                          className="mb-5 font-light tracking-widest text-md"
                        >
                          <Link
                            href={fullHref}
                            className="hover:border-b-1 border-black p-1"
                          >
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
