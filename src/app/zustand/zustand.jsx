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

export const loadGhostTourFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("ghostTour");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Save the tour to localStorage
export const saveGhostTourToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ghostTour", JSON.stringify(cart));
  }
};

export const loadRentalInfoFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("rentalInfo");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Save the tour to localStorage
export const saveRentalInfoToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("rentalInfo", JSON.stringify(cart));
  }
};

export const useCartStore = create((set, get) => ({
  localBilling: [],
  localRental: [],
  localConfirm: [],
  myCart: loadCartFromLocalStorage(), // Load the cart from localStorage on initialization
  tour: loadTourFromLocalStorage(),
  ghostTour: loadGhostTourFromLocalStorage(),
  rentalInfos: loadRentalInfoFromLocalStorage(),

  setbillingInfo: (infos) => {
    set((state) => {
      const updatedInfos = [...state.localBilling, infos];
      console.log("rental infos ", updatedInfos);
      return { localBilling: updatedInfos };
    });
  },
  getbillingInfo: () => {
    return get().localBilling();
  },

  setrentInfo: (infos) => {
    set((state) => {
      const updatedInfos = [...state.localRental, infos];
      console.log("rental infos ", updatedInfos);
      return { localRental: updatedInfos };
    });
  },

  submitRental: (info) => {
    set((state) => {
      const getConfirm = { ...info }; // Spread the new info into an object
      const updatedRentalInfo = {
        ...get().localBilling[0], // Assuming localBilling contains only one object
        ...get().localRental[0], // Assuming localRental contains only one object
        ...getConfirm, // Spread the confirm info
      };

      console.log("Merged Rental Info: ", updatedRentalInfo);
      saveRentalInfoToLocalStorage(updatedRentalInfo); // Save the object to localStorage
      return { rentalInfos: updatedRentalInfo }; // Store the updated rental info as an object
    });
  },

  clientInformation: () => {
    return get().rentalInfos;
  },

  // Function to add a bike rental to the cart
  add_to_cart: (addCart) => {
    set((state) => {
      const updatedCart = [...state.myCart, addCart]; // Append the new cart item
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
      updatedCart.splice(index, 1);
      saveCartToLocalStorage(updatedCart);
      return { myCart: updatedCart };
    });
  },

  // Function to get the current cart
  getCart: () => {
    const cart = get().myCart;
    return cart;
  },

  // Function to add a tour to the tour list
  add_booking: (addBooking) => {
    set((state) => {
      const updatedTour = [...state.tour, addBooking]; // Append the new tour item
      saveTourToLocalStorage(updatedTour);
      return { tour: updatedTour };
    });
  },

  // Function to cancel a booking
  cancelBooking: (index) => {
    set((state) => {
      const updatedTour = [...state.tour];
      updatedTour.splice(index, 1);
      saveTourToLocalStorage(updatedTour);
      return { tour: updatedTour };
    });
  },

  // Function to add a tour to the tour list
  add_ghost_tour: (addBooking) => {
    set((state) => {
      const updatedTour = [...state.ghostTour, addBooking];
      console.log("Added to Tour:", addBooking);
      console.log("Updated Tour:", updatedTour);
      saveGhostTourToLocalStorage(updatedTour);
      return { ghostTour: updatedTour };
    });
  },

  // Function to cancel a booking
  cancel_ghost_tour: (index) => {
    set((state) => {
      const updatedTour = [...state.tour];
      updatedTour.splice(index, 1);
      saveGhostTourToLocalStorage(updatedTour);
      return { ghostTour: updatedTour };
    });
  },
}));
