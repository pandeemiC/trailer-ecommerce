"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { accountLinks } from "@/lib/navigationData";
import { PiSignOutLight } from "react-icons/pi";

export default function AccountMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-20">
      <div className="bg-white flex items-center justify-between px-5 py-3 border-b border-black/10">
        <div className="w-8" />
        <Link
          href="/"
          className="text-[18px] font-medium tracking-[0.35em] uppercase"
        >
          TRAILER
        </Link>
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/");
            router.refresh();
          }}
          className="cursor-pointer"
        >
          <PiSignOutLight size={20} className="text-black/50" />
        </button>
      </div>

      <nav className="bg-white border-b border-black/10">
        <div className="flex overflow-x-auto no-scrollbar">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 px-5 py-3 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "text-black border-b-2 border-black font-medium"
                  : "text-black/40 font-light"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
