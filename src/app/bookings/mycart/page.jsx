"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/zustand/zustand";

const MyCart = () => {
  const [priceRates, setPriceRates] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const router = useRouter();

  const imagesLoad = [
    "/images/bookings/red-bike.png",
    "/images/bookings/blue-bike.png",
    "/images/bookings/black-bike.png",
  ];

  const getCart = useCartStore((state) => state.getCart);
  const updateCart = useCartStore((state) => state.updateCart); // Access the updateCart function

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart); // Set the cart state with the loaded data
  }, [getCart]);

  // Handle rate change and update total price for the item
  const handleRateChange = (e, index) => {
    const selectedRate = e.target.value;
    const updatedCart = [...cart];
    updatedCart[index].rate = selectedRate;

    let total = 0;
    switch (selectedRate) {
      case "24 hours":
        total = updatedCart[index].qty * 35;
        break;
      case "48 hours":
        total = updatedCart[index].qty * 55;
        break;
      case "120 hours":
        total = updatedCart[index].qty * 135;
        break;
      default:
        total = 0;
    }

    updatedCart[index].total = total;
    setCart(updatedCart); // Update cart state
    setPriceRates(total); // Update priceRates
  };

  // Handle increment
  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].qty += 1;

    let total = 0;
    switch (updatedCart[index].rate) {
      case "24 hours":
        total = updatedCart[index].qty * 35;
        break;
      case "48 hours":
        total = updatedCart[index].qty * 55;
        break;
      case "120 hours":
        total = updatedCart[index].qty * 135;
        break;
      default:
        total = 0;
    }

    updatedCart[index].total = total;
    setCart(updatedCart);
    setPriceRates(total);
  };

  // Handle decrement
  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].qty > 1) {
      updatedCart[index].qty -= 1;

      let total = 0;
      switch (updatedCart[index].rate) {
        case "24 hours":
          total = updatedCart[index].qty * 35;
          break;
        case "48 hours":
          total = updatedCart[index].qty * 55;
          break;
        case "120 hours":
          total = updatedCart[index].qty * 135;
          break;
        default:
          total = 0;
      }

      updatedCart[index].total = total;
      setCart(updatedCart);
      setPriceRates(total);
    }
  };

  const toggleCollapse = () => {
    setIsCollapseOpen((prevState) => !prevState);
  };

  // Function to load the cart and map images and values
  const displayCart = () => {
    return cart.map((item, index) => {
      let imageUrl = "";
      if (item.models === "Red") {
        imageUrl = imagesLoad[0];
      } else if (item.models === "Blue") {
        imageUrl = imagesLoad[1];
      } else if (item.models === "Black") {
        imageUrl = imagesLoad[2];
      }

      return (
        <div
          key={index}
          className="w-full bg-white shadow-xl rounded-lg p-4 mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4 w-full items-center sm:items-start space-y-4 sm:space-y-0">
            {/* Image */}
            <div className="w-24 h-24 sm:w-20 sm:h-20 rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${item.model} Scooter`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-md font-semibold mt-2">
                {item.models} Scooter
              </h2>
            </div>

            <div className="flex flex-col  justify-center sm:flex-row sm:items-center sm:justify-between w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center space-x-2">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDecrement(index)}
                >
                  <FaMinus />
                </button>
                <span className="text-lg">{item.qty}</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleIncrement(index)}
                >
                  <FaPlus />
                </button>
                {/* Price and Rate */}
                <div className="flex items-center space-x-4">
                  <select
                    value={item.rate}
                    onChange={(e) => handleRateChange(e, index)}
                  >
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="120 hours">120 hours</option>
                  </select>
                  <p className="text-lg font-semibold whitespace-nowrap">
                    ${item.total}
                  </p>
                  <button className="btn btn-ghost btn-sm text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="bg-forestGreen px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-start">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => router.push("/bookings")}
          >
            <FaArrowLeft className="text-gray-500" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-600">
            Shopping Continue
          </h1>
        </div>
        <div className="divider"></div>
        <p className="text-xs md:text-sm text-gray-500 mb-3">
          You have {cart.length} items in your cart
        </p>

        {/* Cart Items Container */}
        <div className="flex flex-col md:flex-row md:space-x-4 items-start">
          <AddSteps alignment={true} hidden={true} />

          {/* Cart Item - Controlled Collapse */}
          <div
            className={`collapse ${
              isCollapseOpen ? "collapse-open" : "collapse-close"
            } border border-base-300 bg-white w-full md:w-1/2 mt-5`}
          >
            <div
              className="collapse-title text-xl font-medium flex justify-between items-center"
              onClick={toggleCollapse}
            >
              <h2 className="text-sm md:text-xl font-semibold text-gray-600">
                Shopping Cart
              </h2>
              <span>
                {isCollapseOpen ? (
                  <FaMinus className="text-lg" />
                ) : (
                  <FaPlus className="text-lg" />
                )}
              </span>
            </div>

            {/* Make collapse content scrollable */}
            <div className="collapse-content overflow-y-auto max-h-64">
              {/* Render cart items */}
              {displayCart()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCart;
