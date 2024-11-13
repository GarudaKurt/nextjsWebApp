"use client";

import { useState } from "react";
import { FaTrash, FaCheckSquare, FaPlusCircle, FaSort } from "react-icons/fa";
import Layout from "../../_layout";

const Reports = () => {
  const mockData = [
    {
      name: "User 1",
      phone: "+63 9082438802",
      appointment: "13-Aug-2023 at 10:00 AM",
      status: "Pending",
    },
    {
      name: "User 2",
      phone: "+63 9082438803",
      appointment: "13-Aug-2023 at 11:00 AM",
      status: "Approved",
    },
    {
      name: "User 3",
      phone: "+63 9082438803",
      appointment: "13-Aug-2023 at 11:00 AM",
      status: "Approved",
    },
    {
      name: "User 4",
      phone: "+63 9082438803",
      appointment: "13-Aug-2023 at 11:00 AM",
      status: "Approved",
    },
    {
      name: "User 5",
      phone: "+63 9082438803",
      appointment: "13-Aug-2023 at 11:00 AM",
      status: "Approved",
    },
    {
      name: "User 6",
      phone: "+63 9082438803",
      appointment: "13-Aug-2023 at 11:00 AM",
      status: "Approved",
    },
    // Additional data as needed...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the range of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = mockData.slice(indexOfFirstItem, indexOfLastItem);

  // Determine the total number of pages
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Layout>
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4 text-relaxBlack">
            Manage Notification
          </h1>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-1/3 max-w-xs bg-gray-100 text-gray-700"
            />
            <button className="btn bg-chillGreen text-white hover:bg-offGreen">
              <span>
                <FaSort />
              </span>{" "}
              Sort
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4">Client Name</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Appointment Date & Time</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((appointment, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-relaxBlack">
                      {appointment.name}
                    </td>
                    <td className="py-3 px-4 text-relaxBlack">
                      {appointment.phone}
                    </td>
                    <td className="py-3 px-4 text-relaxBlack">
                      {appointment.appointment}
                    </td>
                    <td className="py-3 px-4 text-relaxBlack">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          appointment.status === "Pending"
                            ? "bg-orange-500 text-white"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="btn btn-sm bg-cancelRed hover:bg-red-700 text-white">
                        <FaTrash />
                      </button>
                      <button className="btn btn-sm bg-green-700 hover:bg-relaxGreen text-white">
                        <FaCheckSquare />
                      </button>
                      <button className="btn btn-sm bg-gray-300 text-gray-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <div className="join">
              <button
                className="join-item btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  className={`join-item btn ${
                    currentPage === pageIndex + 1
                      ? "btn-active bg-blue-700 text-white"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </button>
              ))}
              <button
                className="join-item btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Reports;
