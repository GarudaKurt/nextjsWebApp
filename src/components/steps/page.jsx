"use client";

import Link from "next/link";
import {
  FaShoppingCart,
  FaReceipt,
  FaList,
  FaCheck,
  FaEllipsisH,
} from "react-icons/fa";

const AddSteps = ({
  alignment,
  hidden,
  cartPage,
  billPage,
  infoPage,
  confirmPage,
  statusPage,
}) => {
  const isVertical = alignment
    ? "text-relaxBlack steps steps-vertical"
    : "text-relaxBlack steps steps-horizontal";

  const spanStyle = hidden
    ? "hidden" // This will hide the span
    : "hidden lg:block text-sm text-relaxBlack p-1 rounded";

  return (
    <ul className={isVertical}>
      {/* Cart */}
      <Link
        href="/bookings/mycart"
        className={`step ${cartPage} flex items-center space-x-2 group`}
      >
        <FaShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Cart</span>
      </Link>

      {/* Billing */}
      <Link
        href="#"
        className={`step ${billPage} flex items-center space-x-2 group`}
      >
        <FaReceipt className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Billing</span>
      </Link>

      {/* Information */}
      <Link
        href="#"
        className={`step ${infoPage} flex items-center space-x-2 group`}
      >
        <FaList className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Info</span>
      </Link>

      {/* Verified */}
      <Link
        href="#"
        className={`step ${confirmPage} flex items-center space-x-2 group`}
      >
        <FaCheck className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Confirm</span>
      </Link>

      <Link
        href="#"
        className={`step ${statusPage} flex items-center space-x-2 group`}
      >
        <FaEllipsisH className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Status</span>
      </Link>
    </ul>
  );
};

export default AddSteps;
