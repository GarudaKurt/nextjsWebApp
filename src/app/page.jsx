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
  const [subDescription_1, setSubDescription_1] = useState("Stay inspired, stay motivated, and keep moving forward.");
  const [subDescription_2, setSubDescription_2] = useState("");
  const [subDescription_3, setSubDescription_3] = useState("");
  const [subDescription_4, setSubDescription_4] = useState("");
  const [subDescription_5, setSubDescription_5] = useState("");
  const [subDescription_6, setSubDescription_6] = useState("");
  const [btnTitle, setBtnTitle] = useState("Explore Now");
  const [btnShow, setBtnShow] = useState(false);

  const router = useRouter();

  const formatDescription = (text, limit) => {
    const words = text.split(" ");
    let line = "";
    let formattedText = [];
  
    words.forEach((word) => {
      if ((line + word).length > limit) {
        formattedText.push(line);
        line = word;
      } else {
        line += (line ? " " : "") + word;
      }
    });
  
    if (line) formattedText.push(line);
  
    return formattedText.map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const backgroundDisplay = [
    "/images/landing-page/bg_1.jpg",
    "/images/landing-page/bg_2.jpg",
    "/images/landing-page/bg_3.jpg",
    "/images/landing-page/bg_4.jpg",
    "/images/landing-page/bg_5.jpg",
    "/images/landing-page/bg_6.jpg",
    "/images/landing-page/bg_7.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundDisplay.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dataRef = ref(database, "monitoring");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setTitle(fetchedData.title || "Your Journey Starts Here!");
        setSubTitle(fetchedData.subTitle || "Unlock New Possibilities");
        setDescription(fetchedData.description || "Every great adventure begins with a single step. Take yours today!");
        setSubDescription(fetchedData.subDescription || "Stay inspired, stay motivated, and keep moving forward.");
        setSubDescription_1(fetchedData.subDescription1)
        setSubDescription_2(fetchedData.subDescription2)
        setSubDescription_3(fetchedData.subDescription3)
        setSubDescription_4(fetchedData.subDescription4)
        setSubDescription_5(fetchedData.subDescription5)
        
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
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">
              {formatDescription(description,50)}
            </p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription,50)}</p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription_1,50)}</p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription_2,50)}</p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription_3,50)}</p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription_4,50)}</p>
            <p className="text-md font-sans text-lg mt-2 mb-2 font-semibold leading-tight tracking-wide text-white">{formatDescription(subDescription_5,50)}</p>

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
