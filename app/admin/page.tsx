import { getAdminStats, getRecentProducts } from "@/lib/admin/queries";
import Image from "next/image";
import Link from "next/link";

import {
  PiPackageLight,
  PiTagLight,
  PiTreeStructureLight,
} from "react-icons/pi";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const recentProducts = await getRecentProducts();

  const statCards = [
    {
      label: "Products",
      value: stats.productCount,
      icon: <PiPackageLight size={20} />,
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: stats.categoryCount,
      icon: <PiTagLight size={20} />,
      href: "/admin/categories",
    },
    {
      label: "Subcategories",
      value: stats.subCategoryCount,
      icon: <PiTreeStructureLight size={20} />,
      href: "/admin/categories",
    },
  ];

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Dashboard
      </h1>

      {/* cards */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-gray-200 p-6 hover:border-black transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] tracking-widest uppercase text-gray-400">
                {stat.label}
              </span>
              {stat.icon}
            </div>
            <p className="text-[32px] font-light">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* recents */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[13px] tracking-[0.2em] uppercase">
            Recent Products
          </h2>
          <Link
            href="/admin/products"
            className="text-[11px] tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="border border-gray-200">
          {/* table header */}
          <div className="grid grid-cols-[60px_1fr_1fr_100px] gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50">
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Image
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Name
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Category
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Price
            </span>
          </div>

          {/* table rows */}
          {recentProducts && recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <Link
                key={product.key}
                href={`/admin/products/${product.id}/edit`}
                className="grid grid-cols-[60px_1fr_1fr_100px]"
              >
                <div className="w-[40px] h-[50px] relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[12px] tracking-wider text-gray-400">
                  {product.name}
                </span>
                <span className="text-[12px] tracking-wider text-gray-400">
                  {product.categories?.name ?? "-"}
                </span>
                <span className="text-[12px] tracking-wider text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              </Link>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px] tracking-wider text-gray-400">
                No products yet.
              </p>
              <Link
                href="/admin/products/new"
                className="text-[11px] tracking-widest uppercase underline mt-2 inline-block"
              >
                Add your first products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
