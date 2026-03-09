"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/signup";
  const isAccountPage = pathname.startsWith("/account");
  const isAdminPage = pathname.startsWith("/admin");
  const isCheckoutPage = pathname.startsWith("/checkout");

  if (isAuth || isAccountPage || isAdminPage || isCheckoutPage) return null;
  return (
    <footer className="w-full bg-white dark:bg-neutral-800">
      <div className="flex justify-center items-center py-10 sm:py-16 px-6 border-t border-black/10 dark:border-white/10">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-none">
          <h3 className="text-[11px] font-light tracking-widest uppercase">
            Sign up to our newsletter
          </h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="E-mail"
              className="border-b border-black/30 dark:border-white/30 pb-1 px-2 text-[11px] font-light tracking-widest uppercase outline-none bg-transparent w-full sm:w-64"
            />
            <button className="text-[11px] font-light tracking-widest uppercase border-b border-black dark:border-white pb-1 cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20 2xl:gap-28 min-[2560px]:gap-36 min-[3840px]:gap-48 py-10 px-6 sm:px-10 2xl:px-20 min-[3840px]:px-32 border-t border-black/10 dark:border-white/10">
        <div className="flex flex-col gap-3">
          <h4 className="text-[12px] md:text-[11px] font-medium tracking-widest uppercase mb-2">
            Help
          </h4>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Shipping
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Returns & Exchanges
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[12px] md:text-[10px] font-medium tracking-widest uppercase mb-2">
            Follow Me
          </h4>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Twitter / X
          </Link>
          <a
            href="https://www.github.com/pandeemiC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Github
          </a>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            TikTok
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[12px] md:text-[11px] font-medium tracking-widest uppercase mb-2">
            Company
          </h4>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Careers
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Sustainability
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Press
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[12px] md:text-[11px] font-medium tracking-widest uppercase mb-2">
            Policies
          </h4>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            className="text-[11px] md:text-[10px] font-normal md:font-light tracking-widest uppercase text-black/70 md:text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            Cookies
          </Link>
        </div>
      </div>

      {/* TRAILER TEXT */}
      <div className="relative overflow-hidden py-5">
        <h1
          className="text-center font-bold uppercase select-none watermark-text"
          style={{
            fontSize: "clamp(80px, 15vw, 220px)",
            WebkitTextStrokeWidth: "1.5px",
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
