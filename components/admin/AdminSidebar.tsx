"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { adminLinks } from "@/lib/navigationData";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  PiChartBarLight,
  PiPackageLight,
  PiTagLight,
  PiSignOutLight,
  PiCaretDoubleRightLight,
  PiCaretDoubleLeftLight,
  PiLayoutLight,
} from "react-icons/pi";

const iconMap: Record<string, React.ReactNode> = {
  PiChartBarLight: <PiChartBarLight size={20} />,
  PiLayoutLight: <PiLayoutLight size={20} />,
  PiPackageLight: <PiPackageLight size={20} />,
  PiTagLight: <PiTagLight size={20} />,
};

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { toggleSidebar, state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex flex-col gap-3 overflow-hidden">
          <Link href="/">
            <span className="text-[24px] font-bold tracking-[0.35em] uppercase">
              TRAILER
            </span>
          </Link>
          {state === "expanded" && (
            <div className="flex items-center gap-1.5 bg-black/80 text-white text-[10px] font-light tracking-widest uppercase px-2.5 py-1 rounded-lg w-fit mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Admin
            </div>
          )}
          <SidebarSeparator />
          {state === "expanded" && (
            <span className="text-[12px] text-gray-400 tracking-wider truncate">
              {email}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="gap-4">
          {adminLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  link.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(link.href)
                }
                tooltip={link.title}
              >
                <Link href={link.href}>
                  {iconMap[link.icon]}{" "}
                  <span className="text-[12px] tracking-widest uppercase">
                    {link.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 mb-10">
        <SidebarMenu>
          <SidebarMenuButton
            tooltip="Log Out"
            className="cursor-pointer"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
              router.refresh();
            }}
          >
            <PiSignOutLight size={20} className="text-red-600" />{" "}
            <span className="text-[12px] tracking-widest uppercase cursor-pointer text-red-600">
              Log Out
            </span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
      {/* TOGGLE */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 -translate-y-1/2 z-50 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-gray-100 cursor-pointer"
      >
        {state === "expanded" ? (
          <PiCaretDoubleLeftLight size={12} />
        ) : (
          <PiCaretDoubleRightLight size={12} />
        )}
      </button>
    </Sidebar>
  );
}
