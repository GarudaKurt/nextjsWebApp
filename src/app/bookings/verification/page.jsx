"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddSteps from "@/components/steps/page";
import { useState } from "react";
import { useCartStore } from "@/app/zustand/zustand";
import { useEffect } from "react";
import {
  FaInfoCircle,
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Verification = () => {
  const router = useRouter();
  const [handleAccept, sethandleAccept] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const submitRental = useCartStore((state) => state.submitRental);

  if (!submitRental) {
    console.error("submitRental function is undefined");
    return null;
  }

  const handleSubmit = () => {
    setIsModalOpen(true); // Open modal when clicking cancel
  };

  const handleCancelConfirm = () => {
    // Logic for canceling the rental order
    setIsModalOpen(false);
    router.push("/bookings/rental-info"); // Or any other action you want
  };

  return (
    <div className="bg-white md:px-8  w-full py-8">
      {/* Back button and Title */}
      <div className="flex items-center mb-4">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => router.push("/bookings/rental-info")}
        >
          <FaArrowLeft className="text-gray-500" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-600">Status</h1>
      </div>

      <p className="px-8 text-gray-500 text-sm">
        Wait for 24 hours until the admin confirm your rentals order.
      </p>

      <div className="divider"></div>

      <div className="max-w-sm bg-white rounded-lg shadow-lg p-4">
        {/* Name and Info Icon */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-900">
            SCOOTER RENTALS
          </h2>
          <FaInfoCircle className="text-purple-900 text-lg" />
        </div>

        {/* Divider */}
        <hr className="border-gray-200  my-2" />

        <div className="flex justify-center items-center gap-2">
          <button className="btn btn-sm bg-pendingYellow hover:bg-yellow-500 text-white font-semibold rounded-full px-4 py-2 flex items-center ">
            <span>PENDING</span>
            <FaClock />
          </button>
          <button
            className="btn btn-sm bg-cancelRed hover:bg-red-500 text-white font-semibold rounded-full px-4 py-2 flex items-center"
            onClick={handleSubmit}
          >
            <span>CANCEL</span>
            <FaTimesCircle />
          </button>
          <button
            className="btn btn-sm bg-successGreen hover:bg-green-500 text-white font-semibold rounded-full px-4 py-2 flex items-center"
            onClick={handleSubmit}
          >
            <span>Approve</span>
            <FaCheckCircle />
          </button>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <AddSteps
          alignment={false}
          hidden={false}
          cartPage={"step-success"}
          billPage={"step-success"}
          infoPage={"step-success"}
          confirmPage={"step-success"}
          statusPage={"step-success"}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-semibold  text-center text-offBlack text-lg">
              Are you sure you want to cancel your rentals?
            </h3>
            <div className="modal-action flex justify-center">
              <button className="btn btn-primary" onClick={handleCancelConfirm}>
                Yes
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;
