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
          className="cursor-pointer ml-2 md:ml-10 w-[70px] h-[50px] md:w-[120px] md:h-[75px] 2xl:w-[150px] 2xl:h-[90px] min-[2560px]:w-[180px] min-[2560px]:h-[100px] flex flex-col justify-center items-center"
        >
          {/* top line */}
          <span
            className={`block w-[40px] md:w-[70px] 2xl:w-[85px] min-[2560px]:w-[100px] h-[2px] bg-black dark:bg-white transition-all duration-300 ease-in-out ${
              isOpen
                ? "rotate-45 translate-y-[14px] md:translate-y-[22px] 2xl:translate-y-[26px] min-[2560px]:translate-y-[30px]"
                : "rotate-0 translate-y-0"
            }`}
          />
          {/* middle line */}
          <span
            className={`block w-[40px] md:w-[70px] 2xl:w-[85px] min-[2560px]:w-[100px] my-[12px] md:my-[20px] 2xl:my-[24px] min-[2560px]:my-[28px] h-[2px] bg-black dark:bg-white transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* bottom line */}
          <span
            className={`block w-[40px] md:w-[70px] 2xl:w-[85px] min-[2560px]:w-[100px] h-[2px] bg-black dark:bg-white transition-all duration-300 ease-in-out ${
              isOpen
                ? "-rotate-45 -translate-y-[14px] md:-translate-y-[22px] 2xl:-translate-y-[26px] min-[2560px]:-translate-y-[30px]"
                : "rotate-0 translate-y-0"
            }`}
          />
        </button>
      </div>

      {(isOpen || isAnimating) && (
        <div>
          <div
            className={`fixed inset-0 bg-white/70 dark:bg-black/70 z-0 transition-opacity duration-800 ease-in-out ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleToggle}
          ></div>

          <div
            className={`fixed top-0 left-0 md:h-[100px] 2xl:h-[130px] min-[2560px]:h-[150px] bg-white dark:bg-neutral-800 border-none transition-opacity duration-800 ease-in-out z-20 w-full ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-800 transition-opacity duration-800 ease-in-out z-20 ${
              isOpen && !isAnimating ? "opacity-100" : "opacity-0"
            } w-full md:w-[600px] 2xl:w-[750px] min-[2560px]:w-[900px] min-[3840px]:w-[1200px] flex`}
          >
            {/* left side south side */}
            <div className="w-1/3 p-4 md:p-6 flex flex-col justify-center items-center mb-[80px] md:mb-[170px]">
              <ul className="space-y-4 tracking-widest">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`uppercase text-lg 2xl:text-xl min-[2560px]:text-2xl font-light cursor-pointer transition-colors duration-300 ${
                        activeCategory === cat.slug
                          ? "border-b-1 border-black dark:border-white"
                          : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="md:hidden mt-14 pt-8 border-t border-black/10 dark:border-white/10 w-full flex flex-col items-center gap-5">
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
                    className="w-full border-b border-black/20 dark:border-white/20 pb-2 text-lg font-light tracking-widest uppercase outline-none bg-transparent placeholder:text-black/30 dark:placeholder:text-white/30"
                  />
                </form>
                {user ? (
                  <>
                    <Link
                      href="/account/purchases"
                      onClick={handleToggle}
                      className="text-lg font-light tracking-widest uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
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
                    className="text-lg font-light tracking-widest uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                )}
                <Link
                  href="/account/help"
                  onClick={handleToggle}
                  className="text-lg font-light tracking-widest uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
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
                        className="mb-8 rounded-md cursor-pointer w-[250px] 2xl:w-[320px] min-[2560px]:w-[400px] min-[3840px]:w-[500px] h-auto"
                      />
                    </Link>
                    <ul>
                      <li className="mb-5 font-light tracking-widest text-md 2xl:text-lg min-[2560px]:text-xl">
                        <Link
                          href={`/${activeCat.slug}`}
                          className="hover:border-b-1 border-black dark:border-white p-1"
                          onClick={handleToggle}
                        >
                          OVERVIEW
                        </Link>
                      </li>
                      <li className="mb-5 font-light tracking-widest text-md 2xl:text-lg min-[2560px]:text-xl">
                        <Link
                          href={`/search?category=${activeCat.slug}`}
                          className="hover:border-b-1 border-black dark:border-white p-1"
                          onClick={handleToggle}
                        >
                          VIEW ALL
                        </Link>
                      </li>
                      {activeCat.subcategories.map((sub) => (
                        <li
                          key={sub.id}
                          className="mb-5 font-light tracking-widest text-md 2xl:text-lg min-[2560px]:text-xl"
                        >
                          <Link
                            href={`/${activeCat.slug}/${sub.slug}`}
                            className="hover:border-b-1 border-black dark:border-white p-1"
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
