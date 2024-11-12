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
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Layout from "../../_layout";
const OrderList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="flex items-center justify-between bg-gray-800 p-4 text-white lg:hidden">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
        </div>
        {/* Dashboard Content */}
        <div className="flex flex-grow">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800">
            <ul className="menu menu-sm p-4 overflow-y-auto w-full text-white font-sans text-md">
              <span className="flex space-x-2 mb-2 hover:bg-gray-700 rounded">
                <FaHome className="mt-1" />
                <Link href="#" className="font-bold ">
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

          {/* Main Content */}
          <div className="flex-grow p-6 bg-base-100">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Order Lists</h2>
              <button className="btn btn-outline">Reset Filter</button>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 my-4">
              <select className="select select-bordered">
                <option>Filter By</option>
                <option>14 Feb 2019</option>
              </select>
              <select className="select select-bordered">
                <option>Order Type</option>
              </select>
              <select className="select select-bordered">
                <option>Order Status</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table table-xs table-pin-rows table-pin-cols">
                {/* Head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Rentals/Tour</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Order Rows */}
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <span>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                      </span>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.date}</td>
                      <td>{order.type}</td>
                      <td>
                        <span
                          className={`badge t ${
                            order.status === "Completed"
                              ? "badge-success"
                              : order.status === "Processing"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Sample data for the table
const orders = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "14 Feb 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2019",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "14 Feb 2019",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "14 Feb 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weinmann Mountain",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Completed",
  },
];

export default OrderList;
