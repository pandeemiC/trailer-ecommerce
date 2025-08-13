import React from "react";
import Link from "next/link";
import Image from "next/image";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import SideBar from "@/components/ui/hamburger";

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-30 p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <SideBar />
        <Link href="/">
          <Image
            src={trailerLogoLight}
            alt="TrailerLogo"
            width={300}
            height={180}
            priority
            className="fixed top-0 left-40 z-30 min-2xl:w-[420px]"
          />
        </Link>
      </div>

      <div className="flex flex-col items-end fixed top-5 right-3 z-30">
        <div className="border-b border-black w-60 p-1 mb-5">
          <p className="text-sm uppercase">Search</p>
        </div>
        <ul className="flex items-center gap-5 mr-8">
          <li className="hover:border-b transition-all duraiton-100 border-black">
            <Link className="uppercase text-sm" href="/login">
              Log In
            </Link>
          </li>
          <li className="hover:border-b transition-all duraiton-100 border-black">
            <Link className="uppercase text-sm" href="/help">
              Help
            </Link>
          </li>
          <li className="hover:border-b transition-all duraiton-100 border-black">
            <Link className="uppercase text-sm" href="/checkout">
              CartIcon
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
