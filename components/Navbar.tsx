import React from "react";
import Link from "next/link";
import Image from "next/image";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import Hamburger from "@/components/ui/hamburger";

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Hamburger />
        <Link href="/">
          <Image
            src={trailerLogoLight}
            alt="TrailerLogo"
            width={280}
            height={180}
            priority
            className="fixed top-0 left-30"
          />
        </Link>
      </div>

      <div className="flex flex-col items-end fixed top-5 right-3">
        <div className="border-b border-black w-60 mb-5">
          <p className="text-sm uppercase">SearchBar</p>
        </div>
        <ul className="flex items-center gap-5">
          <li className="hover:border-b transition-all duraiton-100 border-black">
            <Link className="uppercase text-sm" href="/help">
              Help
            </Link>
          </li>
          <li className="hover:border-b transition-all duraiton-100 border-black">
            <Link className="uppercase text-sm" href="/login">
              Login
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
