import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // admin check
  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!admin) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AdminSidebar email={user.email ?? ""} />
      <SidebarInset>
        <main className="px-10 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
