"use client";
import AddButton from "../buttons/addButton";
import { useState } from "react";
const Cards = ({ title, descriptions }) => {
  const [showMore, setShowMore] = useState(false);

  const showDescriptions = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="max-w-xs mt-2 mb-4 rounded overflow-hidden shadow-lg flex flex-col items-center">
      <hr className="border-t-8 border-grayGreen w-full my-4" />
      <div className="px-6 py-4">
        <div className="font-bold text-grayscale text-xl mb-2 text-center">
          {title}
        </div>
        {showMore && (
          <p className="text-black text-base text-center">{descriptions}</p>
        )}
        <AddButton align={"center"} events={showDescriptions}>
          {showMore ? "Show Less" : "Learn More"}
        </AddButton>
      </div>
    </div>
  );
};

export default Cards;
