"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AddNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 w-full pb-6 pt-8 backdrop-blur-2xl z-10 bg-primary">
      <div className="container mx-auto flex items-center justify-between px-4">
        {!isOpen && (
          <div className="flex items-center">
            <Image
              className="rounded"
              src={"/images/fbg.JPG"}
              width={100}
              height={100}
              alt="Logo"
            />
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
          <Link href="/" className="block px-3 py-2 text-base-300 hover:text-white">
            Home
          </Link>
          <Link href="/gallery" className="block px-3 py-2 text-base-300 hover:text-white">
            Gallery
          </Link>
          <Link href="#" className="block px-3 py-2 text-base-300 hover:text-white">
            Services
          </Link>
          <Link href="/know-more" className="block px-3 py-2 text-base-300 hover:text-white">
            Know More
          </Link>
          <Link href="/login" className="block px-3 py-2 text-base-300 hover:text-white">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AddNavbar;
