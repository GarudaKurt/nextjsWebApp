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
  const [tab_1, setTab_1] = useState("")
  const [tab_2, setTab_2] = useState("")
  const [tab_3, setTab_3] = useState("")

  const [selectedTab, setSelectedTab] = useState("");
  const [tabs_description_1, settabs_description_1] = useState("")
  const [tabs_description_2, settabs_description_2] = useState("")
  const [tabs_description_3, settabs_description_3] = useState("")
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subDescription, setSubDescription] = useState("")
  const [btnTitle, setBtnTitle] = useState("")
  const [btnShow, setBtnShow] = useState(false)

  const routes = useRouter();


  
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

  const formatDescription_Tabs = (text, limit) => {
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
        setSubTitle(fetchedData.subTitle || "N/A")
        setDescription(fetchedData.description);
        setSubDescription(fetchedData.subDescription);
        setBtnTitle(fetchedData.btnTitle || "N/A");
        setBtnShow(fetchedData.addButton || false);
  
        setTab_1(fetchedData.tabs_1_title || "N/A")
        setTab_2(fetchedData.tabs_2_title || "N/A")
        setTab_3(fetchedData.tabs_3_title || "N/A")
        setSelectedTab(fetchedData.tabs_1_title)
        settabs_description_1(fetchedData.tabs_1_des || "N/A")
        settabs_description_2(fetchedData.tabs_2_des || "N/A")
        settabs_description_3(fetchedData.tabs_3_des || "N/A")
      }
    });

    return () => unsubscribe();
  }, []); 

  const tabs = [tab_1, tab_2, tab_3];
  const renderTabContent = () => {
    switch (selectedTab) {
      case tab_1:
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
              {formatDescription_Tabs(tabs_description_1, 52)}
              </p>
              <AddButton
                align={"center"}
                events={() => alert("Button Clicked!")}
              >
                Book Now
              </AddButton>
            </form>
          </>
        );
      case tab_2:
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
              {formatDescription_Tabs(tabs_description_2, 52)}
              </p>
              <AddButton
                align={"center"}
                events={() => alert("Button Clicked!")}
              >
                Book Now
              </AddButton>
            </form>
          </>
        );
      case tab_3:
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-4 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
              {formatDescription_Tabs(tabs_description_3, 52)}
              </p>
              <AddButton
                align={"center"}
                events={() => alert("Button Clicked!")}
              >
                Book Now
              </AddButton>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTab((prevTab) => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 10000); // Auto switch tabs every 10 seconds
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [tabs]);
  

  return (
    <div className=" text-white min-h-screen bg-white ">
      <Layout>
        <div className="container mx-auto text-white mt-20 flex flex-col md:flex-row items-center">
          <div className="ml-5 md:ml-20 ">
            <h1 className="text-5xl font-sans font-bold leading-tight tracking-wide text-clearGreen">
              {title} <br /> {/**I want to append my title here */}
              {subTitle} {/**I want to append my subtitle here */}
              <br />
            </h1>
            <p className="text-md font-sans text-xl mt-2 mb-2 font-semibold leading-tight tracking-wide text-gray-700">
            {formatDescription(description, 50)}
          </p>

            
            {btnShow && (
              <AddButton
                bcolor={"bg-clearGreen"}
                events={() => routes.push("/bookings")}
              >
                {btnTitle} {/* Dynamically set button title */}
              </AddButton>
            )}
          </div>
          <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="relative">
              <Image
                className="bg-fixed  rounded relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={"/images/landing-page/bg.jpg"}
                layout="responsive"
                width={350}
                height={350}
                alt={"profile"}
              />
            </div>
          </div>
        </div>

        <div className="bg-relaxGreen">
          <div className="container mx-auto mt-8 text-lg flex justify-center">
            <div className="tabs tabs-boxed bg-white rounded-lg shadow-md">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab ${
                    selectedTab === tab
                      ? "tab-active text-blue-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full px-4  p-2 text-center">
            {renderTabContent()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;