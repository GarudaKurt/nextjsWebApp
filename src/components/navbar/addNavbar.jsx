"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AddNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav  className="fixed left-0 top-0 w-full pb-6 pt-8 z-10 bg-offGreen">
      <div className="container mx-auto flex items-center justify-between px-4">
        {!isOpen && (
          <div className="flex items-center">
            <h2 className="font-yesteryear text-xl text-white">Viva Local Vegas</h2>
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
          <Link href="/" className="block px-3 py-2 text-white hover:text-clearGreen">
            Home
          </Link>
          <Link href="/gallery" className="block px-3 py-2 text-white hover:text-clearGreen">
            Gallery
          </Link>
          <Link href="/services" className="block px-3 py-2 text-white hover:text-clearGreen">
            Services
          </Link>
          <Link href="/login" className="block px-3 py-2 text-white hover:text-clearGreen">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AddNavbar;
