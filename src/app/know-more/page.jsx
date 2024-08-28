"use client"

import Layout from "@/components/layout"
import Cards from "@/components/cards/addCard"

const AboutUS = () => {
    return(
        <>
            <Layout>
                <div className="py-24 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="pb-16 text-center">
                            <div className="flex flex-col sm:flex-row justify-center mt-2 items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <h2 className="text-gray-900 text-4xl font-bold leading-tight text-secondary">
                                    WHO WE ARE
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-8 mt-4">
                             Discover our unique offerings designed to provide thrilling adventures, equip you with top-notch ghost hunting tools, and make your exploration of the city convenient and enjoyable.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Cards 
                                title={"Explore Haunted Sites"}
                                descriptions={"Join our guided tours through the most haunted locations. Experience the thrill of uncovering hidden stories and the eerie charm of abandoned places with our expert guides."}
                            />
                            <Cards 
                                title={"Ghost Hunting Gear"}
                                descriptions={"Equip yourself with the best tools for ghost hunting. From EMF detectors to night vision cameras, our high-quality gear ensures you capture every paranormal moment."}
                            />
                            <Cards 
                                title={"Scooter Rentals"}
                                descriptions={"Rent a scooter to easily explore the city. Ideal for covering more ground during your adventures, our reliable scooters make navigating around town a breeze."}
                            />
                        </div>
                    </div>
                </div> 
            </Layout>
        </>
    )
}

export default AboutUS
