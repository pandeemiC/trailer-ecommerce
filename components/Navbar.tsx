import React from "react";
import Link from "next/link";
import Image from "next/image";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import burgerNav from "@/public/tool/burger-nav.svg";
// import trailerLogoDark from "@/public/icons/trailer-logo-dark.png";

const Navbar = () => {
  return (
    <nav className="p-8 flex justify-between">
      <div className="flex">
        {/* X is the hamburger Icon/Sidebar initiation */}
        <div className="absolute top-0 left-0 p-4">
          <button>
            <Image src={burgerNav} alt="Menu" width={100} height={75} />
          </button>
        </div>
        <Link href="/">
          <Image
            className="ml-20"
            src={trailerLogoLight}
            alt="TrailerLogo"
            width={220}
            height={400}
            priority
          />
        </Link>
      </div>
      <div>
        <p>SearchBar</p>
      </div>
      <div>
        <ul className="flex justify-between items-center gap-2.5">
          <li>
            <Link className="uppercase text-md" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="uppercase text-md" href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="uppercase text-md" href="/checkout">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
