import React from "react";
import Link from "next/link";
import Image from "next/image";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import burgerNav from "@/public/tool/burger-nav.svg";
// import trailerLogoDark from "@/public/icons/trailer-logo-dark.png";

const Navbar = () => {
  return (
    <nav className="p-5 flex justify-between">
      <div className="flex">
        {/* X is the hamburger Icon/Sidebar initiation */}
        <div className="absolute top-0 left-0 p-3">
          <button className="cursor-pointer">
            <Image src={burgerNav} alt="Menu" width={100} height={75} />
          </button>
        </div>
        <div className="absolute z-1">
          <Link href="/">
            <Image
              className="ml-30"
              src={trailerLogoLight}
              alt="TrailerLogo"
              width={280}
              height={180}
              priority
            />
          </Link>
        </div>
      </div>

      <div>
        <p className="border-b border-black w-80 text-sm uppercase mb-5">
          SearchBar
        </p>
        <ul className="flex justify-between items-center gap-2.5">
          <li>
            <Link className="uppercase text-sm" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="uppercase text-sm" href="/login">
              Login
            </Link>
          </li>
          <li>
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
