import { create } from "zustand";
import { persist } from "zustand/middleware";
import { firestore, auth } from "../../components/cards/firebaseConfig/config"; // Ensure auth is imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, updateDoc, collection, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Define the initial state for userData
const initialUserData = {
  isSubmit: false,
  submitTours: false,
  orderStatus: false,
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
            set({ userName: null });
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
        set((state) => {
          // Check if the orderStatus is false and `myCart` is an array
          if (state.userData?.confirmation?.adminConfirmStatus === false && Array.isArray(state.userData.myCart?.adminConfirmStatus)) {
            return {
              userData: {
                ...state.userData,
                myCart: [...state.userData.myCart, addCart], // Append new items to the existing cart
              },
            };
          }

          // Fallback: Create a new cart if `orderStatus` is not false or `myCart` is invalid
          return {
            userData: {
              ...state.userData,
              myCart: [addCart], // Initialize a new cart with the new item
            },
          };
        });
      },
      

      updateCart: (index, updatedItem) => {
        set((state) => {
          const updatedCart = Array.isArray(state.userData.myCart)
            ? [...state.userData.myCart]
            : []; // Fallback to an empty array
      
          if (index >= 0 && index < updatedCart.length) {
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
            if (!user) {
              console.error("User not authenticated. Cannot update Firestore.");
              return;
            }
      
            const rentalsCollectionRef = collection(firestore, "users", user.uid, "rentals");
            const querySnapshot = await getDocs(rentalsCollectionRef);
      
            let existingDoc = null;
      
            // Check for a document with adminOrderStatus: false
            querySnapshot.forEach((doc) => {
              if (doc.data().rentalInformation?.adminOrderStatus === false) {
                existingDoc = doc; // Found the document to update
              }
            });
      
            const { myCart, rentalInfo, billingInfo, confirmation } = get().userData;
      
            if (existingDoc) {
              // Update the existing document
              const rentalDocRef = doc(firestore, "users", user.uid, "rentals", existingDoc.id);
      
              // Merge existing cart with new items
              const updatedCart = [
                ...existingDoc.data().rentalInformation.myCart,
                ...myCart,
              ];
      
              await updateDoc(rentalDocRef, {
                "rentalInformation.myCart": updatedCart,
                "rentalInformation.rentalInfo": rentalInfo,
                "rentalInformation.billingInfo": billingInfo,
                "rentalInformation.confirmation": confirmation,
              });
              console.log("Existing Firestore document updated successfully.");
            } else {
              // Create a new document if no matching document exists
              const userRef = doc(firestore, "users", user.uid, "rentals", uuidv4());
      
              const submissionData = {
                myCart,
                rentalInfo,
                billingInfo,
                confirmation,
              };
      
              await setDoc(userRef, { rentalInformation: submissionData }, { merge: true });
              console.log("New Firestore document created successfully.");
            }
          } catch (error) {
            console.error("Error updating Firestore:", error);
          }
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

      // Update order status
      updateOrderStatus: async (status) => {
        set((state) => ({
          userData: {
            ...state.userData,
            orderStatus: status,
          },
        }));
      },
      getForm: async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            console.error("User not authenticated. Cannot fetch Firestore data.");
            return;
          }
      
          const rentalsCollectionRef = collection(firestore, "users", user.uid, "rentals");
          const querySnapshot = await getDocs(rentalsCollectionRef);
      
          querySnapshot.forEach((doc) => {
            const rentalInfo = doc.data().rentalInformation;
            if (rentalInfo) {
              useCartStore.getState().updateOrderStatus(rentalInfo.adminOrderStatus);
              useCartStore.getState().updateUserData("myCart", rentalInfo.myCart || []);
              // Update other fields as needed
            }
          });
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
        }
      },      

      updateMyCarts: async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            console.error("User not authenticated. Cannot update Firestore data.");
            return;
          }
      
          const rentalsCollectionRef = collection(firestore, "users", user.uid, "rentals");
          const querySnapshot = await getDocs(rentalsCollectionRef);
      
          const cartData = useCartStore.getState().userData?.myCart || [];
      
          // Assuming you want to update all rental documents with the latest cart data
          for (const docSnapshot of querySnapshot.docs) {
            const rentalDocRef = doc(firestore, "users", user.uid, "rentals", docSnapshot.id);
            if(cartData.length === 0) {
              await deleteDoc(rentalDocRef);
            }
            await updateDoc(rentalDocRef, {
              "rentalInformation.myCart": cartData,
            });
          }
      
          console.log("Firestore myCart data updated successfully.");
        } catch (error) {
          console.error("Error updating Firestore data:", error);
        }
      },

      cancelOrder: async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            console.error("User not authenticated. Cannot update Firestore data.");
            return;
          }
      
          const rentalsCollectionRef = collection(firestore, "users", user.uid, "rentals");
          const querySnapshot = await getDocs(rentalsCollectionRef);
      
          // Delete all rental documents in Firestore
          const deletePromises = querySnapshot.docs.map((docSnapshot) => {
            const rentalDocRef = doc(firestore, "users", user.uid, "rentals", docSnapshot.id);
            return deleteDoc(rentalDocRef);
          });

          await Promise.all(deletePromises);
      
          // Clear myCart in local state using zustand
          useCartStore.setState((state) => ({
            userData: {
              ...state.userData,
              myCart: [], // Clear the cart
            },
          }));
      
          console.log("Firestore myCart data deleted and state cleared successfully.");
        } catch (error) {
          console.error("Error deleting Firestore data or clearing state:", error);
        }
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
      getOrderStatus: () => get().userData.orderStatus,
      // Fetch order status
    }),
    {
      name: "user_data", // unique name for localStorage key
      partialize: (state) => ({ userData: state.userData }), // Only persist userData
    }
  )
);
