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
  const [tabs_1_title, setTab_1] = useState("");
  const [tabs_2_title, setTab_2] = useState("");
  const [tabs_3_title, setTab_3] = useState("");
  const [tabs_1_des, settabs_description_1] = useState("");
  const [tabs_2_des, settabs_description_2] = useState("");
  const [tabs_3_des, settabs_description_3] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subDescription, setSubDescription] = useState("");
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
      tabs_1_title,
      tabs_2_title,
      tabs_3_title,
      tabs_1_des,
      tabs_2_des,
      tabs_3_des,
      btnTitle,
      addButton,
    };

    set(monitoringRef, formData)
      .then(() => {
        console.log("Data saved successfully");
        setTitle("");
        setSubTitle("");
        setDescription("");
        setSubDescription("");
        setTab_1("");
        setTab_2("");
        setTab_3("");
        settabs_description_1("");
        settabs_description_2("");
        settabs_description_3("");
        setBtnTitle("");
        setBtnShow(false);
        router.push("/landing-page");
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <>
      <div className="bg-white md:px-8 w-full py-8">
        <p className="px-8 text-gray-500 text-sm font-sans">
          Please enter your event info.
        </p>
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
              <span className="label-text">First tab title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your event sub title"
              className="input input-bordered w-full"
              required
              value={tabs_1_title}
              onChange={(e) => setTab_1(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description first label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={tabs_1_des}
              onChange={(e) => settabs_description_1(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Second tab title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your event sub title"
              className="input input-bordered w-full"
              required
              value={tabs_2_title}
              onChange={(e) => setTab_2(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description second label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={tabs_2_des}
              onChange={(e) => settabs_description_2(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Third tab title</span>
            </label>
            <input
              type="text"
              placeholder="Tab title"
              className="input input-bordered w-full"
              required
              value={tabs_3_title}
              onChange={(e) => setTab_3(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub description third label</span>
            </label>
            <textarea
              placeholder="Enter your tabs name"
              className="textarea textarea-bordered w-full"
              required
              value={tabs_3_des}
              onChange={(e) => settabs_description_3(e.target.value)}
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

          <div className="flex justify-start p-2">
            <button
              className="btn bg-relaxGreen hover:bg-clearGreen text-white text-md w-full md:w-auto"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
