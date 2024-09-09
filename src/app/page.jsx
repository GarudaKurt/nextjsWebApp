"use client";

import { useState } from "react";
import Image from "next/image";
import AddButton from "@/components/buttons/addButton";
import CardComments from "@/components/cards/commentCard";
import CardLabel from "@/components/cards/labelCard";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation"

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Gallery");

  const routes = useRouter()

  const images = [
    {
      src: "/images/landing-page/profiles.png",
      alt: "Profile image",
    },
    {
      src: "/images/landing-page/ghost.png",
      alt: "Main image",
    },
    {
      src: "/images/landing-page/bike.png",
      alt: "Scooter image",
    },
  ];

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const tabs = ["Ghost of Fremont", "Hunt Gear", "Scooter Rent"];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Ghost of Fremont":
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                What goes <strong>bump</strong> in the night? Join us and find out! 
                <br />
                <br />
                Seasoned Paranormal Researches take you down the strange, macabre rabbit hole of Las Vegas’s haunted
                past. This informative, meticulously researched tour combines local history, folklore, and ghost stories for a truly unique experience!
                <br />
                <br />
                Along the way, attempt to make contact with infamous outlaws and long-gone gangsters! The only question: are you brave enough to roll the dice?
                <br />
                <br />
                Tours are offered most Thursday, Friday, and Saturday Nigths. To book, reach out at vivalocalvegas@gmail.com for availability!
              </p>
                <AddButton align={"center"} events={() => alert('Button Clicked!')}>Book Now</AddButton>
            </form>
          </>
        );
      case "Hunt Gear":
        return (
          <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-1 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                Explore our collection of high-quality hunt gear designed for all your ghost-hunting adventures. From protective equipment to advanced tools, we have everything you need to enhance your experience and stay safe.
                <br />
                <br />
                Our gear is meticulously tested to ensure reliability and effectiveness in the most challenging conditions. Whether you're a seasoned ghost hunter or a curious beginner, our selection of hunt gear will support you in your quest to uncover the unknown.
              </p>
              <AddButton align={"center"}  events={() => alert('Button Clicked!')} >Book Now</AddButton>
            </form>
            <div className="flex flex-wrap max-w rounded gap-4 bg-white mb-2 justify-center">
              <h1 className="text-xl font-sans p-2 font-bold leading-tight tracking-wide text-black w-full text-center">Equipments</h1>
              <CardLabel
                image={"/images/equipments/equip_1.png"}
                name={"Thermal Camera"}
                title={"Thermal Camera"}
                descriptions={
                  "A Thermal Imaging Camera detects temperature changes, highlighting cold spots or heat fluctuations that may indicate paranormal activity, making it a crucial tool for ghost hunters"
                }
              />

              <CardLabel
                image={"/images/equipments/spiritbox.png"}
                name={"Sprint box"}
                title={"Spirit Box"}
                descriptions={
                  "A Spirit Box scans radio frequencies, allowing spirits to communicate by converting white noise into words or phrases. This essential tool captures real-time responses during ghost hunts."
                } 
              />

              <CardLabel
                image={"/images/equipments/rods.png"}
                name={"Diving Rods"}
                title={"Diving Rods"}
                descriptions={
                  "A Spirit Box scans radio frequencies, allowing spirits to communicate by converting white noise into words or phrases. This essential tool captures real-time responses during ghost hunts"
                }
              />

            </div>

          </>

          );
        case "Scooter Rent":
          return (
            <>
            <form className="card bg-white shadow-md rounded-lg p-8 mb-4 mx-auto max-w-4xl">
              <p className="text-base text-black leading-relaxed">
                Equipment is moving quick! Rent today!!!
                <br />
                Whether you’re looking for a leisurely exploration or an adventurous journey.
                <br />
                There is nothing more important than getting from Point A to Point B. As such, we will never overcharge for something so vital as mobility.
                <br />
                We keep our rental system as fast and simple as possible; we meet up, go over our contract, and get you rolling away in less than 10 minutes!
              </p>
              <AddButton align={"center"}  events={() => alert('Button Clicked!')}>Book Now</AddButton>
            </form>
            <div className="flex flex-wrap max-w rounded gap-2 bg-base-100">
            <div className="w-full flex justify-center">
              <h1 className="text-xl p-2 font-bold leading-tight tracking-wide text-black font-LuckiestGuy">
                What Our Clients Say
              </h1>
            </div>
            
            <div className="w-full flex justify-center gap-4">
              <CardComments
                image={"/images/profile/profile_1.png"}
                feedback={"We were skeptical but they were very patient in sending me documents to fill out. On day of arrival we met in easy location and pick up was easy. Definitely will use them again. Parents first refused but after walking and using scooters there loved them. Easy breezy"}
                name={"Claudia M."}
              />
              
              <CardComments
                image={"/images/profile/profile_2.png"}
                feedback={"The owner is very approachable. Scooter is easy to use and it is sanitized and cleaned before the owner drops it off"}
                name={"Tommy G."}
              />
            </div>
          </div>

          </>
          
        );
      default:
        return null;
    }
  };

  const landingCorousel = () => {
    switch (currentImage) {
      case 0:
        return (
          <>
            <h1 className="text-5xl font-sans font-bold leading-tight tracking-wide text-clearGreen">
              Visiting Vegas? <br />
              Let us help!<br />
            </h1>
            <p className="text-md font-sans mt-2 mb-2 font-semibold leading-tight tracking-wide text-gray-500">
              There are only 24 hours in the day! Seasoned <br />
              tour guides and well-versed locals take all the <br />
              guesswork out of Vegas, ensuring your <br />
              experience is as streamlined and exciting as <br />
              possible!
              <br/>
              <br/>
              20% of all profit is donated to Safe House Project!
            </p>
          </>
        );

      case 1:
        return (
          <h1 className="text-4xl font-sans font-bold leading-tight tracking-wide text-relaxGreen">
            DISCOVER THE <br />
            HIDDEN <br />
            <span className="italic text-indigo-400">MYSTERIES</span><br />
            OF GHOST TOWN<br />
            WITH US!
          </h1>
        );
      case 2:
        return (
          <h1 className="text-4xl font-sans font-bold leading-tight tracking-wide text-relaxGreen">
            EXPERIENCE THE <br />
            SIGHT OF <br />
            LAS VEGAS ON A <br />
            BIKE RENT NOW AND <br />
            ENJOY WITH FRIENDS
          </h1>
        );
      default:
        return null;
    }
  };

  return (
    <div  className=" text-white min-h-screen bg-white ">
      <Layout>
        <div className="container mx-auto text-white mt-20 flex flex-col md:flex-row items-center">
          <div className="ml-5 md:ml-20">
            {landingCorousel()}
            <AddButton bcolor={"bg-clearGreen"} events={() => routes.push("/bookings")}>Book Now</AddButton>
          </div>
          <div className="mt-8 ml-auto mr-auto md:mr-40 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="relative">
              <Image
                className="bg-fixed rounded relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={images[currentImage].src}
                layout="responsive"
                width={350}
                height={350}
                alt={images[currentImage].alt}
              />
              <button
                onClick={prevImage}
                className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white"
              >
                &#8249;
              </button>
              <button
                onClick={nextImage}
                className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white"
              >
                &#8250;
              </button>
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
