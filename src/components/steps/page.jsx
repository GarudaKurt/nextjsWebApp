"use client";

import Link from "next/link";
import { FaShoppingCart, FaReceipt, FaList, FaCheck } from "react-icons/fa";

const AddSteps = ({ alignment, hidden }) => {
  const isVertical = alignment ? `vertical` : `horizontal`;

  const spanStyle = hidden
    ? "hidden" // This will hide the span
    : "hidden lg:block text-sm lg:text-base group-hover:bg-forestGreen p-1 rounded";

  return (
    <ul className={`steps steps-vertical text-white lg:steps-${isVertical}`}>
      {/* Cart */}
      <Link
        href="/bookings/mycart"
        className="step step-white flex items-center space-x-2 group"
      >
        <FaShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
        <span className={spanStyle}>Cart</span>
      </Link>

      {/* Billing */}
      <Link
        href="#"
        className="step step-white flex items-center space-x-2 group"
      >
        <FaReceipt className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
        <span className={spanStyle}>Billing</span>
      </Link>

      {/* Information */}
      <Link
        href="#"
        className="step step-white flex items-center space-x-2 group"
      >
        <FaList className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
        <span className={spanStyle}>Information</span>
      </Link>

      {/* Verified */}
      <Link
        href="#"
        className="step step-white flex items-center space-x-2 group"
      >
        <FaCheck className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
        <span className={spanStyle}>Verified</span>
      </Link>
    </ul>
  );
};

export default AddSteps;
