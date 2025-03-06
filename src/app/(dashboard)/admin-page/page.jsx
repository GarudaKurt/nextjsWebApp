"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/zustand/zustand";
import { ref, set, push, onValue } from "firebase/database";
import { database } from "@/components/cards/firebaseConfig/config";

const Admin = () => {
  const router = useRouter();

  // Updated state names based on fetchedData
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [subDescription1, setSubDescription_1] = useState("");
  const [subDescription2, setSubDescription_2] = useState("");
  const [subDescription3, setSubDescription_3] = useState("");
  const [subDescription4, setSubDescription_4] = useState("");
  const [subDescription5, setSubDescription_5] = useState("");

  const [btnTitle, setBtnTitle] = useState("");
  const [addButton, setBtnShow] = useState(false);

  const handleToggle = () => setBtnShow(!addButton);

  const handleSubmit = () => {
    const monitoringRef = ref(database, "monitoring"); // Retain the existing path

    const formData = {
      title,
      subTitle,
      description,
      subDescription,
      subDescription1,
      subDescription2,
      subDescription3,
      subDescription4,
      subDescription5,
      btnTitle,
      addButton,
    };

    set(monitoringRef, formData)
      .then(() => {
        alert("Data saved successfully");
        setTitle("");
        setSubTitle("");
        setDescription("");
        setSubDescription("");
        setSubDescription_1("");
        setSubDescription_2("");
        setSubDescription_3("");
        setSubDescription_4("");
        setSubDescription_5("");
        setBtnTitle("");
        setBtnShow(false);
        
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <>
      <div className="bg-white md:px-8 w-full py-8">
        <h2 className="px-8 text-gray-500 text-lg font-sans">
          Please enter your event info.
        </h2>
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your event title"
              className="input input-bordered w-full"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              contentEditable={false}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your event sub title"
              className="input input-bordered w-full"
              required
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Event description"
              className="textarea h-24 textarea-bordered w-full"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description</span>
            </label>
            <textarea
              placeholder="Sub description"
              className="textarea h-24 textarea-bordered w-full"
              required
              value={subDescription}
              onChange={(e) => setSubDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description first label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={subDescription1}
              onChange={(e) => setSubDescription_1(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description second label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={subDescription2}
              onChange={(e) => setSubDescription_2(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description third label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={subDescription3}
              onChange={(e) => setSubDescription_3(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description fourth label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={subDescription4}
              onChange={(e) => setSubDescription_4(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description fifth label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={subDescription5}
              onChange={(e) => setSubDescription_5(e.target.value)}
            ></textarea>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Would you like to add buttons?</span>
            </label>
            <span className="text-sm">{addButton ? "Yes" : "No"}</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={addButton}
              onChange={handleToggle}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Buttons Title</span>
            </label>
            <input
              type="text"
              placeholder="Buttons Title"
              className="input input-bordered w-full"
              required
              value={btnTitle}
              onChange={(e) => setBtnTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start p-10">
            <button
              className="btn bg-relaxGreen hover:bg-clearGreen text-white text-md w-full md:w-auto"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
      </div>
    </>
  );
};

export default Admin;
