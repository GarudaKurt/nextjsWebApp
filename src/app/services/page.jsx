"use client";

import AddButton from "@/components/buttons/addButton";
import Layout from "@/components/layout";
import Image from "next/image";
import { useState, useEffect } from "react";

const AboutUS = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const TopContent = () => (
    <div className="relative w-full sm:w-1/2 flex justify-center items-center">
      <div className="rounded-full p-8 bg-yellowOrange flex items-center justify-center">
        <Image
          className="rounded-full object-cover  skeleton"
          src={"/images/about-us/equipment.png"}
          alt="Explore Haunted Sites"
          width={400}
          height={400}
          quality={100}
          unoptimized={true}
        />
      </div>
    </div>
  );

  const BottomContent = () => (
    <div className="w-full sm:w-1/2 text-left">
      <h2 className="text-3xl font-bold text-clearGreen mb-2 underline decoration-4 decoration-forestGreen-600">
        Ghost Hunting Gear
      </h2>
      <p className="text-gray-600 text-lg leading-8">
        Equip yourself with the best tools for ghost hunting. From EMF detectors
        to night vision cameras, our high-quality gear ensures you capture every
        paranormal moment.
      </p>
    </div>
  );

  return (
    <>
      <Layout>
        <div className="py-24 bg-white text-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="pb-16 text-center">
              <div className="flex flex-col sm:flex-row justify-center mt-2 items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <h2 className="text-4xl mt-8 font-yesteryear font-bold leading-tight text-clearGreen">
                  WHO WE ARE
                </h2>
              </div>
              <p className="text-gray-500 text-lg leading-8 mt-4">
                Discover our unique offerings designed to provide thrilling
                adventures, equip you with top-notch ghost hunting tools, and
                make your exploration of the city convenient and enjoyable.
              </p>
              <AddButton align={"center"} bcolor={"bg-clearGreen"}>
                Book Now
              </AddButton>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
              {/* H2 and p Tags */}
              <div className="w-full sm:w-1/2 text-left">
                <h2 className="text-3xl font-bold text-clearGreen mb-2 underline decoration-4 decoration-forestGreen-600">
                  Explore Haunted Sites
                </h2>
                <p className="text-gray-600 text-lg leading-8">
                  Join our guided tours through the most haunted locations.
                  Experience the thrill of uncovering hidden stories and the
                  eerie charm of abandoned places with our expert guides.
                </p>
              </div>
              {/* Image */}
              <div className="relative w-full sm:w-1/2 flex justify-center items-center ">
                <div className="rounded-full p-8 bg-white flex items-center justify-center ">
                  <Image
                    className="rounded-full object-cover "
                    src={"/images/about-us/ghost-town.png"}
                    alt="Explore Haunted Sites"
                    width={400} // Set this to match the source image's aspect ratio
                    height={400}
                    quality={100} // Increase quality
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>

            {/* Swap based on screen size */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mt-8">
              {isSmallScreen ? (
                <>
                  <BottomContent />
                  <TopContent />
                </>
              ) : (
                <>
                  <TopContent />
                  <BottomContent />
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
              {/* H2 and p Tags */}
              <div className="w-full sm:w-1/2 text-left">
                <h2 className="text-3xl font-bold text-clearGreen mb-2 underline decoration-4 decoration-forestGreen-600">
                  Scooter Bike Rentals
                </h2>
                <p className="text-gray-600 text-lg leading-8">
                  Rent a scooter to easily explore the city. Ideal for covering
                  more ground during your adventures, our reliable scooters make
                  navigating around town a breeze.
                </p>
              </div>
              {/* Image */}
              <div className="relative w-full sm:w-1/2 flex justify-center items-center ">
                <div className="rounded-full p-8 bg-yellowOrange flex items-center justify-center ">
                  <Image
                    className="rounded-full object-cover skeleton "
                    src={"/images/landing-page/bike.png"}
                    alt="Explore Haunted Sites"
                    width={400} // Set this to match the source image's aspect ratio
                    height={400}
                    quality={100} // Increase quality
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutUS;
