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
  const [tab_1, setTab_1] = useState("");
  const [tab_2, setTab_2] = useState("");
  const [tab_3, setTab_3] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [tabs_description_1, settabs_description_1] = useState("");
  const [tabs_description_2, settabs_description_2] = useState("");
  const [tabs_description_3, settabs_description_3] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [btnShow, setBtnShow] = useState(false);

  const routes = useRouter();

  // Array of image paths
  const images = [
    "/images/landing-page/bg_1.jpg",
    "/images/landing-page/bg_2.jpg",
    "/images/landing-page/bg_3.jpg",
    "/images/landing-page/bg_4.jpg",
    "/images/landing-page/bg_5.jpg",
    "/images/landing-page/bg_6.jpg",
  ];

  // Automatically change the image every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

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

  useEffect(() => {
    const dataRef = ref(database, "monitoring");

    // Fetch data
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setTitle(fetchedData.title || "N/A");
        setSubTitle(fetchedData.subTitle || "N/A");
        setDescription(fetchedData.description);
        setSubDescription(fetchedData.subDescription);
        setBtnTitle(fetchedData.btnTitle || "N/A");
        setBtnShow(fetchedData.addButton || false);

        setTab_1(fetchedData.tabs_1_title || "N/A");
        setTab_2(fetchedData.tabs_2_title || "N/A");
        setTab_3(fetchedData.tabs_3_title || "N/A");
        setSelectedTab(fetchedData.tabs_1_title);
        settabs_description_1(fetchedData.tabs_1_des || "N/A");
        settabs_description_2(fetchedData.tabs_2_des || "N/A");
        settabs_description_3(fetchedData.tabs_3_des || "N/A");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white min-h-screen bg-black">
      <Layout>
        <div className="container mx-auto text-white mt-20 flex flex-col md:flex-row items-center">
          <div className="ml-5 md:ml-20">
            <h1 className="text-5xl font-sans font-bold leading-tight tracking-wide text-white">
              {title} <br />
            </h1>
            <h1 className="text-3xl font-sans font-bold leading-tight tracking-wide text-white">
              {subTitle} <br />
            </h1>
            <p className="text-md font-sans text-xl mt-2 mb-2 font-semibold leading-tight tracking-wide text-black">
              {formatDescription(description, 50)}
            </p>

            {btnShow && (
              <AddButton
                bcolor={"bg-black"}
                events={() => routes.push("/bookings")}
              >
                {btnTitle}
              </AddButton>
            )}
          </div>

          {/* Carousel Section */}
          <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="carousel w-full rounded shadow-lg">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item relative w-full h-100 transition-opacity duration-1000 ${
                  index === currentImage ? "block" : "hidden"
                }`}
              >
                <Image
                  className="bg-fixed rounded"
                  src={image}
                  layout="responsive"
                  width={350}
                  height={350}
                  alt={`bg_${index + 1}`}
                  priority={index === currentImage} // Ensure current image loads quickly
                />
              </div>
            ))}
          </div>
            {/* Carousel Navigation Dots */}
            <div className="flex justify-center w-full py-2 gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`btn btn-xs ${
                    currentImage === index ? "btn-primary" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
