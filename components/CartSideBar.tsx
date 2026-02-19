"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CartSideBar() {
  const [mounted, setMounted] = useState(false);

  const { items, totalItems, removeFromCart, totalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="relative cursor-pointer">
            <ShoppingBag size={16} strokeWidth={1.5} />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col bg-white h-full opacity-100"
        >
          <SheetHeader>
            <SheetTitle className="product-title">Shopping Cart</SheetTitle>
          </SheetHeader>

          {/* CONTENTS */}

          {items.length === 0 && (
            <h1 className="product-title">Shopping Cart is Empty</h1>
          )}
          {/* TODO: PRODUCT NAME / PRODUCT PRICE / PRODUCT QUANTITY */}
          {items.map((item) => (
            <div key={item.product.id} className="">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={320}
                height={320}
              />
            </div>
          ))}
          {/* TODO: CART TOTAL / SHOPPING BAG BTN / CONTINUE BTN / POLICY (PRADA) <P> TAG */}
        </SheetContent>
      </Sheet>
    </div>
  );
}
