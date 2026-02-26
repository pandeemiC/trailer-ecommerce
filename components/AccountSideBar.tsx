"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { accountLinks } from "@/lib/navigationData";

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
  PiShoppingBagLight,
  PiUserLight,
  PiGearLight,
  PiQuestionLight,
  PiSignOutLight,
  PiCaretDoubleRightLight,
  PiCaretDoubleLeftLight,
} from "react-icons/pi";

const iconMap: Record<string, React.ReactNode> = {
  PiShoppingBagLight: <PiShoppingBagLight size={20} />,
  PiUserLight: <PiUserLight size={20} />,
  PiGearLight: <PiGearLight size={20} />,
  PiQuestionLight: <PiQuestionLight size={20} />,
};

export default function AccountSideBar({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
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
          <SidebarSeparator />
          {state === "expanded" && (
            <>
              <span className="text-[14px] font-medium tracking-wider truncate">
                {name || "Welcome"}
              </span>
              <span className="text-[12px] text-gray-400 tracking-wider truncate">
                {email}
              </span>
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="gap-4">
          {accountLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
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
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log Out"
              className="cursor-pointer"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
                router.refresh();
              }}
            >
              <PiSignOutLight size={20} />{" "}
              <span className="text-[12px] tracking-widest uppercase cursor-pointer">
                Log Out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
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
