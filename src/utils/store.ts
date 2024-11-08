import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          // Update existing product in the cart
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                }
              : product
          );

          const newTotalItems = updatedProducts.reduce(
            (total, product) => total + product.quantity,
            0
          );

          const newTotalPrice = updatedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );

          set({
            products: updatedProducts,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          });
        } else {
          // Add new product to the cart with specified quantity
          const updatedProducts = [...products, { ...item, quantity: item.quantity }];
          const newTotalItems = updatedProducts.reduce(
            (total, product) => total + product.quantity,
            0
          );

          const newTotalPrice = updatedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );

          set({
            products: updatedProducts,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          });
        }
      },

      removeFromCart(item) {
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) => product.id !== item.id
          );

          const newTotalItems = updatedProducts.reduce(
            (total, product) => total + product.quantity,
            0
          );

          const newTotalPrice = updatedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );

          return {
            products: updatedProducts,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          };
        });
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
