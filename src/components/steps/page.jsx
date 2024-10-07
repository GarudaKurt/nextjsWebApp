"use client";

import Link from "next/link";
import { FaShoppingCart, FaReceipt, FaList, FaCheck } from "react-icons/fa";

const AddSteps = ({ alignment, hidden, cartPage }) => {
  const isVertical = alignment
    ? "text-relaxBlack steps steps-vertical"
    : "text-relaxBlack steps steps-horizontal";

  const spanStyle = hidden
    ? "hidden" // This will hide the span
    : "hidden lg:block text-sm text-relaxBlack p-1 rounded";

  const currentPage = cartPage
    ? "step step-success flex items-center space-x-2 group"
    : "step flex items-center space-x-2 group";

  return (
    <ul className={isVertical}>
      {/* Cart */}
      <Link href="/bookings/mycart" className={currentPage}>
        <FaShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Cart</span>
      </Link>

      {/* Billing */}
      <Link href="/bookings/billing" className={currentPage}>
        <FaReceipt className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Billing</span>
      </Link>

      {/* Information */}
      <Link href="/bookings/rental-info" className={currentPage}>
        <FaList className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Info</span>
      </Link>

      {/* Verified */}
      <Link href="/bookings/confirmation" className={currentPage}>
        <FaCheck className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-white p-1 rounded" />
        <span className={spanStyle}>Verified</span>
      </Link>
    </ul>
  );
};

export default AddSteps;
