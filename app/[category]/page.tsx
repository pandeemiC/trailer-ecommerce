import { getCategoryBySlug, getSubCategories } from "@/lib/queries";
import { Subcategory } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Tile = Subcategory | "view-all";

function renderTile(
  tile: Tile,
  categorySlug: string,
  aspectClass: string,
  colClass: string,
  key?: number,
) {
  if (tile === "view-all") {
    return (
      <Link
        key={key ?? "view-all"}
        href={`/search?category=${categorySlug}`}
        className={`${colClass} relative ${aspectClass} overflow-hidden group bg-black flex items-end justify-start p-8`}
      >
        <span className="text-white text-[13px] tracking-[0.3em] uppercase font-light group-hover:tracking-[0.5em] transition-all duration-500">
          View All
        </span>
      </Link>
    );
  }

  return (
    <Link
      key={key ?? tile.id}
      href={`/${categorySlug}/${tile.slug}`}
      className={`${colClass} relative ${aspectClass} overflow-hidden group`}
    >
      {tile.image ? (
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="text-white text-[11px] md:text-[13px] tracking-[0.3em] uppercase font-light">
          {tile.name}
        </span>
      </div>
    </Link>
  );
}

function renderBentoRows(tiles: Tile[], categorySlug: string) {
  const rows: React.ReactNode[] = [];
  let i = 0;
  let patternIndex = 0;

  while (i < tiles.length) {
    const pattern = patternIndex % 3;

    if (pattern === 0 && i + 1 < tiles.length) {
      // 1= 1biggies 2/3 1 small 1/3
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-3 gap-4">
          {renderTile(tiles[i], categorySlug, "aspect-[4/5]", "col-span-2")}
          {renderTile(tiles[i + 1], categorySlug, "aspect-[4/5]", "col-span-1")}
        </div>,
      );
      i += 2;
    } else if (pattern === 1 && i + 2 < tiles.length) {
      // 2= 1 small 1/3 + 1 small 1/3 + 1 biggie
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-3 gap-4">
          {renderTile(tiles[i], categorySlug, "aspect-[2/3]", "col-span-1")}
          {renderTile(tiles[i + 1], categorySlug, "aspect-[2/3]", "col-span-1")}
          {renderTile(tiles[i + 2], categorySlug, "aspect-[2/3]", "col-span-1")}
        </div>,
      );
      i += 3;
    } else if (pattern === 2) {
      // full hero
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-1 gap-4">
          {renderTile(tiles[i], categorySlug, "aspect-[21/9]", "col-span-1")}
        </div>,
      );
      i += 1;
    } else {
      const remaining = tiles.slice(i);
      rows.push(
        <div
          key={`row-${i}`}
          className={`grid gap-4 ${remaining.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
        >
          {remaining.map((tile, idx) =>
            renderTile(tile, categorySlug, "aspect-[21/9]", "col-span-1", idx),
          )}
        </div>,
      );
      i = tiles.length;
    }

    patternIndex++;
  }

  return rows;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await getCategoryBySlug(category);
  if (!categoryData) notFound();

  const subcategories = await getSubCategories(categoryData.id);

  if (!subcategories || subcategories.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[13px] tracking-[0.3em] uppercase text-gray-400">
          No collections available
        </p>
      </main>
    );
  }

  const tiles: Tile[] = [...subcategories, "view-all"];

  return (
    <main className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-20">
      <h1 className="text-[42px] md:text-[70px] font-light tracking-widest uppercase -mb-8 md:-mb-10 z-10 relative right-20 top-20">
        {categoryData.name}
      </h1>

      <div className="flex flex-col gap-4">
        {renderBentoRows(tiles, category)}
      </div>
    </main>
  );
}
