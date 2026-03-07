import { getAdminProducts } from "@/lib/admin/queries";
import ProductTable from "@/components/admin/ProductTable";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-[22px] font-light tracking-[0.2em] uppercase">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 text-white dark:text-black bg-black dark:bg-white border-black dark:border-white uppercase text-[11px] tracking-widest font-light hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
        >
          Add Product
        </Link>
      </div>

      <ProductTable products={products ?? []} />
    </div>
  );
}
