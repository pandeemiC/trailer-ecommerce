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

  const {
    items,
    addToCart,
    totalItems,
    removeFromCart,
    decreaseQuantity,
    totalPrice,
    isCartOpen,
    setCartOpen,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
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
          className="flex flex-col bg-white h-full !border-none !w-[425px] !max-w-none !p-0 !gap-0"
        >
          <SheetHeader className="p-5 pb-3">
            <SheetTitle className="text-[11px] font-light tracking-widest uppercase text-left">
              Shopping Bag ({totalItems()})
            </SheetTitle>
          </SheetHeader>

          {/* area */}
          <div className="flex-1 overflow-y-auto px-5">
            {items.length === 0 && (
              <p className="text-[11px] font-light tracking-widest uppercase mt-10 flex items-center justify-center h-3/4">
                Your cart is empty
              </p>
            )}

            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 py-4 border-b border-black/10"
              >
                {/* left image */}
                <div className="w-[100px] shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={100}
                    height={130}
                    className="object-cover w-full"
                  />
                </div>

                {/*  details - right */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h1 className="text-[11px] font-light tracking-widest uppercase">
                      {item.product.name}
                    </h1>
                    <h3 className="text-[11px] font-light tracking-widest mt-1">
                      ${item.product.price}
                    </h3>
                    <div className="flex flex-row items-center gap-3 mt-9">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-light tracking-widest text-black/50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item.product)}
                        className="w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[10px] font-light tracking-widest underline cursor-pointer self-start mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* footer of cart */}
          <div className="border-t border-black/20 px-5 pt-4 pb-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-light tracking-widest uppercase">
                Subtotal
              </span>
              <span className="text-[11px] font-light tracking-widest">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <button className="add-to-cart-btn w-full">Continue</button>
            <button className="add-to-cart-btn-reverse w-full mt-2">
              Shopping Bag
            </button>
            <p className="text-[9px] text-black/60 font-light mt-3">
              By continuing, I declare that I have read and accept the{" "}
              <span className="underline cursor-pointer">
                Purchase Conditions
              </span>{" "}
              and understand Trailer&apos;s{" "}
              <span className="underline cursor-pointer">
                Privacy and Cookie Policy
              </span>
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
