"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import burgerOpenNav from "@/public/tool/burger-open-nav.svg";
import { navigationData, type Category } from "@/components/ui/navigationData";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("WOMAN");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
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

      {isOpen && (
        <div>
          <div
            className="fixed inset-0 bg-white/70 z-0"
            onClick={handleToggle}
          ></div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 md:h-[100px] 2xl:h-[150px] bg-white border-none transform transition-transform duration-300 ease-in-out z-20 w-full ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full bg-white transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full md:w-[600px] 2xl:w-[900px] flex`}
      >
        {/* left side south side */}
        <div className="w-1/3 p-6 border-1 border-black">
          <ul className="space-y-4 border-1 border-black">
            {(Object.keys(navigationData) as Category[]).map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`uppercase text-sm font-semibold ${
                    activeCategory === category ? "border-b-2 border-black" : ""
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* rigfht side east side */}
        <div className="w-2/3 p-6 overflow-y-auto border-black border-1">
          {activeCategory && navigationData[activeCategory] && (
            <div className="border-1 border-black">
              <Image
                src={navigationData[activeCategory].image}
                alt={activeCategory}
                width={200}
                height={300}
                className="mb-4"
              />
              <ul>
                {navigationData[activeCategory].links.map((link) => (
                  <li key={link.title} className="mb-2">
                    <Link href={link.href} className="hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
