"use client"
import { useState } from "react"
import AddCartCard from "@/components/cards/cartCards"
import AddSteps from "@/components/steps/page"
import Layout from "@/components/layout"
import CardComments from "@/components/cards/commentCard"

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
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 justify-center mx-auto">
                    <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/red-bike.png"} />
                    <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/blue-bike.png"} />
                    <AddCartCard title={"Mobility Scooters"} images={"/images/bookings/black-bike.png"} />
                </div>


                    </>
                )
            case "Ghost Tour":
                return (
                    <>
                        <div className="hero bg-white">
                                <img
                                    className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[100vh] object-contain"
                                    src="/images/bookings/wallpaper.png"
                                />
                                <div className="hero-content text-neutral-content text-center bg-transparent border-2 rounded-md">
                                        <div className="max-w-md">
                                        <h1 className="mb-3 text-gray-700 text-5xl font-bold">Ghost of Fremont</h1>
                                        <div className="mb-2">
                                            <label className="flex justify-center text-gray-400 text-lg font-bold font-sans">Guest</label>
                                            <select className="select select-primary text-relaxBlack w-full max-w-xs">
                                                <option disabled selected>Rates for guest</option>
                                                <option>One Guest: $20</option>
                                                <option>Two Guest: $30</option>
                                                <option>Three Guest: $50</option>
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                        <label className="flex justify-center text-gray-400 text-lg font-bold font-sans">Pick a date</label>
                                        <input
                                            type="date"
                                            className="input input-bordered input-primary text-relaxBlack w-full max-w-xs"
                                            placeholder="Pick a date"
                                        />
                                        </div>
                                        <button className="btn btn-block bg-forestGreen text-offWhite">Book Now</button>
                                    </div>
                                </div>
                        </div>

                        <div className="w-full flex justify-center bg-forestGreen">
                            <h1 className="text-xl p-2 font-bold leading-tight tracking-wide text-black font-yesteryear">
                                What Our Clients Say
                            </h1>
                            </div>
                            
                            <div className="w-full flex justify-center gap-4 bg-forestGreen">
                            <CardComments
                                image={"/images/profile/profile_1.png"}
                                feedback={"We got to hear both his accounts of things as well local legends and information hes gleaned from others. He absolutely made our night!"}
                                name={"Katherine."}
                            />
                            <CardComments
                                image={"/images/profile/profile_2.png"}
                                feedback={"The ghost hunting we did was SO incredible and absolutely the highlight of our stay for us. I would go back to Vegas just to do the tour again"}
                                name={"Alyx."}
                            />
                            <CardComments
                                image={"/images/profile/profile_2.png"}
                                feedback={"An absolute must. Paranormal excellence and none of that nonsense the history of old or Downtown Las Vegas comes to life"}
                                name={"Deborah."}
                            />
                            
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
            <Layout>
                <div className="bg-white mx-auto mt-24 max-w-7xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <h2 className="text-clearGreen font-yesteryear text-4xl  font-bold leading-loose pb-2.5">
                            Plan your trips today!
                        </h2>
                    </div>
                    <p className="text-gray-500 text-lg text-center leading-8">
                            Discover the stories that haunt these streets, as our clients explore the eerie history during our exclusive ghost tours.
                    </p>
                    
                    <div className="bg-white ">
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
                        <div className="w-full  text-center">
                            {renderTabContent()}
                        </div>
                        <div className="bg-forestGreen text-white flex justify-center py-3">
                            <AddSteps />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AddBooking
