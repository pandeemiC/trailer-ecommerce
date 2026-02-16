import { navigationData, Category } from "@/lib/navigationData";
import CategoryNav from "@/components/CategoryNav";

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryKey = category.toUpperCase() as Category;
  const categoryData = navigationData[categoryKey];

  if (!categoryData) return <div>Category not found</div>;

  return (
    <div>
      <CategoryNav links={categoryData.links} basePath={categoryData.basePath} />
      {children}
    </div>
  );
}
