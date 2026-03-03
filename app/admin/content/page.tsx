import { getHomepageSections } from "@/lib/admin/queries";
import ContentManager from "@/components/admin/ContentManager";

export default async function AdminContentPage() {
  const sections = await getHomepageSections();

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Homepage Content
      </h1>
      <ContentManager sections={sections ?? []} />
    </div>
  );
}
