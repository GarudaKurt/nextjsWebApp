"use client";

import { useState } from "react";
import Layout from "../_layout";
import useOrderStore from "@/app/zustand/zustand";

const Inventory = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { addNewProduct, inventoryStocks } = useOrderStore();

  const totalPages = Math.ceil(inventoryStocks.length / itemsPerPage);

  const paginatedProducts = inventoryStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const saveNewProduct = () => {
    if (!productId || !productName || !totalQty) {
      console.error("All fields are required!");
      return;
    }

    const updatedProduct = {
      id: parseInt(productId),
      name: productName,
      qty: parseInt(totalQty),
      filePath: "/images/equipments/default.png",
      dateCreated: new Date().toLocaleString(),
    };

    addNewProduct(updatedProduct);
    setProductId("");
    setProductName("");
    setTotalQty("");
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setProductId(product.id.toString());
    setProductName(product.name);
    setTotalQty(product.qty.toString());
    setEditId(product.id);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="pt-5 pr-10 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-relaxBlack">Inventory Management</h1>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => {
              setShowModal(true);
              setEditId(null);
              setProductId("");
              setProductName("");
              setTotalQty("");
            }}
            className="btn bg-chillGreen text-white hover:bg-offGreen"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4">Product ID</th>
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">QTY</th>
                <th className="py-2 px-4">Date Created</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <tr key={index} className="bg-white text-center border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-relaxBlack">{product.id}</td>
                    <td className="py-3 px-4 text-relaxBlack">{product.name}</td>
                    <td className="py-3 px-4 text-relaxBlack">{product.qty}</td>
                    <td className="py-3 px-4 text-relaxBlack">{product.dateCreated || "N/A"}</td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-center text-gray-500">
                    No products in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {inventoryStocks.length > itemsPerPage && (
          <div className="flex justify-end items-center mt-4 gap-4">
            <button
              className="btn btn-md bg-gray-200 text-relaxBlack hover:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-md text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-md bg-gray-200 text-relaxBlack hover:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-xl text-relaxBlack mb-4">
                {editId !== null ? "Edit Product" : "New Product"}
              </h2>
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
                <button
                  onClick={() => setShowModal(false)}
                  className="btn bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNewProduct}
                  className="btn bg-chillGreen text-white hover:bg-offGreen"
                >
                  {editId !== null ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inventory;
