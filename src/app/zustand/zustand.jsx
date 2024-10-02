import { create } from "zustand";

// Load the cart from localStorage
export const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("myCart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Save the cart to localStorage
export const saveCartToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }
};

export const loadTourFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("tour");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Save the tour to localStorage
export const saveTourToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tour", JSON.stringify(cart));
  }
};

export const useCartStore = create((set, get) => ({
  localUserData: null,
  bookingRate: "",
  dateFrom: "",
  myCart: loadCartFromLocalStorage(), // Load the cart from localStorage on initialization
  tour: loadTourFromLocalStorage(),

  // Function to add a bike rental to the cart
  add_to_cart: (addCart) => {
    set((state) => {
      const updatedCart = [...state.myCart, addCart]; // Append the new cart item
      console.log("Added to Cart:", addCart); // Log the new item being added
      console.log("Updated Cart:", updatedCart); // Log the entire updated cart
      saveCartToLocalStorage(updatedCart); // Save the updated cart to localStorage
      return { myCart: updatedCart };
    });
  },

  // Function to update the cart item
  updateCart: (index, updatedItem) => {
    set((state) => {
      const updatedCart = [...state.myCart];
      updatedCart[index] = {
        ...updatedCart[index],
        ...updatedItem,
      };
      saveCartToLocalStorage(updatedCart);
      return { myCart: updatedCart };
    });
  },

  // Function to delete an item from the cart if qty is 0
  deleteCart: (index) => {
    set((state) => {
      const updatedCart = [...state.myCart];
      updatedCart.splice(index, 1); // Remove the item at the specified index
      saveCartToLocalStorage(updatedCart); // Save the updated cart to localStorage
      return { myCart: updatedCart };
    });
  },

  // Function to get the current cart
  getCart: () => {
    const cart = get().myCart;
    console.log("Current Cart:", cart); // Log the current cart state
    return cart;
  },

  // Set the booking rate
  set_book_this_rate: (rate) => {
    set((state) => ({ bookingRate: rate }));
  },

  // Get the booking rate
  get_book_this_rate: () => {
    console.log("Results ", get().bookingRate);
    return get().bookingRate;
  },

  // Set the booking date
  set_book_this_date: (date) => {
    set((state) => ({ dateFrom: date }));
  },

  // Get the booking date
  get_book_this_date: () => {
    return get().dateFrom;
  },

  // Function to add a tour to the tour list
  add_booking: (addBooking) => {
    set((state) => {
      const updatedTour = [...state.tour, addBooking]; // Append the new tour item
      console.log("Added to Tour:", addBooking); // Log the new item being added
      console.log("Updated Tour:", updatedTour); // Log the entire updated tour list
      saveTourToLocalStorage(updatedTour); // Save the updated tour list to localStorage
      return { tour: updatedTour };
    });
  },

  // Function to cancel a booking
  cancelBooking: (index) => {
    set((state) => {
      const updatedTour = [...state.tour];
      updatedTour.splice(index, 1); // Remove the item at the specified index
      saveTourToLocalStorage(updatedTour); // Save the updated tour list to localStorage
      return { tour: updatedTour };
    });
  },
}));
