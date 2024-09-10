"use client"
import { useState } from "react"
import AddNavbar from "@/components/navbar/addNavbar"
import AddCartCard from "@/components/cards/cartCards"
import AddSteps from "@/components/steps/page"
import Image from "next/image"

const AddBooking = () => {
    const [selectedTab, setSelectedTab] = useState("Rent Scooters")

    const tabs = ["Rent Scooters", "Ghost Tour", "Equipments"]

    // Array of images for the Ghost Tour carousel
    const ghostTourImages = [
        "/images/bookings/ghost_hunt_1.png",
        "/images/bookings/ghost_hunt_2.png",
        "/images/bookings/ghost_hunt_3.png",
        "/images/tour/pic_1.png",
        "/images/tour/pic_2.png",
        "/images/tour/pic_3.png",
        "/images/tour/pic_4.png"
    ]

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Rent Scooters":
                return (
                    <>
                        <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 px-10 w-full justify-center">
                            <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/red-bike.png"} />
                            <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/blue-bike.png"} />
                            <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/black-bike.png"} />
                        </div>
                    </>
                )
            case "Ghost Tour":
                return (
                    <>
                        <div className="carousel rounded-box md-shadow mt-4">
                            {ghostTourImages.map((src, index) => (
                                <div key={index} className="carousel-item">
                                    <Image
                                        src={src}
                                        alt={`tour image ${index + 1}`}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )
            case "Equipments":
                return (
                    <>
                        <h1>Hello Equipments</h1>
                    </>
                )
        }
    }

    return (
        <>
            <AddNavbar />
            <div className="bg-white py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <h2 className="text-clearGreen font-yesteryear text-4xl font-bold leading-loose pb-2.5">
                        Plan your trips today!
                    </h2>
                </div>
                <div className="bg-clearGreen rounded-md">
                    <div className="container mx-auto mt-8 text-lg flex justify-center">
                        <div className="tabs tabs-boxed bg-white rounded-lg shadow-md">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`tab ${
                                        selectedTab === tab ? "tab-active text-blue-400" : "text-gray-400"
                                    }`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full px-4 text-center">
                        {renderTabContent()}
                    </div>
                    <div className="bg-clearGreen text-white flex justify-center py-5">
                        <AddSteps />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBooking
