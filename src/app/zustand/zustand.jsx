import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  localUserData: null,
  myCart: [],

  // Function to add a bike rental to the cart
  add_to_cart: (addCart) => {
    set((state) => {
      const updatedCart = [...state.myCart, addCart]; // Append the new cart item
      console.log("Added to Cart:", addCart); // Log the new item being added
      console.log("Updated Cart:", updatedCart); // Log the entire updated cart
      return { myCart: updatedCart };
    });
  },

  // Function to get the current cart
  getCart: () => {
    const cart = get().myCart;
    console.log("Current Cart:", cart); // Log the current cart state
    return cart;
  },
}));
