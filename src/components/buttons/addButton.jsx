const AddButton = ({ children, align, events }) => {

      const setAlignment = align ? align : "left"
      return (
          <div className={`flex justify-${setAlignment}`}>
              <button className="font-bold bg-pinkRed text-white mt-2 px-5 py-2" onClick={events} >
                  {children}
              </button>
          </div>
      );
    };
    
    export default AddButton;
    