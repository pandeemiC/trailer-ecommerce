import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import AccountSideBar from "@/components/AccountSideBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AccountSideBar
        email={user.email ?? ""}
        name={user.user_metadata?.full_name ?? user.user_metadata?.name ?? ""}
      />
      <SidebarInset>
        <main className="px-10 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
