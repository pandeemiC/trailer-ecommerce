"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/signup";
  const isAccountPage = pathname.startsWith("/account");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuth || isAccountPage || isAdminPage) return null;
  return (
    <footer className="w-full bg-white">
      <div className="flex justify-center items-center py-16 border-t border-black/10">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-[11px] font-light tracking-widest uppercase">
            Sign up to our newsletter
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="E-mail"
              className="border-b border-black/30 pb-1 px-2 text-[11px] font-light tracking-widest uppercase outline-none w-64"
            />
            <button className="text-[11px] font-light tracking-widest uppercase border-b border-black pb-1 cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-20 py-10 border-t border-black/10">
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium tracking-widest uppercase mb-2">
            Help
          </h4>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Shipping
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Returns & Exchanges
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium tracking-widest uppercase mb-2">
            Follow Me
          </h4>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Twitter / X
          </Link>
          <Link
            href="www.github.com/pandeemiC"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Github (WORKS)
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            TikTok
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium tracking-widest uppercase mb-2">
            Company
          </h4>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Careers
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Sustainability
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Press
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium tracking-widest uppercase mb-2">
            Policies
          </h4>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            className="text-[10px] font-light tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            Cookies
          </Link>
        </div>
      </div>

      {/* TRAILER TEXT */}
      <div className="relative overflow-hidden py-5">
        <h1
          className="text-center font-bold uppercase select-none"
          style={{
            fontSize: "clamp(80px, 15vw, 220px)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0, 0, 0, 0.15)",
            lineHeight: 0.85,
          }}
        >
          TRAILER
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
