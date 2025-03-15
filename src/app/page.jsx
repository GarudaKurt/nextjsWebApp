"use client";

import { useState, useEffect } from "react";
import useOrderStore from "@/app/zustand/zustand";

const OrderList = () => {
  const prodImage = [
    { id: 1001, name: "Hot Air Gun", filePath: "/images/equipments/airgun.png" },
    { id: 1002, name: "Analog Multi Meter", filePath: "/images/equipments/analog-multimeter.png" },
    { id: 1003, name: "Digital Multi Meter", filePath: "/images/equipments/digital-multimeter.png" },
    { id: 1004, name: "Combination Pliers", filePath: "/images/equipments/combination-pliers.png" },
    { id: 1005, name: "Cutter Pliers", filePath: "/images/equipments/cutter-pliers.png" },
    { id: 1006, name: "Flat Screw", filePath: "/images/equipments/flat-screw.png" },
    { id: 1007, name: "Phillips Screw", filePath: "/images/equipments/phillips-screw.png" },
    { id: 1008, name: "Toolbox Set", filePath: "/images/equipments/toolbox.png" },
  ];

  const [studentId, setStudentId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  const ordersPerPage = 5;

  const { orders, addOrder, removeSettledOrders } = useOrderStore();

  const indexOfLastOrder = currentPage * ordersPerPage;
  const currentOrders = orders.slice(indexOfLastOrder - ordersPerPage, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        removeSettledOrders();
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [orders]);  // Ensure useEffect listens to `orders` state changes

  const handleSearch = () => {
    if (!studentId.trim()) return alert("Please enter a Student ID first.");

    const product = prodImage.find((item) => item.id.toString() === searchId.trim());
    if (!product) return alert("Product not found.");

    addOrder({
      studentId,
      product,
      qty: 1,
      status: "Pending",
      date
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
        <button onClick={handleSearch} className="btn bg-chillGreen text-white hover:bg-offGreen">Search</button>
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
                  <td className="py-3 px-4 text-relaxBlack">{order.status}</td>
                  <td className="py-3 px-4 text-relaxBlack">{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-chillGreen text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
