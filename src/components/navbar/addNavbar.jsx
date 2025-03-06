"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/app/zustand/zustand";

const AddNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const { isLoggedIn, userName, getUserName, logout } = useCartStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      userName: state.userName,
      getUserName: state.getUserName,
      logout: state.logout,
    })
  );

  useEffect(() => {
    if (isLoggedIn && !userName) {
      getUserName(); // Fetch user's name if logged in and userName not yet set
    }
  }, [isLoggedIn, userName, getUserName]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <nav className="fixed left-0 top-0 w-full pb-6 pt-8 z-10 bg-black">
      <div className="container mx-auto flex items-center justify-between px-4">
        {!isOpen && (
          <div className="flex items-center">
            <h2 className="font-yesteryear text-xl text-white">
             Hello, have a nice day!
            </h2>
          </div>
        )}
        <div className={`${isOpen ? "absolute right-4 top-8" : "md:hidden"}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-base-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto md:space-x-8`}
        >
          <h2 className="text-2xl font-yesteryear block px-2 py-2 text-white hover:text-clearGreen">
          {currentTime}
          </h2>
        </div>
      </div>

    </nav>
  );
};

export default AddNavbar;
