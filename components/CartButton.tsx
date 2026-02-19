"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/store/useCartStore";

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button className="relative cursor-pointer">
      <ShoppingBag size={16} strokeWidth={1.5} />
      {mounted && totalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems()}
        </span>
      )}
    </button>
  );
}
