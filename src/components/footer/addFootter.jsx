import {
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const AddFooter = () => {
  return (
    <footer className="text-white bg-relaxBlack pt-8 pb-4 ">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaEnvelope className="mb-2 text-white" />
          <div className="text-center">
            <div>Email Support</div>
            <div className="text-gray-400">universityofcebu@gmail.com</div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <FaWhatsapp className="mb-2 text-white" />
          <div className="text-center">
            <div>Whatsapp Support</div>
            <div className="text-gray-400">7253778651</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <FaPhone className="mb-2 text-white" />
          <div className="text-center">
            <div>Phone Support</div>
            <div className="text-gray-400">7253778651</div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <a href="https://www.instagram.com/squarespace/">
          <FaInstagram className="text-white hover:text-gray-400 cursor-pointer" />
        </a>
        <a href="https://x.com/squarespace">
          <FaTwitter className="text-white hover:text-gray-400 cursor-pointer" />
        </a>
        <a href="https://www.facebook.com/squarespace/">
          <FaFacebookF className="text-white hover:text-gray-400 cursor-pointer" />
        </a>
      </div>
      <div className="text-center text-gray-400 mt-4">
      University of Cebu - SHS Department.
        <br />© 2024, All Rights Reserved
      </div>
    </footer>
  );
};

export default AddFooter;
