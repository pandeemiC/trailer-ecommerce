"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import trailerLogoLight from "@/public/icons/trailer-logo-light.png";
import SideBar from "@/components/ui/hamburger";
import SearchBar from "@/components/SearchBar";
import CartSideBar from "./CartSideBar";

import { PiUserCircleLight } from "react-icons/pi";

const Navbar = () => {
  const [user, setUser] = useState<null | object>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const isShoppingBag = pathname === "/shopping-bag";
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "auth/reset-password";
  const isAccountPage = pathname.startsWith("/account");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage || isAccountPage || isAdminPage) return null;
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
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <PiUserCircleLight size={20} />
              </button>
              {dropdownOpen && (
                <ul className="absolute top-8 right-0 bg-white border border-gray-200 shadow-md py-2 min-w-[180px]">
                  <li>
                    <Link
                      href="/account/purchases"
                      className="block px-4 py-2 text-[11px] tracking-widest uppercase hover:bg-gray-100"
                    >
                      My Purchases
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/details"
                      className="block px-4 py-2 text-[11px] tracking-widest uppercase hover:bg-gray-100"
                    >
                      My Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/settings"
                      className="block px-4 py-2 text-[11px] tracking-widest uppercase hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-[11px] tracking-widest uppercase hover:bg-gray-100 cursor-pointer"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setUser(null);
                        setDropdownOpen(false);
                        router.refresh();
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              className="text-[11px] font-light tracking-widest uppercase hover:border-b border-black transition-all duration-100"
              href="/login"
            >
              Log In
            </Link>
          )}

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
