"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaWhatsapp, FaPhone, FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Gallery");

  const images = [
    {
      src: "/images/ghost.png",
      alt: "Main image",
    },
    {
      src: "/images/bike.png",
      alt: "Scooter image",
    },
  ];

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const tabs = ["eBike", "Equipment", "Customer"];

  return (
    <div className="">
      <nav className="fixed left-0 top-0 w-full bg-white pb-6 pt-8 backdrop-blur-2xl z-10">
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
              <div className="text-lg font-bold">Celistine Gateways</div>
            </div>
          )}
          <div className={`${isOpen ? "absolute right-4 top-8" : "md:hidden"}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 bg-white focus:outline-none"
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
            <Link href="#" className="block px-1 py-1 text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="#" className="block px-1 py-1 text-gray-700 hover:text-gray-900">
              Gallery
            </Link>
            <Link href="#" className="block px-1 py-1 text-gray-700 hover:text-gray-900">
              Services
            </Link>
            <Link href="#" className="block px-1 py-1 text-gray-700 hover:text-gray-900">
              Know More
            </Link>
            <Link href="#" className="block px-1 py-1 text-gray-700 hover:text-gray-900">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      
      <div style={{ background: "#E6F4F5" }} className="container mx-auto text-black mt-20 flex flex-col md:flex-row items-center">
        <div className="ml-5 md:ml-20">
          {currentImage === 1 ? (
            <h1 className="text-4xl font-sans font-bold leading-tight tracking-wide text-white-500">
              EXPERIENCE THE <br/>  
              SIGHT OF <br/>
              LAS VEGAS ON A <br/>
              BIKE RENT NOW AND <br/>
              ENJOY WITH FRIENDS
            </h1>
          ) : (
            <h1 className="text-4xl font-sans font-bold leading-tight tracking-wide text-white-500">
              DISCOVER THE <br />
              HIDDEN <br />
              <span className="italic text-indigo-400">MYSTERIES</span><br />
              OF GHOST TOWN<br/>
              WITH US!
            </h1>
          )}
          <button
            style={{ backgroundColor: "#FF5C83" }}
            className="mt-4 px-5 py-3 font-bold text-white rounded-xl transform  transition-transform duration-300"
          >
            Book Now
          </button>
        </div>
        <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative">
            <Image
              className="bg-fixed relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={images[currentImage].src}
              layout="responsive"
              width={350}
              height={350}
              alt={images[currentImage].alt}
            />
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
            >
              &#8249;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="container mx-auto mt-12 flex justify-center">
        <div className="flex rounded-full shadow-md bg-gray-100">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${
                selectedTab === tab
                  ? "bg-white text-blue-700"
                  : "text-gray-700 hover:bg-gray-200"
              } flex-1 px-4 py-2 font-semibold rounded-full transition duration-300`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-8 pb-4 mt-12">
        <div className="container mx-auto px-4 md:flex md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FaEnvelope className="mr-2 text-white" />
            <div>
              <div>Email Support</div>
              <div className="text-gray-400">celestine@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <FaWhatsapp className="mr-2 text-white" />
            <div>
              <div>Whatsapp Support</div>
              <div className="text-gray-400">08147758883</div>
            </div>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-white" />
            <div>
              <div>Phone Support</div>
              <div className="text-gray-400">08147758883</div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <FaInstagram className="text-white hover:text-gray-400 cursor-pointer" />
          <FaTwitter className="text-white hover:text-gray-400 cursor-pointer" />
          <FaFacebookF className="text-white hover:text-gray-400 cursor-pointer" />
          <FaTiktok className="text-white hover:text-gray-400 cursor-pointer" />
        </div>
        <div className="text-center text-gray-400 mt-4">
          © 2024, All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
