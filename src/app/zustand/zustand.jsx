import { create } from "zustand";
import { persist } from "zustand/middleware";
import { firestore, auth } from "../firebaseConfig/config"; // Ensure auth is imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Define the initial state for userData
const initialUserData = {
  myCart: [],
  tour: [],
  ghostTour: [],
  rentalInfo: [],
};

// Zustand store with persist middleware
export const useCartStore = create(
  persist(
    (set, get) => ({
      userData: initialUserData,

      // Register function with corrected auth and document creation
      register: async (email, password, name) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const uid = userCredential.user.uid;
          const userRef = doc(firestore, "users", uid);

          // Store user data in Firestore with UID and name
          await setDoc(userRef, { name, email });
          console.log("User registered and data saved to Firestore.");
        } catch (error) {
          console.error("Registration error:", error);
        }
      },

      login: async (email, password) => {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          // Fetch user data from Firestore
          const userRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            set({
              userData: userDoc.data(), // Update Zustand with Firestore user data
              isLoggedIn: true, // Set login state
              authError: null, // Clear any previous error messages
            });
            alert("User is login!!");
            return true; // Indicate successful login
          } else {
            console.error("User data not found in Firestore.");
            set({ authError: "User data not found." });
            return false;
          }
        } catch (error) {
          console.error("Failed to login:", error);
          set({
            authError: "Login failed. Check your credentials and try again.",
          });
          return false;
        }
      },

      getUserName: async () => {
        try {
          const user = auth.currentUser; // Ensure the current authenticated user is available
          if (user) {
            const userRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({ userName: userData.name });
            } else {
              console.error("User data not found.");
              set({ userName: "Unknown Name" });
            }
          }
        } catch (error) {
          console.error("Failed to fetch username:", error);
        }
      },

      logout: () => {
        auth
          .signOut()
          .then(() => {
            set({
              userData: initialUserData, // Reset user data
              isLoggedIn: false, // Update login state
              authError: null, // Clear any previous error messages
            });
            alert("User logged out.");
          })
          .catch((error) => {
            console.error("Logout error:", error);
            set({ authError: "Failed to log out. Please try again." });
          });
      },

      // Update a specific field in userData
      updateUserData: (key, value) => {
        set((state) => ({
          userData: { ...state.userData, [key]: value },
        }));
      },

      // Function to add to cart
      add_to_cart: (addCart) => {
        set((state) => ({
          userData: {
            ...state.userData,
            myCart: [...state.userData.myCart, addCart],
          },
        }));
      },

      // Function to update a cart item
      updateCart: (index, updatedItem) => {
        set((state) => {
          const updatedCart = [...state.userData.myCart];
          updatedCart[index] = { ...updatedCart[index], ...updatedItem };
          return { userData: { ...state.userData, myCart: updatedCart } };
        });
      },

      // Function to delete an item from the cart
      deleteCart: (index) => {
        set((state) => {
          const updatedCart = [...state.userData.myCart];
          updatedCart.splice(index, 1);
          return { userData: { ...state.userData, myCart: updatedCart } };
        });
      },

      // Function to add a booking
      add_booking: (addBooking) => {
        set((state) => ({
          userData: {
            ...state.userData,
            tour: [...state.userData.tour, addBooking],
          },
        }));
      },

      // Function to cancel a booking
      cancelBooking: (index) => {
        set((state) => {
          const updatedTour = [...state.userData.tour];
          updatedTour.splice(index, 1);
          return { userData: { ...state.userData, tour: updatedTour } };
        });
      },

      // Similar functions for ghostTour and rentalInfo...

      // Retrieve specific parts of userData
      getCart: () => get().userData.myCart,
      getTour: () => get().userData.tour,
      getGhostTour: () => get().userData.ghostTour,
      getRentalInfo: () => get().userData.rentalInfo,
    }),
    {
      name: "user_data", // unique name for localStorage key
      partialize: (state) => ({ userData: state.userData }), // Only persist userData
    }
  )
);
