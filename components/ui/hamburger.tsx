"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NavCategory } from "@/lib/types";
import { User } from "@supabase/supabase-js";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(true);

  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const fetchCategories = async () => {
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
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
      <div className="fixed top-0 md:top-3 left-2 z-30">
        <button
          onClick={handleToggle}
          aria-label="Toggle Menu"
          className="cursor-pointer ml-2 md:ml-10 w-[70px] h-[50px] md:w-[120px] md:h-[75px] flex flex-col justify-center items-center"
        >
          {/* top line */}
          <span
            className={`block w-[40px] md:w-[70px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen
                ? "rotate-45 translate-y-[14px] md:translate-y-[22px]"
                : "rotate-0 translate-y-0"
            }`}
          />
          {/* middle line */}
          <span
            className={`block w-[40px] md:w-[70px] my-[12px] md:my-[20px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* bottom line */}
          <span
            className={`block w-[40px] md:w-[70px] h-[2px] bg-black transition-all duration-300 ease-in-out ${
              isOpen
                ? "-rotate-45 -translate-y-[14px] md:-translate-y-[22px]"
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
            <div className="w-1/3 p-4 md:p-6 flex flex-col justify-center items-center mb-[80px] md:mb-[170px]">
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

              <div className="md:hidden mt-14 pt-8 border-t border-black/10 w-full flex flex-col items-center gap-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchInput.trim()) {
                      router.push(
                        `/search?q=${encodeURIComponent(searchInput.trim())}`,
                      );
                      setSearchInput("");
                      handleToggle();
                    }
                  }}
                  className="w-full px-1"
                >
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search"
                    className="w-full border-b border-black/20 pb-2 text-lg font-light tracking-widest uppercase outline-none placeholder:text-black/30"
                  />
                </form>
                {user ? (
                  <>
                    <Link
                      href="/account/purchases"
                      onClick={handleToggle}
                      className="text-lg font-light tracking-widest uppercase text-black/50 hover:text-black transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={async () => {
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        setUser(null);
                        handleToggle();
                        router.refresh();
                      }}
                      className="text-lg font-light tracking-widest uppercase text-black/50 hover:text-black transition-colors cursor-pointer"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={handleToggle}
                    className="text-lg font-light tracking-widest uppercase text-black/50 hover:text-black transition-colors"
                  >
                    Log In
                  </Link>
                )}
                <Link
                  href="/account/help"
                  onClick={handleToggle}
                  className="text-lg font-light tracking-widest uppercase text-black/50 hover:text-black transition-colors"
                >
                  Help
                </Link>
              </div>
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
