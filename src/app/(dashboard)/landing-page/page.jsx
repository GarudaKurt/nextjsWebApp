"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddButton from "@/components/buttons/addButton";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";

import { database } from "@/components/cards/firebaseConfig/config";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [title, setTitle] = useState("Your Journey Starts Here!");
  const [subTitle, setSubTitle] = useState("Unlock New Possibilities");
  const [description, setDescription] = useState("Every great adventure begins with a single step. Take yours today!");
  const [subDescription, setSubDescription] = useState("Stay inspired, stay motivated, and keep moving forward.");
  const [btnTitle, setBtnTitle] = useState("Explore Now");
  const [btnShow, setBtnShow] = useState(false);

  const router = useRouter();

  // Array of background images
  const backgroundDisplay = [
    "/images/landing-page/bg_1.jpg",
    "/images/landing-page/bg_2.jpg",
    "/images/landing-page/bg_3.jpg",
    "/images/landing-page/bg_4.jpg",
    "/images/landing-page/bg_5.jpg",
    "/images/landing-page/bg_6.jpg",
    "/images/landing-page/bg_7.jpg",
  ];

  // Auto-change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundDisplay.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dataRef = ref(database, "monitoring");

    // Fetch data from Firebase
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setTitle(fetchedData.title || "Your Journey Starts Here!");
        setSubTitle(fetchedData.subTitle || "Unlock New Possibilities");
        setDescription(fetchedData.description || "Every great adventure begins with a single step. Take yours today!");
        setSubDescription(fetchedData.subDescription || "Stay inspired, stay motivated, and keep moving forward.");
        setBtnTitle(fetchedData.btnTitle || "Explore Now");
        setBtnShow(fetchedData.addButton || false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white min-h-screen bg-black">
      <Layout>
        <div className="container mx-auto text-white mt-20 flex flex-col md:flex-row items-center">
          <div className="ml-5 md:ml-20">
            <Image
              className="w-32 md:w-48 lg:w-64 h-auto bg-fixed rounded relative"
              src="/images/landing-page/logo.png"
              width={200}
              height={200}
              alt="logo"
            />
            <h1 className="text-5xl font-sans font-bold leading-tight tracking-wide text-relaxBlue">{title}</h1>
            <h2 className="text-3xl font-sans font-bold leading-tight tracking-wide text-relaxBrown">{subTitle}</h2>
            <p className="text-md font-sans text-xl mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">
              {description}
            </p>
            <p className="text-md font-sans text-xl mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">
              {subDescription}
            </p>

            {btnShow && (
              <AddButton bcolor={"bg-clearGreen"} events={() => router.push("/bookings")}>
                {btnTitle}
              </AddButton>
            )}
          </div>

          <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-[500px] h-[500px]">
            <div className="relative w-full h-full">
              <div className="carousel w-full h-full relative">
                {backgroundDisplay.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                      index === currentImage ? "opacity-100 z-10" : "opacity-0"
                    }`}
                  >
                    <Image
                      className="rounded w-full h-full object-cover"
                      src={img}
                      width={500} 
                      height={500} 
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
