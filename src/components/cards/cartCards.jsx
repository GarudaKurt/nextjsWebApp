import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/zustand/zustand";

const AddCartCard = ({ images, title, model }) => {
  const [priceRates, setPriceRates] = useState(0);
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState("");

  const addToCart = useCartStore((state) => state.add_to_cart); // Access add_to_cart from the Zustand store

  // Function to add the selected bike data to the global cart
  const handleAddToCart = () => {
    const newBikeRent = {
      qty,
      rate,
      models: model,
      total: priceRates,
    };

    // Add the new bike rental to the global cart using the Zustand store
    addToCart(newBikeRent);
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
    const selectedRate = e.target.value;
    setRate(selectedRate);
  };

  const handleDecrement = () => {
    if (qty > 0) setQty(qty - 1);
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  return (
    <div className="card w-80 bg-white mt-2 max-w-xs rounded overflow-hidden shadow-lg">
      <div className="card-body items-center text-center">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <h2 className="card-title">{title}</h2>
            <label className="text-gray-500 text-sm flex font-sans justify-start mt-1">
              {model}
            </label>
          </div>
          <div className="rating gap-1">
            <input
              type="radio"
              name="rating-3"
              className="mask mask-heart bg-red-400"
            />
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

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 19.364A4 4 0 0110 16h4a4 4 0 014.879 3.364M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm ml-2 text-gray-500">1 person</p>
          </div>
        </div>

        <div className="flex justify-between w-full items-center">
          <select
            className="select select-ghost p-2 w-full max-w-xs"
            onChange={handleRateChange}
            value={rate} // Control the selected option via value
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
    </div>
  );
};

export default AddCartCard;
