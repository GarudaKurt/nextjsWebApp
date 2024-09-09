"use client"
import { useState } from "react"
import AddNavbar from "@/components/navbar/addNavbar"
import AddCartCard from "@/components/cards/cartCards"
import AddSteps from "@/components/steps/page"

const AddBooking = () => {
    const [selectedTab, setSelectedTab] = useState("Rent Scooters")

    const tabs = ["Rent Scooters", "Haunted Sites", "Equipments"]

    return (
        <>
            <AddNavbar />
            <div className="bg-white py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Centering the header */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <h2 className="text-clearGreen font-yesteryear text-4xl font-bold leading-loose pb-2.5">
                        Plan your trips today!
                    </h2>
                </div>

                {/* Tab-like button box */}
                <div className="flex flex-wrap justify-center  mt-8">
                    <div className="container mx-auto text-lg">
                        <div className="tabs tabs-boxed bg-white rounded-lg  flex justify-center">
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
                </div>

                {/* Displaying content based on the selected tab */}
                <div className="bg-clearGreen tabs tabs-boxed rounded-lg shadow-m">
                    {selectedTab === "Rent Scooters" && (
                        <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 px-10 w-full justify-center">
                            <AddCartCard images={"/images/bookings/red-bike.png"} />
                            <AddCartCard images={"/images/bookings/blue-bike.png"} />
                            <AddCartCard images={"/images/bookings/black-bike.png"} />
                        </div>
                    )}

                    {selectedTab === "Haunted Sites" && (
                        <div className="text-center">
                            <h3>Haunted Sites content goes here</h3>
                        </div>
                    )}

                    {selectedTab === "Equipments" && (
                        <div className="text-center">
                            <h3>Equipments content goes here</h3>
                        </div>
                    )}

                    <div className="bg-white flex justify-center py-5">
                        <AddSteps />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBooking
