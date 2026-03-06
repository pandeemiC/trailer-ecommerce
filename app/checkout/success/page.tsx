"use client";

import { useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-[13px] tracking-[0.3em] uppercase font-light">
        Thank you for your order!
      </h1>
      <p className="text-[11px] tracking-wider text-black/50 font-light max-w-[400px] text-center leading-6">
        Your payment was processed successfully. You will receive a confirmation
        email shortly.
      </p>
      <Link href="/">
        <button className="mt-4 px-10 py-3 text-white bg-black border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer">
          Continue Shopping
        </button>
      </Link>
    </main>
  );
}
