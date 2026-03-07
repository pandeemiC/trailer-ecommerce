"use client";

import { useState } from "react";
import { ProductWithSubcategories } from "@/lib/types";
import { deleteProduct } from "@/lib/admin/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiPencilSimpleLight, PiTrashLight } from "react-icons/pi";

export default function ProductTable({
  products,
}: {
  products: ProductWithSubcategories[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(productId);

    try {
      await deleteProduct(productId);
      router.refresh();
    } catch (err) {
      console.error("Delete failed: ", err);
    }
    setDeleting(null);
  };
  return (
    <div>
      {/* search */}
      <input
        type="text"
        value={search}
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        className="auth-input mb-6 max-w-sm"
      />

      {/* table */}
      <div className="border border-gray-200 dark:border-neutral-700">
        <div className="grid grid-cols-[60px_1fr_1fr_100px_120px_80px] gap-4 px-4 py-3 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
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
          <span className="text-[10px] tracking-widest uppercase text-gray-400">
            Featured
          </span>
          <span className="text-[10px] tracking-widest uppercase text-gray-400">
            Actions
          </span>
        </div>

        {/* rows */}
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[60px_1fr_1fr_100px_120px_80px] gap-4 px-4 border-b border-gray-100 dark:border-neutral-700 last:border-b-0 items-center hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-[40px] h-[50px] relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[12px] tracking-wider truncate">
                {product.name}
              </span>
              <span className="text-[12px] tracking-wider truncate">
                {product.categories?.name ?? "-"}
              </span>
              <span className="text-[12px] tracking-wider truncate">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[12px] tracking-wider truncate">
                {product.featured_type ?? "-"}
              </span>
              <div className="flex items-center justify-end gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors"
                >
                  <PiPencilSimpleLight size={17} />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                  className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600 cursor-pointer disabled:opacity-50"
                >
                  <PiTrashLight size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-[12px] tracking-wider text-gray-400">
              {search ? "No products match your search." : "No products yet."}
            </p>
          </div>
        )}
      </div>

      <p className="text-[10px] tracking-wider text-gray-400 mt-4">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
