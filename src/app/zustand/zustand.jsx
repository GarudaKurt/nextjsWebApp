import { create } from "zustand";
import { persist } from "zustand/middleware";
import { firestore, auth } from "../firebaseConfig/config"; // Ensure auth is imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Define the initial state for userData
const initialUserData = {
  isSubmit: false,
  submitTours: false,
  myCart: [],
  ghostTour: [],
  vegasTour: [],
  rentalInfo: [],
  billingInfo: [],
  confirmation: [],
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

      isLoggedIn: async () => {
        const user = auth.currentUser; // Ensure the current authenticated user is available
        if (!user) {
          console.error("User need to sigin first!");
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
              set({ userName: "No Name" });
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

      add_to_cart: (addCart) => {
        set((state) => ({
          userData: {
            ...state.userData,
            myCart: Array.isArray(state.userData.myCart)
              ? [...state.userData.myCart, addCart]
              : [addCart], // If myCart isn't an array, reset it with the new item
          },
        }));
      },

      updateCart: (index, updatedItem) => {
        set((state) => {
          const updatedCart = Array.isArray(state.userData.myCart)
            ? [...state.userData.myCart]
            : []; // Fallback to an empty array

          if (updatedCart[index]) {
            updatedCart[index] = { ...updatedCart[index], ...updatedItem };
          }
          return { userData: { ...state.userData, myCart: updatedCart } };
        });
      },

      deleteCart: (index) => {
        set((state) => {
          // Ensure myCart is a valid array before proceeding
          const currentCart = Array.isArray(state.userData.myCart)
            ? state.userData.myCart
            : [];

          // Check if the index is within the valid range
          if (index >= 0 && index < currentCart.length) {
            const updatedCart = [...currentCart];
            updatedCart.splice(index, 1); // Remove the item at the specified index
            return { userData: { ...state.userData, myCart: updatedCart } };
          }

          // If the index is invalid or the cart is not an array, return the state as-is
          console.warn(
            "Invalid index or cart state in deleteCart:",
            index,
            currentCart
          );
          return state;
        });
      },

      setGhostTour: (bookings) => {
        set((state) => ({
          userData: {
            ...state.userData,
            ghostTour: bookings,
          },
        }));
      },

      setVegasTour: (bookings) => {
        set((state) => ({
          userData: {
            ...state.userData,
            vegasTour: bookings,
          },
        }));
      },

      setBillingInfo: (billingData) => {
        set((state) => ({
          userData: {
            ...state.userData,
            billingInfo: billingData,
          },
        }));
      },

      setRentalInfo: (rentalData) => {
        set((state) => ({
          userData: {
            ...state.userData,
            rentalInfo: rentalData,
          },
        }));
      },

      setConfirmation: async (confirm) => {
        set((state) => ({
          userData: {
            ...state.userData,
            confirmation: confirm,
          },
        }));
      },

      submitForm: async (submit) => {
        set({ userData: { ...get().userData, isSubmit: submit } });

        if (submit) {
          try {
            const user = auth.currentUser; // Ensure user is authenticated
            if (user) {
              const userRef = doc(firestore, "users", user.uid);
              const rentalsRef = doc(userRef, "rentals", uuidv4());

              let adminConfirmStatus = false;

              // Extract only the desired fields from userData
              const { myCart, rentalInfo, billingInfo, confirmation } =
                get().userData;

              // Prepare the data to store as an array
              const submissionData = {
                myCart,
                rentalInfo,
                billingInfo,
                confirmation,
                adminConfirmStatus,
              };

              // Update Firestore with the submission data
              await setDoc(
                rentalsRef,
                { rentalInformation: submissionData },
                { merge: true }
              );
              console.log("Selected data successfully synced to Firestore.");
            } else {
              console.error("User not authenticated. Cannot update Firestore.");
            }
          } catch (error) {
            console.error("Error updating Firestore:", error);
          }
        }
      },

      getForm: async () => {
        try {
          console.error("Fetching data...");
          const user = auth.currentUser; // Ensure user is authenticated
          if (!user) {
            console.error(
              "User not authenticated. Cannot fetch Firestore data."
            );
            return;
          }
          const rentalsCollectionRef = collection(
            firestore,
            "users",
            user.uid,
            "rentals"
          );
          const querySnapshot = await getDocs(rentalsCollectionRef);

          const rentalData = [];
          querySnapshot.forEach((doc) => {
            rentalData.push({ id: doc.id, ...doc.data() });
          });

          if (rentalData.length > 0) {
            console.error("Processing fetched data...");
            rentalData.forEach((item) => {
              // Check if adminConfirmStatus is false
              if (item.rentalInformation?.adminConfirmStatus === false) {
                // Update Zustand states with the respective data
                useCartStore
                  .getState()
                  .updateUserData(
                    "myCart",
                    item.rentalInformation.myCart || []
                  );
                useCartStore
                  .getState()
                  .updateUserData(
                    "billingInfo",
                    item.rentalInformation.billingInfo || {}
                  );
                useCartStore
                  .getState()
                  .updateUserData(
                    "confirmation",
                    item.rentalInformation.confirmation || {}
                  );
                useCartStore
                  .getState()
                  .updateUserData(
                    "rentalInfo",
                    item.rentalInformation.rentalInfo || {}
                  );
              } else {
                console.error(
                  "Admin confirmation status is TRUE. Skipping assignment."
                );
              }
            });
          } else {
            console.error("No rentals document found for the user.");
          }
        } catch (error) {
          console.error("Error fetching data from Firestore:", error);
        }
      },

      submitToursForm: async (submit) => {
        set({ userData: { ...get().userData, submitTours: submit } });

        if (submit) {
          try {
            const user = auth.currentUser; // Ensure user is authenticated
            if (user) {
              const userRef = doc(firestore, "users", user.uid);
              const rentalsRef = doc(userRef, "tours", uuidv4());

              // Extract `ghostTour` and `vegasTour` from userData
              const { ghostTour, vegasTour } = get().userData;

              // Create the submissionData object dynamically, excluding empty arrays
              const submissionData = {};
              if (ghostTour) {
                console.log("DEUB PASS HERE");
                submissionData.ghostTour = ghostTour;
              }
              if (vegasTour) {
                submissionData.vegasTour = vegasTour;
              }
              // Update Firestore with the submission data
              await setDoc(
                rentalsRef,
                { toursInformation: submissionData },
                { merge: true }
              );
              console.log("Selected data successfully synced to Firestore.");
            } else {
              console.error("User not authenticated. Cannot update Firestore.");
            }
          } catch (error) {
            console.error("Error updating Firestore:", error);
          }
        }
      },

      displayCarts: async () => {
        set((state) => ({
          userData: {
            ...state.userData,
            myCart: getForm(),
          },
        }));
      },

      // Similar functions for ghostTour and rentalInfo...

      // Retrieve specific parts of userData
      getCart: () => get().userData.myCart,
      getTour: () => get().userData.tour,
      getGhostTour: () => get().userData.ghostTour,
      getRentalInfo: () => get().userData.rentalInfo,
      getBillingInfo: () => get().userData.billingInfo,
      getConfirmation: () => get().userData.confirmation,
      getAdminCormation: () => get().userData.adminConfirmStatus,
    }),
    {
      name: "user_data", // unique name for localStorage key
      partialize: (state) => ({ userData: state.userData }), // Only persist userData
    }
  )
);
