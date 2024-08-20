"use client";

import { useState } from "react";
import Link from "next/link";

const AddNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 w-full bg-gray-800 pb-6 pt-8 backdrop-blur-2xl z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        {!isOpen && (
          <div className="flex items-center">
            <svg
              className="w-8 h-8 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l2.12 4.24L19 7l-3.24 3.24L17 14l-5-2-5 2 1.24-3.76L5 7l4.88-0.76L12 2zm0 4l-1 2 1-0.5 1 0.5-1-2zm0 2.5l-2.5 1 2.5-1.5 2.5 1.5-2.5-1zM8.5 11L7 12l1.5-1L12 12l3.5-1L17 12l-1.5-1.5L12 14l-3.5-2.5zM5.5 13.5L4 15l1.5-1.5 1.5 1.5L8 15l-1.5-1.5zM12 18l1-1-1-1-1 1 1 1z"
              />
            </svg>
            <div className="text-lg font-semibold text-white">Viva Local Vegas</div>
          </div>
        )}
        <div className={`${isOpen ? "absolute right-4 top-8" : "md:hidden"}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-gray-800 focus:outline-none"
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
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto md:space-x-8`}
        >
          <Link href="/home" className="block px-1 py-1 text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/gallery" className="block px-1 py-1 text-gray-300 hover:text-white">
            Gallery
          </Link>
          <Link href="#" className="block px-1 py-1 text-gray-300 hover:text-white">
            Services
          </Link>
          <Link href="#" className="block px-1 py-1 text-gray-300 hover:text-white">
            Know More
          </Link>
          <Link href="#" className="block px-1 py-1 text-gray-300 hover:text-white">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AddNavbar;
