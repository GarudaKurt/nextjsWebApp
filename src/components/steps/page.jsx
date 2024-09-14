"use client";

import Link from "next/link";
import { FaShoppingCart, FaReceipt, FaList, FaCheck } from "react-icons/fa";

const AddSteps = () => {
    return (
        <>
            <ul className="steps steps-vertical text-white lg:steps-horizontal">
                <Link href="#" className="step step-white flex items-center space-x-2 group">
                    <FaShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
                    <span className="hidden lg:block text-sm lg:text-base group-hover:bg-forestGreen p-1 rounded">
                        Cart
                    </span>
                </Link>
                <Link href="#" className="step step-white flex items-center space-x-2 group">
                    <FaReceipt className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
                    <span className="hidden lg:block text-sm lg:text-base group-hover:bg-forestGreen p-1 rounded">
                        Billing
                    </span>
                </Link>
                <Link href="#" className="step step-white flex items-center space-x-2 group">
                    <FaList className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
                    <span className="hidden lg:block text-sm lg:text-base group-hover:bg-forestGreen p-1 rounded">
                        Information
                    </span>
                </Link>
                <Link href="#" className="step step-white flex items-center space-x-2 group">
                    <FaCheck className="w-6 h-6 lg:w-8 lg:h-8 group-hover:bg-clearGreen p-1 rounded" />
                    <span className="hidden lg:block text-sm lg:text-base group-hover:bg-forestGreen p-1 rounded">
                        Verified
                    </span>
                </Link>
            </ul>
        </>
    );
};

export default AddSteps;
