"use client";

import { FaCalendarWeek, FaBell, FaReceipt } from "react-icons/fa";
import Link from "next/link";
import Layout from "../../_layout";

const Summary = () => {
  return (
    <Layout>
      {/* Main Content with Cards */}
      <div className="flex flex-col md:flex-row flex-grow justify-start items-center md:items-start pt-10 space-y-2 md:space-y-0 md:space-x-2 mr-4">
        <div className="card bg-white text-black w-full max-w-xs md:w-75 h-48 shadow-lg">
          <div className="card-body">
            <span className="flex justify-between items-center">
              <Link href="#" className="text-left">
                Appointment
              </Link>
              <FaCalendarWeek />
            </span>
            <span className="flex justify-start">
              <label className="text-xl pt-5 font-bold font-sansserif">
                123
              </label>
              <h3 className="text-lg text-gray-500 ml-2 pt-5">
                New Appointment
              </h3>
            </span>
          </div>
        </div>

        <div className="card bg-white text-black w-full max-w-xs md:w-80 h-48 shadow-lg">
          <div className="card-body">
            <span className="flex justify-between items-center">
              <Link href="#" className="text-left">
                Notification
              </Link>
              <FaBell />
            </span>
            <span className="flex justify-start">
              <label className="text-xl pt-5 font-bold font-sansserif">
                123
              </label>
              <h3 className="text-lg text-gray-500 ml-2 pt-5">
                New Notification
              </h3>
            </span>
          </div>
        </div>

        <div className="card bg-white text-black w-full max-w-xs md:w-80 h-48 shadow-lg">
          <div className="card-body">
            <span className="flex justify-between items-center">
              <Link href="#" className="text-left">
                Order List
              </Link>
              <FaReceipt />
            </span>
            <span className="flex justify-start">
              <label className="text-xl pt-5 font-bold font-sansserif">
                123
              </label>
              <h3 className="text-lg text-gray-500 ml-2 pt-5">New Order</h3>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Summary;
