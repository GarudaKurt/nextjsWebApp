"use client";

import { useState } from "react";
import Image from "next/image";
import AddButton from "@/components/buttons/addButton";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Gallery");

  const routes = useRouter();

  const tabs = ["Ghost of Fremont", "Hunt Gear", "Scooter Rent"];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Ghost of Fremont":
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                What goes <strong>bump</strong> in the night? Join us and find
                out!
                <br />
                <br />
                Seasoned Paranormal Researches take you down the strange,
                macabre rabbit hole of Las Vegas’s haunted past. This
                informative, meticulously researched tour combines local
                history, folklore, and ghost stories for a truly unique
                experience!
                <br />
                <br />
                Along the way, attempt to make contact with infamous outlaws and
                long-gone gangsters! The only question: are you brave enough to
                roll the dice?
                <br />
                <br />
                Tours are offered most Thursday, Friday, and Saturday Nigths. To
                book, reach out at vivalocalvegas@gmail.com for availability!
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
      case "Hunt Gear":
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                Explore our collection of high-quality hunt gear designed for
                all your ghost-hunting adventures. From protective equipment to
                advanced tools, we have everything you need to enhance your
                experience and stay safe.
                <br />
                <br />
                Our gear is meticulously tested to ensure reliability and
                effectiveness in the most challenging conditions. Whether you&pos;re
                a seasoned ghost hunter or a curious beginner, our selection of
                hunt gear will support you in your quest to uncover the unknown.
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
      case "Scooter Rent":
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-4 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                Equipment is moving quick! Rent today!!!
                <br />
                Whether you’re looking for a leisurely exploration or an
                adventurous journey.
                <br />
                There is nothing more important than getting from Point A to
                Point B. As such, we will never overcharge for something so
                vital as mobility.
                <br />
                We keep our rental system as fast and simple as possible; we
                meet up, go over our contract, and get you rolling away in less
                than 10 minutes!
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

  return (
    <div className=" text-white min-h-screen bg-white ">
      <Layout>
        <div className="container mx-auto text-white mt-20 flex flex-col md:flex-row items-center">
          <div className="ml-5 md:ml-20">
            <h1 className="text-5xl font-sans font-bold leading-tight tracking-wide text-clearGreen">
              Visiting Vegas? <br />
              Let us help!
              <br />
            </h1>
            <p className="text-md font-sans mt-2 mb-2 font-semibold leading-tight tracking-wide text-gray-500">
              There are only 24 hours in the day! Seasoned <br />
              tour guides and well-versed locals take all the <br />
              guesswork out of Vegas, ensuring your <br />
              experience is as streamlined and exciting as <br />
              possible!
              <br />
              <br />
              20% of all profit is donated to Safe House Project!
            </p>
            <AddButton
              bcolor={"bg-clearGreen"}
              events={() => routes.push("/bookings")}
            >
              Book Now
            </AddButton>
          </div>
          <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="relative">
              <Image
                className="bg-fixed  rounded relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={"/images/landing-page/profile.png"}
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
                  className={`tab ${selectedTab === tab
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
