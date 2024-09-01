
import Image from "next/image"


const CardLabel = ({image, name, title, descriptions}) => {
    return(
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
          <p className="text-black text-base text-center">
            {descriptions}
          </p>
        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mb-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Cart
        </button>
      </div>
    )
}

export default CardLabel