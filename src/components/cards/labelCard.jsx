import Image from "next/image";
import { useCartStore } from "@/app/zustand/zustand";
import { useState } from "react";
import {
  FaInfoCircle
} from "react-icons/fa";

const CardLabel = ({ image, name, title, descriptions }) => {
  const [modalMessage, setModalMessage] = useState(""); // Message for the modal
  const [showModal, setShowModal] = useState(false);

  const addToCart = useCartStore((state) => state.add_to_cart); // Access add_to_cart from the Zustand store
  const isLoggedIn = useCartStore((state) => state.isLoggedIn); // Check if user is logged in

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // If user is not logged in, show a login prompt
      setModalMessage("Fail to add the cart please Signin.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2500);
      return;
    }

    const cartItem = {
      equipment_title: title,
      qty: 1,
      rate: 5,
      total: 5,
    };
    addToCart(cartItem);
    // Add the item to the Zustand store
    setModalMessage("Successfully added to cart!");
    setShowModal(true);

    // Auto-close the modal after 1.5 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  return (
    <div className="max-w-xs mt-2 mb-4 rounded overflow-hidden shadow-lg">
      <div className="flex justify-center">
        <Image
          className="bg-fixed rounded relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={image}
          alt={name}
          width={250}
          height={250}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-black text-xl mb-2">{title}</div>
        <p className="text-black text-base text-center">{descriptions}</p>
      </div>
      <button
        className="bg-transparent hover:bg-green-500 text-clearGreen font-semibold hover:text-white mb-2 py-2 px-4 border border-green-500 hover:border-transparent rounded"
        onClick={handleAddToCart}
      >
        Add Cart
      </button>
      {showModal && (
        <div className="fixed inset-0 p-30 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
            <FaInfoCircle className="text-4xl text-blue-500 mb-2" />
            <p className="text-lg font-semibold text-relaxBlack text-center">
              {modalMessage}
            </p>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default CardLabel;
