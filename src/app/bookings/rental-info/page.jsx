"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/zustand/zustand";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalInfo = () => {
  const router = useRouter();

  const [pickLocation, setpickLocation] = useState("");
  const [pickDate, setpickDate] = useState("");
  const [pickTime, setpickTime] = useState("");
  const [dropLocation, setdropLocation] = useState("");
  const [dropDate, setdropDate] = useState("");
  const [dropTime, setdropTime] = useState("");
  const [show, setShow] = useState(false);

  const { setRentalInfo, getRentalInfo } = useCartStore((state) => ({
    setRentalInfo: state.setRentalInfo,
    getRentalInfo: state.getRentalInfo,
  }));

  useEffect(() => {
    const rentalData = getRentalInfo();
    if (rentalData) {
      setpickLocation(rentalData.pickLocation);
      setpickDate(rentalData.pickDate);
      setpickTime(rentalData.pickTime);
      setpickLocation(rentalData.pickLocation);
      setdropLocation(rentalData.dropLocation);
      setdropDate(rentalData.dropDate);
      setdropTime(rentalData.dropTime);
    }
  }, [getRentalInfo]);

  const handleSubmit = () => {
    if (
      !pickLocation ||
      !pickDate ||
      !pickTime ||
      !dropLocation ||
      !dropDate ||
      !dropTime
    ) {
      setShow(true);
      return;
    }

    const rentalData = {
      pickLocation: pickLocation,
      pickDate: pickDate,
      pickTime: pickTime,
      dropLocation: dropLocation,
      dropDate: dropDate,
      dropTime: dropTime,
    };
    setRentalInfo(rentalData);
    router.push("/bookings/confirmation");
  };

  return (
    <>
      <div className="bg-white md:px-8 py-8 w-full">
        <div className="flex items-center justify-start mb-4">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => router.push("/bookings/billing")}
          >
            <FaArrowLeft className="text-gray-500" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-600">
            Rental Info
          </h1>
        </div>
        <p className="px-8 text-gray-500 text-sm  font-sans">
          Please select your rental date and time.
        </p>
        <div className="divider"></div>
        {/* Billing Form */}
        <div className="flex justify-start items-center px-2 text-gray-500">
          <input
            type="radio"
            name="radio-1"
            className="radio-info"
            defaultChecked
          />
          <span className="p-2">Pick-up</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Locations</span>
            </label>
            <input
              type="text"
              placeholder="Your Locations"
              className="input input-bordered w-full"
              value={pickLocation}
              onChange={(e) => setpickLocation(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              selected={pickDate}
              onChange={(date) => setpickDate(date)}
              className="grow input input-bordered text-relaxBlack w-full"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="time"
              placeholder="select time"
              className="input input-bordered w-full"
              required
              value={pickTime}
              onChange={(e) => setpickTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-start px-2 items-center text-gray-500">
          <input
            type="radio"
            name="radio-2"
            className="radio-info"
            defaultChecked
          />
          <span className="p-2">Drop-off</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Locations</span>
            </label>
            <input
              type="text"
              placeholder="Your Locations"
              className="input input-bordered w-full"
              required
              value={dropLocation}
              onChange={(e) => setdropLocation(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              selected={dropDate}
              onChange={(date) => setdropDate(date)}
              className="grow input input-bordered text-relaxBlack w-full"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="time"
              placeholder="select time"
              className="input input-bordered w-full"
              required
              value={dropTime}
              onChange={(e) => setdropTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start p-4">
          <button
            className="btn bg-relaxGreen hover:bg-clearGreen text-white text-md w-full md:w-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {show && (
          <h2 className="text-center text-orange-600">
            Please fill in all required fields.
          </h2>
        )}
        <div className="flex justify-center pb-4">
          <AddSteps
            alignment={false}
            hidden={false}
            cartPage={"step-success"}
            billPage={"step-success"}
            infoPage={"step-success"}
          />
        </div>
      </div>
    </>
  );
};

export default RentalInfo;
