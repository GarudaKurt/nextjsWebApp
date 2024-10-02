import Image from "next/image";
import { useCartStore } from "@/app/zustand/zustand";
const CardLabel = ({ image, name, title, descriptions }) => {
  const addToCart = useCartStore((state) => state.add_to_cart); // Access add_to_cart from the Zustand store

  const handleAddToCart = () => {
    const cartItem = {
      equipment_title: title,
      qty: 1,
      rate: 5,
      total: 5,
    };
    addToCart(cartItem);
  };

  return (
    <div className="max-w-xs mt-2 mb-4 rounded overflow-hidden shadow-lg">
      <div className="flex justify-center">
        <Image
          className="bg-fixed rounded relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={image}
          alt={name}
          width={250}
          height={250}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-black text-xl mb-2">{title}</div>
        <p className="text-black text-base text-center">{descriptions}</p>
      </div>
      <button
        className="bg-transparent hover:bg-green-500 text-clearGreen font-semibold hover:text-white mb-2 py-2 px-4 border border-green-500 hover:border-transparent rounded"
        onClick={handleAddToCart}
      >
        Add Cart
      </button>
    </div>
  );
};

export default CardLabel;
