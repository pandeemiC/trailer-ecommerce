"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import SideBar from "@/components/ui/hamburger";
import SearchBar from "@/components/SearchBar";
import CartSideBar from "./CartSideBar";

const Navbar = () => {
  const pathname = usePathname();
  const isShoppingBag = pathname === "/shopping-bag";

  return (
    <nav className="absolute top-0 w-full z-30 p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <SideBar />
        <Link href="/">
          {isShoppingBag ? (
            <span className="fixed top-5.5 left-50 z-30 text-[34px] font-medium tracking-[0.35em] uppercase">
              TRAILER
            </span>
          ) : (
            <Image
              src={trailerLogoLight}
              alt="TrailerLogo"
              width={270}
              height={180}
              priority
              className="fixed top-0 left-40 z-30 min-2xl:w-[420px]"
            />
          )}
        </Link>
      </div>

      <div className="flex items-center gap-2 fixed top-5 right-8 z-30">
        <SearchBar />
        <div className="flex items-center gap-6 bg-white px-4 py-1 rounded-md">
          <Link
            className="text-[11px] font-light tracking-widest uppercase hover:border-b border-black transition-all duration-100"
            href="/login"
          >
            Log In
          </Link>
          <Link
            className="text-[11px] font-light tracking-widest uppercase hover:border-b border-black transition-all duration-100"
            href="/help"
          >
            Help
          </Link>
          <CartSideBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
