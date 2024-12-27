"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaTrash,
  FaArrowLeft,
  FaPlus,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import AddSteps from "@/components/steps/page";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/zustand/zustand";

const MyCart = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [cart, setCart] = useState([]); // State to track cart data
  const [cartStatus, setCartStatus] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const router = useRouter();

  const imagesLoad = [
    "/images/bookings/red-bike.png",
    "/images/bookings/blue-bike.png",
    "/images/bookings/black-bike.png",
  ];

  const imgEquipment = [
    "/images/bookings/thermal.png",
    "/images/bookings/box.png",
    "/images/bookings/rods.png",
  ];

  // Get cart data from store
  const { updateCart, deleteCart, getForm, updateMyCarts, cancelOrder } = useCartStore(
    (state) => ({
      updateCart: state.updateCart,
      deleteCart: state.deleteCart,
      getForm: state.getForm,
      updateMyCarts: state.updateMyCarts,
      cancelOrder: state.cancelOrder
    })
  );

  const carts = useCartStore((state) => state.userData?.myCart || []);
    useEffect(() => {
      setCart(carts); // Update local state when Zustand's state changes
  }, [carts]);

  const handleCancel = () => {
    setShowModal(true);
    setModalMessage("Are you sure you want to cancel your order?");
  };

  const confirmCancel = async () => {
    await cancelOrder();
    setShowModal(false);
  };

  

  useEffect(() => {
    const fetchCartData = async () => {
      await getForm(); // Fetch the cart data
      setCart(useCartStore.getState().userData?.myCart || []); // Update the local state with cart data
      let orderStatus = useCartStore.getState().userData?.orderStatus || false;
      console.log("Status: ", orderStatus);
      setCartStatus(orderStatus);
    };
    fetchCartData();
  }, [getForm, setCartStatus]);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateTotal = (qty, rate, equipmentTitle) => {
    if (equipmentTitle) return qty * 5;
    switch (rate) {
      case "24 hours":
        return qty * 35;
      case "48 hours":
        return qty * 55;
      case "120 hours":
        return qty * 135;
      default:
        return 0;
    }
  };

  const handleRateChange = (e, index) => {
    const selectedRate = e.target.value;
    const updatedCart = [...cart];
  
    updatedCart[index].rate = selectedRate;
  
    const total = calculateTotal(
      updatedCart[index].qty,
      selectedRate,
      updatedCart[index].equipment_title
    );
  
    updatedCart[index].total = total;
  
    updateCart(index, updatedCart[index]);
    updateMyCarts();
    setCart(updatedCart); // Ensure state is updated
  };
  

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
  
    updatedCart[index].qty += 1;
  
    const total = calculateTotal(
      updatedCart[index].qty,
      updatedCart[index].rate,
      updatedCart[index].equipment_title
    );
  
    updatedCart[index].total = total;
  
    updateCart(index, updatedCart[index]);
    updateMyCarts();
    setCart(updatedCart); // Ensure state is updated
    setUpdateMessage(`You have updated the quantity to ${updatedCart[index].qty}`);
  };
  

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
  
    if (updatedCart[index].qty > 1) {
      updatedCart[index].qty -= 1;
  
      const total = calculateTotal(
        updatedCart[index].qty,
        updatedCart[index].rate,
        updatedCart[index].equipment_title
      );
  
      updatedCart[index].total = total;
  
      updateCart(index, updatedCart[index]);
      updateMyCarts();
      setCart(updatedCart); // Ensure state is updated
      setUpdateMessage(`You have updated the quantity to ${updatedCart[index].qty}`);
    } else {
      // Remove item completely if quantity is 1
      updatedCart.splice(index, 1);
      updateCart(index, null); // Remove the item from the store
      deleteCart(index); // Ensure deletion logic updates the cart in Firestore
      updateMyCarts();
      setCart(updatedCart); // Ensure state is updated
      setUpdateMessage(`Item removed from the cart.`);
    }
  };
  

  const displayCart = () => {
    if (cart.length === 0) {
      return (
        <p className="text-center text-gray-500">
          Your cart is currently empty.
        </p>
      );
    }

    return cart.map((item, index) => {
      let imageUrl = "";
      let modelTitle = "";

      if (item.models === "Red") {
        imageUrl = imagesLoad[0];
        modelTitle = item.models + " Scooter";
      } else if (item.models === "Blue") {
        imageUrl = imagesLoad[1];
        modelTitle = item.models + " Scooter";
      } else if (item.models === "Black") {
        imageUrl = imagesLoad[2];
        modelTitle = item.models + " Scooter";
      } else if (item.equipment_title === "Thermal Camera") {
        imageUrl = imgEquipment[0];
        modelTitle = item.equipment_title;
      } else if (item.equipment_title === "Spirit Box") {
        imageUrl = imgEquipment[1];
        modelTitle = item.equipment_title;
      } else if (item.equipment_title === "Diving Rods") {
        imageUrl = imgEquipment[2];
        modelTitle = item.equipment_title;
      }

      return (
        <div
          key={index}
          className="w-full bg-white shadow-md rounded-lg p-4 mt-4 "
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4 w-full items-center sm:items-start space-y-4 sm:space-y-0">
            <div className="w-24 h-24 sm:w-20 sm:h-20 rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt={modelTitle}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-md font-semibold mt-2">{modelTitle}</h2>
            </div>

            <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center justify-center space-x-2">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDecrement(index)}
                >
                  <FaTrash className="text-red-400" />
                </button>
                <span className="text-lg text-offBlack">{item.qty}</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleIncrement(index)}
                >
                  <FaPlus className="text-offBlack" />
                </button>
                <div className="flex items-center space-x-4">
                  <select
                    className="text-md text-offBlack"
                    value={item.rate}
                    onChange={(e) => handleRateChange(e, index)}
                    disabled={!!item.equipment_title}
                  >
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="120 hours">120 hours</option>
                  </select>
                  <p className="text-md text-semibold text-offBlack whitespace-nowrap">
                    ${item.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-white md:px-8 w-full">
      <div className="flex items-center px-2 pt-2 justify-start">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => router.push("/bookings")}
        >
          <FaArrowLeft className="text-gray-500" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-600">
          Shopping Continue
        </h1>
      </div>
      <div className="divider"></div>
      <p className="text-xs px-5 md:text-sm text-gray-500 mb-3">
        You have {cart.length} items in your cart
      </p>
      {isSmallScreen && cart.length > 0 && (
        <AddSteps alignment={false} hidden={true} cartPage={"step-success"} billPage={"step-success"} infoPage={"step-success"} confirmPage={"step-success"}/>
      )}
      <div className="flex flex-col md:flex-row md:space-x-4 items-start">
        {!isSmallScreen && cart.length > 0 && (
          <AddSteps alignment={true} hidden={true} cartPage={"step-success"} billPage={"step-success"} infoPage={"step-success"} confirmPage={"step-success"}/>
        )}
        <div className="border border-base-300 mb-2 bg-white w-full rounded-md md:w-1/2 mt-5">
          <h2 className="text-sm md:text-xl mb-2 p-2 font-semibold text-gray-600">
            Shopping Cart
          </h2>
          <div
            className={`${cart.length > 2 ? "max-h-64 overflow-y-auto" : ""}`}
          >
            {displayCart()}
          </div>
          <div className="flex justify-start p-2">
            <button
              className="btn bg-offWhite hover:bg-white text-relaxBlack text-md"
              onClick={()=>{handleCancel()}}
            >
              Cancel order
            </button>
          </div>
          <div className={`modal ${showModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <p className="text-center">{modalMessage}</p>
            <div className="modal-action flex justify-center">
              <button className="btn text-white bg-cancelRed hover:bg-cancelRed mx-2" onClick={confirmCancel}>
                Yes
              </button>
              <button className="btn bg-offWhite mx-2" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs px-5 md:text-sm text-gray-500 m-3">
          {updateMessage}
        </p>
        </div>
        
        {cart.length > 0 && (
          <div className="flex items-center justify-start pt-4">
            <h3 className="px-8 text-lg md:text-xl font-bold text-gray-500">
              Status:
            </h3>
            {cartStatus ? (
              <button className="btn btn-xs bg-successGreen hover:bg-green-500 text-white text-center font-semibold rounded-full px-2 flex items-center ">
                <span>Approve! Order</span>
                <FaCheckCircle />
              </button>
            ) : (
              <button className="btn btn-xs bg-pendingYellow hover:bg-yellow-500 text-white text-center font-semibold rounded-full px-2 flex items-center ">
                <span>Pending Order</span>
                <FaClock />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;
