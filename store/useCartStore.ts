import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  // TODO: removeFromCart, clearCart, totalItems, totalPrice
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return { items: [...state.items, { product, quantity: 1 }] };
        }),

      // TODO: removeFromCart, clearCart, totalItems, totalPrice
    }),
    { name: "cart" },
  ),
);

export default useCartStore;
