"use client"
import Image from "next/image"
import { useState } from "react"

const AddCartCard = ({ images }) => {
    const [priceRates, setPriceRates] = useState(0)

    const handleRateChange = (e) => {
        const selectedRate = e.target.value;
        switch (selectedRate) {
            case "24 hours":
                setPriceRates(35); 
                break;
            case "48 hours":
                setPriceRates(55);
                break;
            case "120 hours":
                setPriceRates(135);
                break;
            default:
                setPriceRates(0);
        }
    }

    return (
        <div className="card w-80 bg-white mt-8 shadow-lg mb-2 ml-3"> 
            <div className="card-body items-center text-center">
                <div className="flex justify-between w-full">
                    <h2 className="card-title">Mobility Scooter</h2>
                    <div className="rating gap-1">
                        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                    </div>
                </div>

                <div className="w-full h-40">
                    <Image
                        src={images}
                        alt="Scooter"
                        className="rounded-md mx-auto"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="flex justify-between w-full mt-8">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 5v2"></path>
                            <path d="M12 17v2"></path>
                            <path d="M5.07 9.93l1.41 1.41"></path>
                            <path d="M17.51 17.5l1.41-1.41"></path>
                            <path d="M5.07 14.07l1.41-1.41"></path>
                            <path d="M17.51 6.49l1.41 1.41"></path>
                        </svg>
                        <p className="text-sm ml-2 text-gray-500">Automatic</p>
                    </div>

                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.364A4 4 0 0110 16h4a4 4 0 014.879 3.364M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm ml-2 text-gray-500">1 person</p>
                    </div>
                </div>

                <div className="flex justify-between w-full items-center mt-4">
                    <select className="select select-ghost p-2 w-full max-w-xs" onChange={handleRateChange}>
                        <option disabled selected>rates</option>
                        <option>24 hours</option>
                        <option>48 hours</option>
                        <option>120 hours</option>
                    </select>
                    <p className="text-sm font-semibold">${priceRates}</p>
                    <button className="btn btn-sm ml-5 text-white bg-clearGreen ">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default AddCartCard
