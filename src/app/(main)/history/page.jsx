"use client";

import { useState, useEffect } from "react";
import useOrderStore from "@/app/zustand/zustand";
import Layout from "../_layout";

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const ordersPerPage = 8;
  const { history } = useOrderStore();

  const filteredOrders = studentId
    ? history.filter((order) =>
        order.studentId.toLowerCase().includes(studentId.toLowerCase())
      )
    : history;

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  return (
    <Layout>
      <div className="pt-5 pr-10 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-relaxBlack">History Order</h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              setCurrentPage(1);
            }}
            className="input input-bordered w-full sm:w-1/3 max-w-xs bg-gray-100 text-gray-700"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered w-full sm:w-1/4 max-w-xs bg-gray-100 text-gray-700"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4">Student ID</th>
                <th className="py-2 px-4">Product ID</th>
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">QTY</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <tr key={index} className="bg-white text-center border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-relaxBlack">{order.studentId}</td>
                    <td className="py-3 px-4 text-relaxBlack">{order.product.id}</td>
                    <td className="py-3 px-4 text-relaxBlack">{order.product.name}</td>
                    <td className="py-3 px-4 text-relaxBlack">{order.qty}</td>
                    <td className="py-3 px-4 text-relaxBlack">{order.status}</td>
                    <td className="py-3 px-4 text-relaxBlack">{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3 px-4 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`btn px-4 py-2 mx-1 ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-chillGreen text-white hover:bg-offGreen"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`btn px-4 py-2 mx-1 ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-chillGreen text-white hover:bg-offGreen"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default History;
