import { create } from "zustand";
import type { Product } from "../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          },
        ],
      };
    });
  },

  increaseQuantity: (productId) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    }));
  },

  decreaseQuantity: (productId) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== productId
      ),
    }));
  },
}));

export default useCartStore;