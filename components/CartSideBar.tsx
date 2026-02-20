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
          className="flex flex-col bg-white h-full opacity-100 overflow-y-auto !border-none !w-[425px] !max-w-none items-center"
        >
          <SheetHeader>
            <SheetTitle className="product-title item-start">
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          {/* CONTENTS */}

          {items.length === 0 && (
            <h1 className="product-title">Shopping Cart is Empty</h1>
          )}
          {/* TODO: PRODUCT NAME / PRODUCT PRICE / PRODUCT QUANTITY */}
          {items.map((item) => (
            <div key={item.product.id} className="flex-1">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={320}
                height={320}
              />
              <h1 className="product-page-title">{item.product.name}</h1>
              <h3 className="product-page-title">Qty: {item.quantity}</h3>
              <h3 className="product-page-title">${item.product.price}</h3>
            </div>
          ))}
          {/* TODO: CART TOTAL / SHOPPING BAG BTN / CONTINUE BTN / POLICY (PRADA) <P> TAG */}
          <button className="add-to-cart-btn">Continue</button>
          <button className="add-to-cart-btn-reverse">Shopping Bag</button>
          <p className="text-[10px] text-black/80 font-light">
            By continuing, I declare that I have read and accept the{" "}
            <span className="underline cursor-pointer">
              Purchase Conditions
            </span>{" "}
            and understand Trailer&apos;s{" "}
            <span className="underline cursor-pointer">
              Privacy and Cookie Policy
            </span>
          </p>
        </SheetContent>
      </Sheet>
    </div>
  );
}
