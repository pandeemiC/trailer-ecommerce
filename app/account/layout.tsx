import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import AccountSideBar from "@/components/AccountSideBar";

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
    <div>
      <AccountSideBar
        email={user.email ?? ""}
        name={user.user_metadata?.full_name ?? user.user_metadata?.name ?? ""}
      />
      <main className="flex-1 px-20 py-16">{children}</main>
    </div>
  );
}
