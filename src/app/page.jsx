"use client";

import { useState, useEffect } from "react";
import useOrderStore from "@/app/zustand/zustand";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const OrderList = () => { 

  const [studentId, setStudentId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [totalQty, setTotalQty] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const ordersPerPage = 5;
  const { orders, borrowed, addOrder, removeSettledOrders, inventoryStocks, addNewProduct } = useOrderStore();

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);  

  const saveNewProduct = () => {
    if (!productId || !productName || !totalQty) {
      console.error("All fields are required!");
      return;
    }
  
    const newlyProduct = {
      id: parseInt(productId, 10),
      name: productName,
      qty: parseInt(totalQty, 10),
      filePath: "/images/equipments/default.png",
    };
  
    addNewProduct(newlyProduct);
  
    setProductId("");
    setProductName("");
    setTotalQty("");
    setShowModal(false);
  };
  

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
    };
  }, []);
  
  useEffect(() => {
    console.log("Updated searchId:", searchId);
  }, [searchId]);
  
  useEffect(() => {
    if (searchId) {
      console.log("🔍 Auto-searching for Product ID:", searchId);
      handleSearch();
    }
  }, [searchId]);

  const handleSearch = () => {
    if (!studentId.trim()) return console.error("Please enter a Student ID first.");
    if (!inventoryStocks || inventoryStocks.length === 0) return console.error("Inventory is empty or not loaded.");
  
    const product = inventoryStocks.find((item) => item.id.toString() === searchId.trim());
    if (!product) return console.error("Product not found.");
  
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
        <button onClick={() => setShowModal(true)} className="btn bg-chillGreen text-white hover:bg-offGreen">
          New Order
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

      {/* Out of Stock Modal
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600">Product Not Available</h2>
            <p className="text-gray-700">The selected product is out of stock.</p>
          </div>
        </div>
      )} */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl text-relaxBlack mb-4">New Order</h2>
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              placeholder="Total QTY"
              value={totalQty}
              onChange={(e) => setTotalQty(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="btn bg-gray-300 text-black hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={saveNewProduct} className="btn bg-chillGreen text-white hover:bg-offGreen">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
