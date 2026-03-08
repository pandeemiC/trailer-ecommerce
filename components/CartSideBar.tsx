"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { createCheckoutSession } from "@/lib/checkout/actions";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartSideBar() {
  const [mounted, setMounted] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCartOpen(false);
  }, [pathname, setCartOpen]);

  return (
    <div>
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <button className="relative cursor-pointer [&_svg]:w-[16px] [&_svg]:h-[16px] 2xl:[&_svg]:w-[20px] 2xl:[&_svg]:h-[20px] min-[2560px]:[&_svg]:w-[24px] min-[2560px]:[&_svg]:h-[24px]">
            <ShoppingBag size={16} strokeWidth={1.5} />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col bg-white dark:bg-neutral-800 h-full !border-none !w-full sm:!w-[425px] !max-w-none !p-0 !gap-0"
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
                className="flex gap-4 py-4 border-b border-black/10 dark:border-white/10"
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
                        onClick={() => {
                          if (item.quantity === 1) {
                            setConfirmRemoveId(item.product.id);
                          } else {
                            decreaseQuantity(item.product.id);
                          }
                        }}
                        className="w-5 h-5 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-[10px] rounded-full cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-light tracking-widest text-black/50 dark:text-white/50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item.product)}
                        className="w-5 h-5 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-[10px] rounded-full cursor-pointer"
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
          <div className="border-t border-black/20 dark:border-white/20 px-5 pt-4 pb-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-light tracking-widest uppercase">
                Subtotal
              </span>
              <span className="text-[11px] font-light tracking-widest">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <Link href="/checkout">
              <button
                className={
                  totalItems() === 0 || loading
                    ? "w-full py-3 text-white bg-gray-400 border border-gray-400 uppercase text-[11px] tracking-widest font-light cursor-not-allowed transition-colors"
                    : "w-full py-3.5 text-black dark:text-white bg-white dark:bg-white/10 border border-black dark:border-white/20 uppercase text-[11px] tracking-widest font-light hover:bg-gray-50 dark:hover:bg-white/20 transition-colors cursor-pointer"
                }
                disabled={totalItems() === 0 || loading}
              >
                Continue
              </button>
            </Link>
            <Link href="/shopping-bag">
              <button className="add-to-cart-btn-reverse w-full mt-2">
                Shopping Bag
              </button>
            </Link>
            <p className="text-[9px] text-black/60 dark:text-white/60 font-light mt-3">
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
        <AlertDialog
          open={confirmRemoveId !== null}
          onOpenChange={(open) => {
            if (!open) setConfirmRemoveId(null);
          }}
        >
          <AlertDialogContent className="rounded-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this item from your bag?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer rounded-none">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (confirmRemoveId) removeFromCart(confirmRemoveId);
                  setConfirmRemoveId(null);
                }}
                className="cursor-pointer rounded-none"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Sheet>
    </div>
  );
}
