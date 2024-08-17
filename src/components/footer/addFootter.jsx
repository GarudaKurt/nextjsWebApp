import { FaEnvelope, FaWhatsapp, FaPhone, FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";

const AddFooter = () => {
    return (
        <footer style={{background: "#2C2C2C"}}className=" text-white pt-8 pb-4 mt-12">
            <div className="container mx-auto px-4 md:flex md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
                <FaEnvelope className="mr-2 text-white" />
                <div>
                <div>Email Support</div>
                <div className="text-gray-400">celestine@gmail.com</div>
                </div>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
                <FaWhatsapp className="mr-2 text-white" />
                <div>
                <div>Whatsapp Support</div>
                <div className="text-gray-400">08147758883</div>
                </div>
            </div>
            <div className="flex items-center">
                <FaPhone className="mr-2 text-white" />
                <div>
                <div>Phone Support</div>
                <div className="text-gray-400">08147758883</div>
                </div>
            </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
            <FaInstagram className="text-white hover:text-gray-400 cursor-pointer" />
            <FaTwitter className="text-white hover:text-gray-400 cursor-pointer" />
            <FaFacebookF className="text-white hover:text-gray-400 cursor-pointer" />
            <FaTiktok className="text-white hover:text-gray-400 cursor-pointer" />
            </div>
            <div className="text-center text-gray-400 mt-4">
            © 2024, All Rights Reserved
            </div>
      </footer>
    )
}

export default AddFooter