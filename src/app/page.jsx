"use client";

import { useState, useEffect } from "react";
import useOrderStore from "@/app/zustand/zustand";
import io from "socket.io-client";

const socket = io("http://localhost:3002"); // ✅ Connect to the Express WebSocket server

const OrderList = () => {
  const prodImage = [
    { id: 1001, name: "Hot Air Gun", qty: 10, filePath: "/images/equipments/airgun.png" },
    { id: 1002, name: "Analog Multi Meter", qty: 10, filePath: "/images/equipments/analog-multimeter.png" },
    { id: 1003, name: "Digital Multi Meter", qty: 10, filePath: "/images/equipments/digital-multimeter.png" },
    { id: 1004, name: "Combination Pliers", qty: 10, filePath: "/images/equipments/combination-pliers.png" },
    { id: 1005, name: "Cutter Pliers", qty: 10, filePath: "/images/equipments/cutter-pliers.png" },
    { id: 1006, name: "Flat Screw", qty: 10, filePath: "/images/equipments/flat-screw.png" },
    { id: 1007, name: "Phillips Screw", qty: 10, filePath: "/images/equipments/phillips-screw.png" },
    { id: 1008, name: "Toolbox Set", qty: 10, filePath: "/images/equipments/toolbox.png" },
  ];

  const [studentId, setStudentId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const ordersPerPage = 5;
  const { orders, borrowed, addOrder, removeSettledOrders } = useOrderStore();

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        removeSettledOrders();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orders]);

  useEffect(() => {
      socket.on("connect", () => {
          console.log("Connected to WebSocket Server");
      });

      socket.on("productId", (data) => {
          console.log("Received Product ID:", data);
          setSearchId(data);
      });

      return () => {
          socket.off("productId");
          socket.disconnect();
      };
  }, []);


  const handleSearch = () => {
    if (!studentId.trim()) return alert("Please enter a Student ID first.");

    const product = prodImage.find((item) => item.id.toString() === searchId.trim());
    if (!product) return alert("Product not found.");

    const remaining = product.qty - (borrowed[product.id] || 0);
    if (remaining <= 0) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 5000);
      return;
    }

    addOrder({
      studentId,
      product,
      qty: 1,
      status: "Pending",
      date,
    });

    setSearchId("");
  };

  return (
    <div className="p-5 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-relaxBlack">Manage Order</h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="input input-bordered w-1/3 max-w-xs bg-gray-100 text-gray-700"
        />
        <input
          type="text"
          placeholder="Enter Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input input-bordered w-1/3 max-w-xs bg-gray-100 text-gray-700"
        />
        <button onClick={handleSearch} className="btn bg-chillGreen text-white hover:bg-offGreen">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4">Student ID</th>
              <th className="py-2 px-4">Product ID</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">QTY</th>
              <th className="py-2 px-4">Remaining</th>
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
                  <td className="py-3 px-4">
                    <img src={order.product.filePath} alt={order.product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-3 px-4 text-relaxBlack">{order.qty}</td>
                  <td className="py-3 px-4 text-relaxBlack">{order.product.qty - (borrowed[order.product.id] || 0)}</td>
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
          className={`btn px-4 py-2 mx-1 ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-chillGreen text-white hover:bg-offGreen"}`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`btn px-4 py-2 mx-1 ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-chillGreen text-white hover:bg-offGreen"}`}
        >
          Next
        </button>
      </div>

      {/* Out of Stock Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600">Product Not Available</h2>
            <p className="text-gray-700">The selected product is out of stock.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
