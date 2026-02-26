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
} from "@/components/ui/sidebar";

import {
  PiShoppingBagLight,
  PiUserLight,
  PiGearLight,
  PiQuestionLight,
  PiSignOutLight,
} from "react-icons/pi";

const iconMap: Record<string, React.ReactNode> = {
  PiShoppingBagLight: <PiShoppingBagLight size={18} />,
  PiUserLight: <PiUserLight size={18} />,
  PiGearLight: <PiGearLight size={18} />,
  PiQuestionLight: <PiQuestionLight size={18} />,
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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="text-[12px] font-medium tracking-wider truncate">
            {name || "Welcome"}
          </span>
          <span className="text-[10px] text-gray-400 tracking-wider truncate">
            {email}
          </span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="p-2">
        <SidebarMenu>
          {accountLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={link.title}
              >
                <Link href={link.href}>
                  {iconMap[link.icon]}{" "}
                  <span className="text-[11px] tracking-widest uppercase">
                    {link.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log Out"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
                router.refresh();
              }}
            >
              <PiSignOutLight size={18} />{" "}
              <span className="text-[11px] tracking-widest uppercase">
                Log Out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
