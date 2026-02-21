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
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

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

      removeFromCart: (productId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      decreaseQuantity: (productId: string) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export default useCartStore;
