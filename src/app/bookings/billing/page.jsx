"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/zustand/zustand";

const Billings = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isSubmit, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  const billingData = useCartStore(
    (state) => state.userData?.billingInfo || []
  );
  const { setBillingInfo, userName, getUserName } = useCartStore((state) => ({
    setBillingInfo: state.setBillingInfo,
    userName: state.userName,
    getUserName: state.getUserName,
  }));
  useEffect(() => {
    setName(userName || "");
    setAddress(billingData.address || "");
    setPhone(billingData.phone || "");
    setCity(billingData.city || "");
  }, []); // Only include essential dependencies

  const handleSubmit = () => {
    if (!name || !phone || !address || !city) {
      setShow(true);
      return;
    }
    const billingData = {
      name,
      address,
      phone,
      city,
    };
    setBillingInfo(billingData); // Update billing info in Zustand
    setSubmitted(true);
    router.push("/bookings/rental-info");
  };
  return (
    <>
      <div className="bg-white md:px-8 w-full py-8">
        <div className="flex items-center justify-start mb-4">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => router.push("/bookings/mycart")}
          >
            <FaArrowLeft className="text-gray-500" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-600">
            Billing Info
          </h1>
        </div>
        <p className="px-8 text-gray-500 text-sm  font-sans">
          Please enter your billing info.
        </p>
        <div className="divider"></div>
        {/* Billing Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              contentEditable={false}
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Phone number"
              className="input input-bordered w-full"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Town / City */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Town / City</span>
            </label>
            <input
              type="text"
              placeholder="Town or city"
              className="input input-bordered w-full"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex justify-start p-2">
            <button
              className="btn bg-relaxGreen hover:bg-clearGreen text-white text-md w-full md:w-auto"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        {show && (
          <h2 className="text-center text-orange-600">
            Please fill in all required fields.
          </h2>
        )}
        <div className="flex justify-center pt-2 ">
          <AddSteps
            alignment={false}
            hidden={false}
            cartPage={"step-success"}
            billPage={"step-success"}
          />
        </div>
      </div>
    </>
  );
};

export default Billings;
