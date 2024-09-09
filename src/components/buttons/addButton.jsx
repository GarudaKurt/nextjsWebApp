"use client"
const AddButton = ({ children, align, bcolor, events }) => {
    const bcolors = bcolor ? bcolor : "bg-pinkRed";
    const setAlignment = align ? align : "start";
  
    return (
      <div className={`flex justify-${setAlignment}`}>
        <button
          type="button"
          className={`font-bold ${bcolors} rounded text-white mt-2 px-5 py-2`}
          onClick={events}
        >
          {children}
        </button>
      </div>
    );
  };
  
  export default AddButton;
  