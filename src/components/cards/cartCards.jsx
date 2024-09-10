import { useState, useEffect } from "react";

const AddCartCard = ({ images, title, bikesRates, tourRates, equipmentRates }) => {
    const [priceRates, setPriceRates] = useState(0);
    const [qty, setQty] = useState(0);
    const [rate, setRate] = useState(""); // Store the selected rate

    // This effect recalculates price when qty or rate changes
    useEffect(() => {
        let total = 0;
        switch (rate) {
            case "24 hours":
                total = qty * 35;
                break;
            case "48 hours":
                total = qty * 55;
                break;
            case "120 hours":
                total = qty * 135;
                break;
            default:
                total = 0;
        }
        setPriceRates(total);
    }, [qty, rate]); // Dependency array, will run the effect when either changes

    // Handles rate change
    const handleRateChange = (e) => {
        const selectedRate = e.target.value;
        setRate(selectedRate); // Update rate when the user selects a new one
    };

    const handleDecrement = () => {
        if (qty > 0) setQty(qty - 1);
    };

    const handleIncrement = () => {
        setQty(qty + 1);
    };

    return (
        <div className="card w-80 bg-white mt-4 shadow-lg  ml-3">
            <div className="card-body items-center text-center">
                <div className="flex justify-between w-full">
                    <h2 className="card-title">{title}</h2>
                    <div className="rating gap-1">
                        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                    </div>
                </div>

                <div className="w-full h-40">
                    <img
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
                    <button className="btn btn-sm ml-5 text-white bg-clearGreen">Add to Cart</button>
                </div>

                <div className="flex justify-center items-center p-2 rounded-full">
                    <button className="text-red-400" onClick={handleDecrement}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <circle cx="12" cy="12" r="10" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9" />
                        </svg>
                    </button>

                    <span className="mx-4 text-md text-gray-400">{qty}</span>

                    <button className="text-gray-400" onClick={handleIncrement}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <circle cx="12" cy="12" r="10" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCartCard;
