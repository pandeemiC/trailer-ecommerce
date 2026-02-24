"use client";

import React from "react";
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

import useCartStore from "@/store/useCartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingBag() {
  const {
    items,
    addToCart,
    totalItems,
    removeFromCart,
    decreaseQuantity,
    totalPrice,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-screen pt-20">
      <div className="flex h-full px-20">
        {/* LEFT  */}
        <div className="flex-1 overflow-y-auto pt-10 pr-16">
          <h2 className="text-[13px] font-light tracking-widest uppercase mb-10">
            Shopping bag ({totalItems()})
          </h2>

          {items.length === 0 ? (
            <div className="flex flex-col items-center mt-20 gap-5">
              <p className="text-[11px] font-light tracking-widest uppercase text-black/50">
                Your shopping bag is empty
              </p>
              <Link href="/">
                <button className="w-[200px] py-3 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-black/10">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-6 py-6">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={240}
                    height={160}
                    className="object-cover"
                  />

                  {/* detaisl */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* title */}
                    <div className="flex justify-between">
                      <h3 className="text-[13px] font-light tracking-widest uppercase">
                        {item.product.name}
                      </h3>
                      <span className="text-[13px] font-light tracking-widest">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* qty */}
                    <p className="text-[11px] font-light uppercase text-black/30">
                      Trailer BOFA Collection
                    </p>
                    <p className="text-[10px] font-light tracking-widest text-black/50 uppercase">
                      Qty: {item.quantity}
                    </p>

                    {/* qty control */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setConfirmRemoveId(item.product.id)}
                        className="text-[10px] font-light tracking-widest uppercase underline underline-offset-4 cursor-pointer hover:text-black/50 transition-colors"
                      >
                        Remove
                      </button>

                      <div className="flex items-center border border-black/15">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              setConfirmRemoveId(item.product.id);
                            } else {
                              decreaseQuantity(item.product.id);
                            }
                          }}
                          className="px-3 py-1 text-[11px] font-light cursor-pointer hover:bg-black/5 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-[11px] font-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item.product)}
                          className="px-3 py-1 text-[11px] font-light cursor-pointer hover:bg-black/5 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-[350px] sticky top-50 self-start pt-10 pl-10 border-l border-black/10">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <span className="text-[11px] font-light tracking-widest uppercase">
                Subtotal
              </span>
              <span className="text-[11px] font-light tracking-widest">
                ${totalPrice().toFixed(2)}
              </span>
            </div>

            <button className="w-full py-3.5 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer">
              Proceed to Checkout
            </button>

            {/* payment icons */}
            <div className="flex items-center gap-3 mt-1">
              {/* Visa */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <path
                  d="M15.764 16.23H13.418L14.882 7.78H17.228L15.764 16.23Z"
                  fill="#15195A"
                />
                <path
                  d="M24.578 7.98C24.108 7.8 23.358 7.6 22.428 7.6C20.108 7.6 18.458 8.82 18.448 10.54C18.428 11.8 19.578 12.5 20.438 12.92C21.318 13.34 21.618 13.62 21.618 14C21.608 14.58 20.918 14.86 20.278 14.86C19.378 14.86 18.898 14.72 18.158 14.4L17.858 14.26L17.538 16.22C18.078 16.46 19.058 16.68 20.078 16.68C22.548 16.68 24.168 15.48 24.188 13.64C24.198 12.64 23.578 11.88 22.268 11.26C21.478 10.86 20.988 10.58 20.988 10.18C20.998 9.82 21.388 9.44 22.248 9.44C22.958 9.42 23.478 9.6 23.878 9.78L24.078 9.88L24.578 7.98Z"
                  fill="#15195A"
                />
                <path
                  d="M27.838 7.78H26.008C25.428 7.78 24.998 7.94 24.748 8.54L21.348 16.23H23.818L24.308 14.89H27.298L27.578 16.23H29.778L27.838 7.78ZM24.978 13.13C25.178 12.6 25.978 10.56 25.978 10.56C25.968 10.58 26.178 10.02 26.298 9.68L26.458 10.48C26.458 10.48 26.938 12.74 27.038 13.13H24.978Z"
                  fill="#15195A"
                />
                <path
                  d="M12.298 7.78L9.998 13.38L9.748 12.12C9.318 10.72 8.008 9.2 6.548 8.44L8.648 16.22H11.138L14.788 7.78H12.298Z"
                  fill="#15195A"
                />
                <path
                  d="M8.548 7.78H4.828L4.798 7.96C7.748 8.72 9.698 10.5 10.398 12.62L9.678 8.56C9.558 7.96 9.138 7.8 8.548 7.78Z"
                  fill="#F9A533"
                />
              </svg>
              {/* Mastercard */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <circle cx="15" cy="12" r="7" fill="#EB001B" />
                <circle cx="23" cy="12" r="7" fill="#F79E1B" />
                <path
                  d="M19 6.99C20.6569 8.34315 21.5 10.0706 21.5 12C21.5 13.9294 20.6569 15.6569 19 17.01C17.3431 15.6569 16.5 13.9294 16.5 12C16.5 10.0706 17.3431 8.34315 19 6.99Z"
                  fill="#FF5F00"
                />
              </svg>
              {/* Amex */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="#1F72CD"
                  stroke="#D9D9D9"
                />
                <path
                  d="M7 15.5H9.5L10 14.5L10.5 15.5H31V8.5H10.2L9.7 9.5L9.2 8.5H7V15.5Z"
                  fill="#1F72CD"
                />
                <text
                  x="19"
                  y="14"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  AMEX
                </text>
              </svg>
              {/* PayPal */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <text
                  x="19"
                  y="14"
                  textAnchor="middle"
                  fill="#003087"
                  fontSize="7"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  Pay
                </text>
                <text
                  x="29"
                  y="14"
                  textAnchor="middle"
                  fill="#009CDE"
                  fontSize="7"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  Pal
                </text>
              </svg>
              {/* Apple Pay */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="black"
                  stroke="#D9D9D9"
                />
                <path
                  d="M13.3 9.2C13.6 8.8 13.8 8.3 13.7 7.8C13.3 7.8 12.7 8.1 12.4 8.5C12.1 8.8 11.9 9.4 11.9 9.9C12.4 9.9 12.9 9.6 13.3 9.2Z"
                  fill="white"
                />
                <path
                  d="M13.7 10C13 10 12.4 10.4 12 10.4C11.6 10.4 11.1 10 10.5 10C9.6 10 8.5 10.7 8.5 12.5C8.5 13.5 8.9 14.6 9.4 15.3C9.8 15.8 10.2 16.3 10.7 16.3C11.2 16.3 11.4 16 12 16C12.6 16 12.8 16.3 13.4 16.3C13.9 16.3 14.3 15.8 14.7 15.3C15 14.9 15.2 14.5 15.2 14.4C15.2 14.4 14.2 14 14.2 12.9C14.2 11.9 14.9 11.5 15 11.4C14.5 10.7 13.8 10 13.7 10Z"
                  fill="white"
                />
                <text
                  x="22"
                  y="14.5"
                  fill="white"
                  fontSize="7"
                  fontFamily="Arial"
                  fontWeight="600"
                >
                  Pay
                </text>
              </svg>
              {/* Google Pay */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="37"
                  height="23"
                  rx="3.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <path
                  d="M18.8 12.2V14.1H18V8.5H20.1C20.7 8.5 21.2 8.7 21.6 9.1C22 9.5 22.2 9.9 22.2 10.5C22.2 11 22 11.5 21.6 11.9C21.2 12.3 20.7 12.4 20.1 12.4H18.8V12.2ZM18.8 9.3V11.5H20.1C20.5 11.5 20.8 11.4 21 11.1C21.3 10.9 21.4 10.6 21.4 10.4C21.4 10.1 21.3 9.8 21 9.6C20.8 9.4 20.5 9.3 20.1 9.3H18.8Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.7 10.4C25.3 10.4 25.8 10.6 26.2 11C26.5 11.3 26.7 11.8 26.7 12.4V14.1H25.9V13.5C25.6 13.9 25.2 14.2 24.6 14.2C24.1 14.2 23.7 14 23.4 13.8C23.1 13.5 23 13.2 23 12.8C23 12.4 23.1 12.1 23.4 11.8C23.7 11.6 24.1 11.4 24.7 11.4H25.9V11.3C25.9 10.7 25.5 10.4 24.9 10.4C24.5 10.4 24.1 10.6 23.8 10.9L23.3 10.4C23.7 10 24.2 10.4 24.7 10.4Z"
                  fill="#4285F4"
                />
                <path
                  d="M28.8 14.2C28.3 14.2 27.9 14 27.6 13.7L28.1 13.2C28.3 13.4 28.5 13.5 28.8 13.5C29.1 13.5 29.3 13.4 29.3 13.1C29.3 12.9 29.1 12.8 28.7 12.7C28.1 12.5 27.7 12.3 27.7 11.7C27.7 11.1 28.2 10.7 28.8 10.7C29.3 10.7 29.6 10.9 29.9 11.1L29.4 11.6C29.3 11.5 29.1 11.4 28.8 11.4C28.6 11.4 28.4 11.5 28.4 11.7C28.4 11.9 28.6 12 29 12.1C29.6 12.3 30 12.5 30 13.1C30 13.7 29.5 14.2 28.8 14.2Z"
                  fill="#4285F4"
                />
                <path
                  d="M14.4 12C14.4 11.1 13.7 10.4 12.8 10.4C11.9 10.4 11.2 11.1 11.2 12C11.2 12.9 11.9 13.6 12.8 13.6C13.3 13.6 13.7 13.4 14 13.1L13.5 12.6C13.3 12.8 13.1 12.9 12.8 12.9C12.4 12.9 12.1 12.6 12 12.2H14.4V12Z"
                  fill="#EA4335"
                />
                <path
                  d="M16.5 10.5C16.1 10.5 15.8 10.6 15.6 10.9V10.5H14.8V14.1H15.6V12.1C15.6 11.5 15.9 11.2 16.3 11.2C16.7 11.2 16.9 11.5 16.9 11.9V14.1H17.7V11.7C17.7 11 17.3 10.5 16.5 10.5Z"
                  fill="#FBBC04"
                />
                <circle cx="10" cy="12" r="1.2" fill="#34A853" />
              </svg>
            </div>

            {/* faq */}
            <div className="flex flex-col gap-4 mt-1 border-t border-black/10 pt-6">
              <details className="group">
                <summary className="text-[10px] font-light tracking-widest uppercase cursor-pointer list-none flex justify-between items-center">
                  Shipping & Returns
                  <span className="text-[10px] group-open:rotate-180 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-[10px] font-light tracking-wider text-black/50 mt-3 leading-5">
                  Free standard shipping on all orders. Returns accepted within
                  30 days of purchase.
                </p>
              </details>

              <details className="group">
                <summary className="text-[10px] font-light tracking-widest uppercase cursor-pointer list-none flex justify-between items-center">
                  Payment Methods
                  <span className="text-[10px] group-open:rotate-180 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-[10px] font-light tracking-wider text-black/50 mt-3 leading-5">
                  We accept Visa, Mastercard, American Express, PayPal, and
                  Apple Pay.
                </p>
              </details>

              <details className="group">
                <summary className="text-[10px] font-light tracking-widest uppercase cursor-pointer list-none flex justify-between items-center">
                  Need Help?
                  <span className="text-[10px] group-open:rotate-180 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-[10px] font-light tracking-wider text-black/50 mt-3 leading-5">
                  Honestly I couldn&apos;t help you if I wanted to but check out
                  the amazing Stripe feature though.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
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
    </main>
  );
}
