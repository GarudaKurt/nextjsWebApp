"use client";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ref, set } from "firebase/database";
import { database } from "@/components/cards/firebaseConfig/config";

const Admin = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // Part 1 states
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subDescription1_0, setSubDescription_1] = useState("");
  const [subDescription2_0, setSubDescription_2] = useState("");
  const [subDescription3_0, setSubDescription_3] = useState("");
  const [subDescription4_0, setSubDescription_4] = useState("");
  const [subDescription5_0, setSubDescription_5] = useState("");

  // Part 2 states
  const [title_1, setTitle_1] = useState("");
  const [subTitle_1, setSubTitle_1] = useState("");
  const [description_1, setDescription_1] = useState("");
  const [subDescription1, setSubDescription1] = useState("");
  const [subDescription2, setSubDescription2] = useState("");
  const [subDescription3, setSubDescription3] = useState("");
  const [subDescription4, setSubDescription4] = useState("");
  const [subDescription5, setSubDescription5] = useState("");
  const [subDescription6, setSubDescription6] = useState("");

  // Part 3 states
  const [title_2, setTitle_2] = useState("");
  const [subTitle_2, setSubTitle_2] = useState("");
  const [description_2, setDescription_2] = useState("");
  const [subDescription1_2, setSubDescription1_2] = useState("");
  const [subDescription2_2, setSubDescription2_2] = useState("");
  const [subDescription3_2, setSubDescription3_2] = useState("");
  const [subDescription4_2, setSubDescription4_2] = useState("");
  const [subDescription5_2, setSubDescription5_2] = useState("");
  const [subDescription6_2, setSubDescription6_2] = useState("");

  const handleSubmit = () => {
    const monitoringRef = ref(database, "monitoring");
    const formData = {
      title,
      subTitle,
      description,
      subDescription1_0,
      subDescription2_0,
      subDescription3_0,
      subDescription4_0,
      subDescription5_0,
      title_1,
      subTitle_1,
      description_1,
      subDescription1,
      subDescription2,
      subDescription3,
      subDescription4,
      subDescription5,
      subDescription6,
      title_2,
      subTitle_2,
      description_2,
      subDescription1_2,
      subDescription2_2,
      subDescription3_2,
      subDescription4_2,
      subDescription5_2,
      subDescription6_2,
    };

    set(monitoringRef, formData)
      .then(() => alert("Data saved successfully"))
      .catch((error) => console.error("Error saving data:", error));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <h2 className="px-8 text-gray-500 text-lg font-sans">
              Please enter your event info (Page 1).
            </h2>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
              <input
                type="text"
                placeholder="Enter your event title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your event subtitle"
                className="input input-bordered w-full"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
              <textarea
                placeholder="Enter your event description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 1"
                className="textarea textarea-bordered w-full"
                value={subDescription1_0}
                onChange={(e) => setSubDescription_1(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 2"
                className="textarea textarea-bordered w-full"
                value={subDescription2_0}
                onChange={(e) => setSubDescription_2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 3"
                className="textarea textarea-bordered w-full"
                value={subDescription3_0}
                onChange={(e) => setSubDescription_3(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 4"
                className="textarea textarea-bordered w-full"
                value={subDescription4_0}
                onChange={(e) => setSubDescription_4(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 5"
                className="textarea textarea-bordered w-full"
                value={subDescription5_0}
                onChange={(e) => setSubDescription_5(e.target.value)}
              />
            </div>
          </>
        );
  
      case 2:
        return (
          <>
            <h2 className="px-8 text-gray-500 text-lg font-sans">
              Please enter additional event info (Page 2).
            </h2>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
              <input
                type="text"
                placeholder="Enter Part 2 title"
                className="input input-bordered w-full"
                value={title_1}
                onChange={(e) => setTitle_1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Part 2 subtitle"
                className="input input-bordered w-full"
                value={subTitle_1}
                onChange={(e) => setSubTitle_1(e.target.value)}
              />
              <textarea
                placeholder="Enter Part 2 description"
                className="textarea textarea-bordered w-full"
                value={description_1}
                onChange={(e) => setDescription_1(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 1"
                className="textarea textarea-bordered w-full"
                value={subDescription1}
                onChange={(e) => setSubDescription1(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 2"
                className="textarea textarea-bordered w-full"
                value={subDescription2}
                onChange={(e) => setSubDescription2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 3"
                className="textarea textarea-bordered w-full"
                value={subDescription3}
                onChange={(e) => setSubDescription3(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 4"
                className="textarea textarea-bordered w-full"
                value={subDescription4}
                onChange={(e) => setSubDescription4(e.target.value)}
              />
            </div>
          </>
        );
  
      case 3:
        return (
          <>
            <h2 className="px-8 text-gray-500 text-lg font-sans">
              Please enter final event info (Page 3).
            </h2>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
              <input
                type="text"
                placeholder="Enter Part 3 title"
                className="input input-bordered w-full"
                value={title_2}
                onChange={(e) => setTitle_2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Part 3 subtitle"
                className="input input-bordered w-full"
                value={subTitle_2}
                onChange={(e) => setSubTitle_2(e.target.value)}
              />
              <textarea
                placeholder="Enter Part 3 description"
                className="textarea textarea-bordered w-full"
                value={description_2}
                onChange={(e) => setDescription_2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 1"
                className="textarea textarea-bordered w-full"
                value={subDescription1_2}
                onChange={(e) => setSubDescription1_2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 2"
                className="textarea textarea-bordered w-full"
                value={subDescription2_2}
                onChange={(e) => setSubDescription2_2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 3"
                className="textarea textarea-bordered w-full"
                value={subDescription3_2}
                onChange={(e) => setSubDescription3_2(e.target.value)}
              />
              <textarea
                placeholder="Sub Description 4"
                className="textarea textarea-bordered w-full"
                value={subDescription4_2}
                onChange={(e) => setSubDescription4_2(e.target.value)}
              />
            </div>
          </>
        );
  
      default:
        return null;
    }
  };
  

  return (
    <div className="bg-white md:px-8 w-full py-8">
      {renderPage()}
      <div className="flex justify-between p-10">
        <button className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span className="text-gray-500">Page {currentPage} of {totalPages}</span>
        <button className={`btn ${currentPage === totalPages ? "btn-disabled" : ""}`} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Admin;
