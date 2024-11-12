// pages/dashboard.jsx

"use client";

import {
  FaHome,
  FaCalendarWeek,
  FaBell,
  FaBookOpen,
  FaReceipt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toggle button for mobile view */}
      <div className="p-4 bg-clearGreen text-white md:hidden min-h-screen">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div
          className={`fixed md:static min-h-full w-60 bg-chillGreen transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-10`}
        >
          {/* Close button inside the sidebar */}
          <div className="flex justify-end p-4 md:hidden">
            <button onClick={toggleSidebar} className="text-white text-xl">
              <FaTimes />
            </button>
          </div>

          <ul className="menu p-4 overflow-y-auto w-full text-white font-sans text-md">
            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaHome className="mt-1" />
              <Link href="#" className="font-bold">
                Dashboard
              </Link>
            </span>

            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaCalendarWeek className="mt-1" />
              <Link href="#" className="hover:bg-red rounded-md">
                Appointment
              </Link>
            </span>

            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaBell className="mt-1" />
              <Link href="#" className="hover:bg-red rounded-md">
                Notification
              </Link>
            </span>

            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaBookOpen className="mt-1" />
              <Link href="#" className="hover:bg-red rounded-md">
                Order List
              </Link>
            </span>

            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaReceipt className="mt-1" />
              <Link href="#" className="hover:bg-red rounded-md">
                Reports
              </Link>
            </span>

            <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
              <FaSignOutAlt className="mt-1" />
              <Link href="#" className="hover:bg-red rounded-md">
                Logout
              </Link>
            </span>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
