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
        <Link href="/admin/products/new">Add Product</Link>
      </div>

      <ProductTable />
    </div>
  );
}
