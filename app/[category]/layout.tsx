import Link from "next/link";
import { navigationData, Category } from "@/components/ui/navigationData";

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
      <nav className="fixed top-1/7 right-0 gap-4 p-4">
        {categoryData.links.map((link) => {
          const fullHref = link.href
            ? `${categoryData.basePath}${link.href.startsWith("/") ? "" : "/"}${
                link.href
              }`
            : categoryData.basePath;

          return (
            <Link
              key={link.title}
              href={fullHref}
              className="text-[12px] font-light mx-5"
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
