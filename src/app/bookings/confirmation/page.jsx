"use client";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddSteps from "@/components/steps/page";
import { useState, useEffect } from "react";
import { useCartStore } from "@/app/zustand/zustand";
const Verification = () => {
  const router = useRouter();
  const [handleCare, setHandleCare] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [show, setShow] = useState(false);

  const { setConfirmation, getConfirmation } = useCartStore((state) => ({
    setConfirmation: state.setConfirmation,
    getConfirmation: state.getConfirmation,
  }));

  useEffect(() => {
    const info = getConfirmation();
    if (info) {
      setHandleCare(info.agreementCare);
      setTermsAgree(info.terms);
    }
  }, [getConfirmation]);

  const handleSubmit = () => {
    if (!handleCare || !termsAgree) {
      setShow(true);
      return;
    }
    const info = {
      agreementCare: handleCare,
      terms: termsAgree,
    };
    setConfirmation(info); // Call Zustand function to update rental info
  };

  return (
    <div className="bg-white md:px-8 w-full py-8">
      {/* Back button and Title */}
      <div className="flex items-center mb-4">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => router.push("/bookings/rental-info")}
        >
          <FaArrowLeft className="text-gray-500" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-600 ">
          Confirmation
        </h1>
      </div>

      <p className="px-8 text-gray-500 text-sm">
        We are getting to the end. Just a few clicks and your rental is ready!
      </p>

      <div className="divider"></div>

      <div className="space-y-4 px-8">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={handleCare}
            onChange={(e) => setHandleCare(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm">
            I agree to take care of this rental and return it in good condition.
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termsAgree}
            onChange={(e) => setTermsAgree(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm">
            I agree with our{" "}
            <a className="text-blue-500 underline">terms and conditions</a> and{" "}
            <a className="text-blue-500 underline">privacy policy</a>.
          </span>
        </label>
      </div>

      <p className="px-8 text-gray-500 text-sm pt-4">
        Wait for 24 hours until the admin confirm your rentals order.
      </p>
      <div className="flex items-center justify-start pt-4">
        <h3 className="px-8 text-lg md:text-xl font-bold text-gray-500">
          Status:
        </h3>
        <button className="btn btn-xs bg-pendingYellow hover:bg-yellow-500 text-white text-center font-semibold rounded-full px-2 flex items-center ">
          <span>PENDING</span>
          <FaClock />
        </button>
      </div>

      <div className="px-8 mt-6">
        <button
          className="btn bg-relaxGreen hover:bg-offGreen text-white text-md w-full md:w-auto"
          onClick={handleSubmit}
        >
          Rent Now
        </button>
      </div>
      {show && (
        <h2 className="text-center text-orange-600">
          Please fill in all checkbox.
        </h2>
      )}
      <div className="flex justify-center pt-2">
        <AddSteps
          alignment={false}
          hidden={false}
          cartPage={"step-success"}
          billPage={"step-success"}
          infoPage={"step-success"}
          confirmPage={"step-success"}
        />
      </div>
    </div>
  );
};

export default Verification;
