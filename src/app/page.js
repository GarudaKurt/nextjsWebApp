"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddButton from "@/components/buttons/addButton";
import AddFooter from "@/components/footer/addFootter";

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

  const tabs = ["Ghost Tours", "Hunt Gear", "eBike Explore"];


  const renderTabContent = () => {
    switch (selectedTab) {
      case "Ghost Tours":
        return (
            <form className="bg-white shadow-md rounded px-6 py-8 mb-4 mx-auto max-w-4xl relative z-10">
              <p className="text-base text-gray-800 leading-relaxed">
                Embark on an unforgettable journey through the eerie and mysterious past of Las Vegas with our <strong>Explore Ghost Tours</strong>. Delve into the shadowy corners of the city's history as we guide you through haunted locations, each with its own spine-chilling story.
                <br />
                <br />
                Our tours offer a unique blend of history and the supernatural, perfect for thrill-seekers and history buffs alike. Each tour is meticulously crafted to bring to life the ghostly tales that have lingered in Las Vegas for decades, from the haunted halls of historic hotels to the eerie remnants of old ghost towns.
                <br />
                <br />
                Whether you’re interested in the ghostly apparitions of the city’s notorious past or the unexplained phenomena that still baffle residents and visitors, our tours provide an in-depth exploration of Las Vegas’s most haunted locations. Join us as we uncover the secrets of the past, told through the eyes of those who never truly left.
                <br />
                <br />
                Prepare to be thrilled, spooked, and fascinated as we take you on a journey you won’t soon forget. Book your spot today and step into the ghostly side of Las Vegas history.
              </p>
            </form>
        );
      case "Hunt Gear":
        // Return content specific to "Hunt Gear" tab
        return (
            <form className="bg-white shadow-md rounded px-6 py-8 mb-4 mx-auto max-w-4xl">
              <p className="text-base text-gray-800 leading-relaxed">
                Explore our collection of high-quality hunt gear designed for all your ghost-hunting adventures. From protective equipment to advanced tools, we have everything you need to enhance your experience and stay safe.
                <br />
                <br />
                Our gear is meticulously tested to ensure reliability and effectiveness in the most challenging conditions. Whether you're a seasoned ghost hunter or a curious beginner, our selection of hunt gear will support you in your quest to uncover the unknown.
              </p>
            </form>
        );
      case "eBike Explore":
        // Return content specific to "eBike Explore" tab
        return (
            <form className="bg-white shadow-md rounded px-6 py-8 mb-4 mx-auto max-w-4xl">
              <p className="text-base text-gray-800 leading-relaxed">
                Discover the city of Las Vegas like never before with our eBike Explore tours. Enjoy the freedom of exploring at your own pace while experiencing the vibrant atmosphere and exciting landmarks.
                <br />
                <br />
                Our eBikes are equipped with the latest technology to ensure a smooth and enjoyable ride. Whether you’re looking for a leisurely exploration or an adventurous journey, our eBike tours offer a unique way to see the city and its hidden gems.
              </p>
            </form>
        );
      default:
        return null;
    }
  };

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
              <div className="text-lg font-semibold">Celistine Gateways</div>
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
        <AddButton bcolor={"#FF5C83"} top={"mt-x"} paddingX={"px-5"} paddingY={"py-2"}  size={"xl"}> Book Now </AddButton>
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
      <div className="container mx-auto mt-12 text-lg flex justify-center">
        <div className="flex space-x-4 rounded-full shadow-md bg-gray-100">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${
                selectedTab === tab
                  ? "bg-white text-blue-700"
                  : "text-gray-700 hover:bg-gray-200"
              } px-4 py-2 font-semibold rounded-full transition duration-300`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full px-4 mt-8 text-center">
          {renderTabContent()}
      </div>

      <AddFooter/>

    </div>
  );
}
