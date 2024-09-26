"use client";
import { useState } from "react";
import AddCartCard from "@/components/cards/cartCards";
import AddSteps from "@/components/steps/page";
import AddNavbar from "@/components/navbar/addNavbar";
import CardComments from "@/components/cards/commentCard";
import CardLabel from "@/components/cards/labelCard";
import AddModals from "@/components/modal/page";

const AddBooking = () => {
  const [selectedTab, setSelectedTab] = useState("Rent Scooters");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Rent Scooters", "Ghost Tour", "Vegas Tour", "Hunt Gear"];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Rent Scooters":
        return (
          <>
            <div className="flex flex-wrap max-w rounded gap-4 bg-white mb-1 justify-center">
              <AddCartCard
                title={"Mobility Scooters"}
                model={"Red"}
                images={"/images/bookings/red-bike.png"}
              />
              <AddCartCard
                title={"Mobility Scooters"}
                model={"Blue"}
                images={"/images/bookings/blue-bike.png"}
              />
              <AddCartCard
                title={"Mobility Scooters"}
                model={"Black"}
                images={"/images/bookings/black-bike.png"}
              />
            </div>
            <div className="bg-offGreen text-white w-full flex justify-center py-2">
              <AddSteps alignment={false} />
            </div>
            <div className="w-full flex  justify-center bg-forestGreen">
              <h1 className="text-xl p-1 mt-2 font-bold leading-tight tracking-wide text-gray-500 font-yesteryear">
                What Our Clients Say
              </h1>
            </div>
            <div className="w-full bg-forestGreen flex justify-center gap-4">
              <CardComments
                image={"/images/profile/profile_1.png"}
                feedback={
                  "We were skeptical but they were very patient in sending me documents to fill out. On day of arrival we met in easy location and pick up was easy. Definitely will use them again. Parents first refused but after walking and using scooters there loved them. Easy breezy"
                }
                name={"Claudia M."}
              />

              <CardComments
                image={"/images/profile/profile_2.png"}
                feedback={
                  "The owner is very approachable. Scooter is easy to use and it is sanitized and cleaned before the owner drops it off"
                }
                name={"Tommy G."}
              />
            </div>
          </>
        );
      case "Ghost Tour":
        return (
          <>
            <div className="hero bg-white">
              <img
                className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[100vh] object-contains"
                src="/images/bookings/ghost_bg.png"
              />
              <div className="hero-content text-neutral-content text-center bg-offWhite rounded-md">
                <div className="max-w-md">
                  <h1 className="mb-3 text-offBlack text-5xl font-semibold">
                    Ghost of Fremont
                  </h1>
                  <div className="mb-2">
                    <label className="flex justify-center text-offBlack text-lg font-bold font-sans">
                      Guest
                    </label>
                    <select
                      className="select select-primary text-relaxBlack w-full max-w-xs"
                      defaultValue="" // Use defaultValue for the initial state
                    >
                      <option value="" disabled>
                        Rates for guest
                      </option>
                      <option value="one">One Guest: $20</option>
                      <option value="two">Two Guest: $30</option>
                      <option value="three">Three Guest: $50</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="flex justify-center text-offBlack text-lg font-bold font-sans">
                      Pick a date
                    </label>
                    <input
                      type="date"
                      className="input input-bordered input-primary text-relaxBlack w-full max-w-xs"
                      placeholder="Pick a date"
                    />
                  </div>
                  <button
                    className="btn btn-block bg-forestGreen text-offWhite"
                    onClick={() => setIsModalOpen(true)} // Set modal state to true on click
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <AddModals
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <div className="w-full flex justify-center bg-white">
              <h1 className="text-xl p-2 font-bold leading-tight tracking-wide text-gray-500 font-yesteryear">
                What Our Clients Say
              </h1>
            </div>

            <div className="w-full flex justify-center gap-4 bg-white">
              <CardComments
                image={"/images/profile/profile_1.png"}
                feedback={
                  "We got to hear both his accounts of things as well local legends and information hes gleaned from others. He absolutely made our night!"
                }
                name={"Katherine."}
              />
              <CardComments
                image={"/images/profile/profile_2.png"}
                feedback={
                  "The ghost hunting we did was SO incredible and absolutely the highlight of our stay for us. I would go back to Vegas just to do the tour again"
                }
                name={"Alyx."}
              />
              <CardComments
                image={"/images/profile/profile_2.png"}
                feedback={
                  "An absolute must. Paranormal excellence and none of that nonsense the history of old or Downtown Las Vegas comes to life"
                }
                name={"Deborah."}
              />
            </div>
          </>
        );

      case "Vegas Tour":
        return (
          <>
            <div className="hero bg-white">
              <img
                className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[100vh] object-contains"
                src="/images/bookings/vegas-bg.png"
              />
              <div className="hero-content text-neutral-content text-center bg-offWhite rounded-md">
                <div className="max-w-md">
                  <h1 className="mb-3 text-offBlack text-5xl font-semibold">
                    Welcome to Vegas!
                  </h1>
                  <div className="mb-2">
                    <label className="flex justify-center text-offBlack text-lg font-bold font-sans">
                      Guest
                    </label>
                    <select
                      className="select select-primary text-relaxBlack w-full max-w-xs"
                      defaultValue="" // Use defaultValue for the initial state
                      required
                    >
                      <option value="" disabled>
                        Rates for guest
                      </option>
                      <option value="one">One Guest: $20</option>
                      <option value="two">Two Guest: $30</option>
                      <option value="three">Three Guest: $50</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="flex justify-center text-offBlack text-lg font-bold font-sans">
                      Pick a date
                    </label>
                    <input
                      type="date"
                      className="input input-bordered input-primary text-relaxBlack w-full max-w-xs"
                      placeholder="Pick a date"
                      required
                    />
                  </div>
                  <button
                    className="btn btn-block bg-forestGreen text-offWhite"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <AddModals
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <div className="w-full flex justify-center bg-white">
              <h1 className="text-xl p-2 font-bold leading-tight tracking-wide text-gray-500 font-yesteryear">
                What Our Clients Say
              </h1>
            </div>

            <div className="w-full flex justify-center gap-4 bg-white">
              <CardComments
                image={"/images/profile/profile_1.png"}
                feedback={
                  "Due to the evolving nature of of Las Vegas I was not expecting to enjoy the accomodations, prices given will only be valid for roughly Four Queens as much as I did, but  48-72 hours after itinerary is recieved. I'm glad they recommed it."
                }
                name={"Jamal H."}
              />
              <CardComments
                image={"/images/profile/profile_2.png"}
                feedback={
                  "So convenient! Ryan took all the guesswork out of my vacation AND showed eatery! Try Nacho Daddy!"
                }
                name={"Tony D."}
              />
            </div>
          </>
        );

      case "Hunt Gear":
        return (
          <>
            <div className="flex flex-wrap max-w rounded gap-4 bg-white  justify-center">
              <h1 className="text-xl p-2 font-bold leading-tight tracking-wide text-relaxBlack w-full text-center font-yesteryear mt-2">
                Ghost Hunting Tools
              </h1>
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
            <div className="bg-offGreen text-white w-full flex justify-center py-2">
              <AddSteps />
            </div>
          </>
        );
    }
  };

  return (
    <>
      <AddNavbar />
      <div className="bg-white mx-auto mt-24 max-w-7xl overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <h2 className="text-clearGreen font-yesteryear text-4xl  font-bold leading-loose pb-2.5">
            Plan your trips today!
          </h2>
        </div>
        <div className="bg-white">
          <div className="container mx-auto mt-8 text-lg flex justify-center">
            <div className="tabs tabs-boxed bg-white p-2 rounded-lg shadow-md">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab text-sm ${
                    selectedTab === tab
                      ? "lg:tab-active md:tab-active sm:tab-active text-blue-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full text-center">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AddBooking;
