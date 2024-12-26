import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/app/zustand/zustand";
import {
  FaInfoCircle
} from "react-icons/fa";

const AddCartCard = ({ images, title, model }) => {
  const [priceRates, setPriceRates] = useState(0);
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState("");
  const [modalMessage, setModalMessage] = useState(""); // Message for the modal
  const [showModal, setShowModal] = useState(false);

  const addToCart = useCartStore((state) => state.add_to_cart); // Access add_to_cart from Zustand
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

    const newBikeRent = {
      qty,
      rate,
      models: model,
      total: priceRates,
    };

    // Add the item to the Zustand store
    addToCart(newBikeRent);
    setModalMessage("Successfully added to cart!");
    setShowModal(true);

    // Auto-close the modal after 1.5 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  useEffect(() => {
    let total = 0;
    switch (rate) {
      case "24 hours":
        total = qty * 35;
        break;
      case "48 hours":
        total = qty * 55;
        break;
      case "120 hours":
        total = qty * 135;
        break;
      default:
        total = 0;
    }
    setPriceRates(total);
  }, [qty, rate]);

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleDecrement = () => {
    if (qty > 0) setQty(qty - 1);
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  return (
    <div className="card w-80 bg-white mt-2 max-w-xs rounded overflow-hidden shadow-md">
      <div className="card-body items-center text-center">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <h2 className="card-title">{title}</h2>
            <label className="text-gray-500 text-sm flex font-sans justify-start mt-1">
              {model}
            </label>
          </div>
        </div>

        <div className="w-full h-40">
          <Image
            src={images}
            alt="Scooter"
            className="rounded-md mx-auto"
            width={200}
            height={200}
          />
        </div>

        <div className="flex justify-between w-full mt-8">
          <div className="flex items-center">
            <button
              className="text-gray-400 bg-white px-1 shadow-sm"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="mx-4 text-md text-gray-400">{qty}</span>
            <button
              className="text-green-400 bg-white px-1 shadow-sm"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between w-full items-center">
          <select
            className="select select-ghost p-2 w-full max-w-xs"
            onChange={handleRateChange}
            value={rate}
          >
            <option value="" disabled>
              rates
            </option>
            <option value="24 hours">24 hours</option>
            <option value="48 hours">48 hours</option>
            <option value="120 hours">120 hours</option>
          </select>
          <p className="text-sm font-semibold">${priceRates}</p>
          <button
            className="btn btn-sm ml-5 text-white bg-relaxGreen"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 p-30 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
            <FaInfoCircle className="text-4xl text-blue-500 mb-2" />
            <p className="text-lg font-semibold text-black text-center">
              {modalMessage}
            </p>
          </div>
      </div>
      )}
    </div>
  );
};

export default AddCartCard;
