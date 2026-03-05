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
        className={`${colClass} relative ${aspectClass} overflow-hidden group`}
      >
        <Image
          src="/wviewall.jpg"
          alt="View All"
          fill
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <span className="text-white text-[13px] tracking-[0.3em] uppercase font-light group-hover:tracking-[0.5em] transition-all duration-500">
            View All
          </span>
        </div>
      </Link>
    );
  }

  // grey placeholder
  if (!tile.image) {
    return (
      <Link
        key={key ?? tile.id}
        href={`/${categorySlug}/${tile.slug}`}
        className={`${colClass} relative ${aspectClass} overflow-hidden group bg-gray-100 flex items-end p-6 md:p-8`}
      >
        <span className="text-black/60 text-[13px] md:text-[15px] tracking-[0.3em] uppercase font-normal">
          {tile.name}
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
      <Image
        src={tile.image}
        alt={tile.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="text-white text-[13px] md:text-[15px] tracking-[0.3em] uppercase font-normal drop-shadow-md">
          {tile.name}
        </span>
      </div>
    </Link>
  );
}

function renderBentoRows(
  tiles: Tile[],
  categorySlug: string,
  allSubcategories: Subcategory[],
) {
  const rows: React.ReactNode[] = [];
  let i = 0;
  let patternIndex = 0;

  while (i < tiles.length) {
    const pattern = patternIndex % 3;

    if (pattern === 0 && i + 1 < tiles.length) {
      // 1= 1biggies 2/3 + right column (small tile + subcategory links)
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-3 gap-4">
          {renderTile(tiles[i], categorySlug, "aspect-[4/5]", "col-span-2")}
          <div className="col-span-1 flex flex-col gap-4">
            {renderTile(tiles[i + 1], categorySlug, "aspect-square", "")}
            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
              <ul className="flex flex-col items-center gap-2.5">
                {allSubcategories.map((sc) => (
                  <li key={sc.id}>
                    <Link
                      href={`/${categorySlug}/${sc.slug}`}
                      className="text-[10px] md:text-[12px] tracking-[0.25em] uppercase font-light hover:tracking-[0.4em] transition-all duration-300 text-black/60 hover:text-black text-center"
                    >
                      {sc.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/search?category=${categorySlug}`}
                    className="text-[10px] md:text-[12px] tracking-[0.25em] uppercase font-light hover:tracking-[0.4em] transition-all duration-300 text-black/60 hover:text-black border-b border-black/20 pb-1 inline-block"
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </div>
          </div>
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
    <main className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-20">
      <h1 className="absolute text-[42px] md:text-[70px] font-light tracking-widest text-black/10 italic uppercase z-10 left-0 top-32 flex flex-col leading-none">
        {categoryData.name.split("").map((letter: string, i: number) => (
          <span key={i}>{letter}</span>
        ))}
      </h1>

      <div className="flex flex-col gap-4">
        {renderBentoRows(tiles, category, subcategories)}
      </div>
    </main>
  );
}
