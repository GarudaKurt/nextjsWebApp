"use client";

import { FaShoppingCart, FaReceipt, FaList, FaCheck } from "react-icons/fa";

const AddSteps = () => {
    return (
        <>
            <ul className="steps steps-vertical text-white lg:steps-horizontal">
                <li className="step step-white flex items-center space-x-2">
                    <FaShoppingCart className="w-6 h-6 lg:w-8 lg:h-8" />
                    <span className="hidden lg:block text-sm lg:text-base">Cart</span>
                </li>
                <li className="step step-white flex items-center space-x-2">
                    <FaReceipt className="w-6 h-6 lg:w-8 lg:h-8" />
                    <span className="hidden lg:block text-sm lg:text-base">Billing</span>
                </li>
                <li className="step step-white flex items-center space-x-2">
                    <FaList className="w-6 h-6 lg:w-8 lg:h-8" />
                    <span className="hidden lg:block text-sm lg:text-base">Information</span>
                </li>
                <li className="step step-white flex items-center space-x-2">
                    <FaCheck className="w-6 h-6 lg:w-8 lg:h-8" />
                    <span className="hidden lg:block text-sm lg:text-base">Verified</span>
                </li>
            </ul>
        </>
    );
};

export default AddSteps;
