"use client";

import { Product } from "@/lib/types";
import useCartStore from "@/store/useCartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full py-3 bg-white border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black hover:text-white transition-colors cursor-pointer"
    >
      Add To Cart
    </button>
  );
}
