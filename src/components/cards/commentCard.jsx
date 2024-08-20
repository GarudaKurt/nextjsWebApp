import Image from "next/image";

const CardComments = ({ image, feedback, name }) => {
  return (
    <>
      <div className="max-w-xs p-2 w-full xs:max-w-full xs:flex bg-white rounded mt-8 mb-4 shadow-xl">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <p className="text-gray-500 text-left p-2 text-base">{feedback}</p>
        </div>
        <div className="flex items-center">
          <Image
            className="w-10 h-10 rounded-full mb-2 shadow-lg"
            src={image}
            alt={`Avatar of ${name}`}
            width={40}
            height={40}
          />
          <div className="flex items-center text-s ml-3">
            <p className="text-gray-900 leading-none">- {name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComments;
