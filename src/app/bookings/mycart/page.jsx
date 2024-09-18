"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";

const myCart = () => {
  const [priceRates, setPriceRates] = useState(0);
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState("");
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const router = useRouter();

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
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const toggleCollapse = () => {
    setIsCollapseOpen((prevState) => !prevState);
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
          You have 3 items in your cart
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
              {/* Cart Item */}
              <div className="w-full bg-white shadow-xl rounded-lg p-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 w-full items-center sm:items-start space-y-4 sm:space-y-0">
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-20 sm:h-20 rounded overflow-hidden">
                    <Image
                      src={"/images/bookings/red-bike.png"}
                      alt="Scooter"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-md font-semibold">Mobile Scooter</h2>
                    <p className="text-sm text-gray-500">
                      Extra battery included
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={handleDecrement}
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg">{qty}</span>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={handleIncrement}
                      >
                        <FaPlus />
                      </button>
                      {/* Price and Delete Button */}
                      <div className="flex items-center justify-between space-x-2">
                        <p className="text-lg font-semibold whitespace-nowrap">
                          ${priceRates}
                        </p>
                        <button className="btn btn-ghost btn-sm text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default myCart;
