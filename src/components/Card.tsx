import React from "react";
import { BiTrash } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

type CardProps = {
  id: string;
  title: string;
  username: string;
  sport: string;
  date: string;
  description: string;
  location: string;
  image: string;
  profilepic: string;
  zipcode: string;
  email: string;
  deleteBol: boolean;
  deleteData: ((imageUrl: string, documentId: string) => Promise<void>) | null;

};

const Card: React.FC<CardProps> = ({
  id,
  title,
  date,
  description,
  location,
  image,
  deleteBol,
  deleteData
}) => {
  return (
    <div
      style={{ height: "450px" }}
      className=" max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 cursor-pointer hover:translate-y-2 transition-all duration-150 flex flex-col justify-between"
    >
      <img className="w-full h-40 object-cover" src={image} alt={title} />

      <div className="px-4 py-4 flex-grow">
        <div className="font-extrabold text-[20px] mb-2 line-clamp-2 overflow-hidden">
          {title}
        </div>

        <p className="flex items-center text-orange-600 font-bold">
          <SlCalender /> &nbsp;
          <span>{date}</span>
        </p>

        <div className="flex items-center text-blue-400 mt-2">
          <FaLocationDot />
          <p className="ml-1"> {location}</p>
        </div>

        <p className="text-gray-700 text-base mt-2 line-clamp-2 overflow-hidden">
          {description}
        </p>
      </div>
      {
        deleteBol && <div className="px-4 pb-2"> <button onClick={()=>deleteData(image, id)} className="bg-red-500 text-white px-4 py-2 rounded flex items-center w-full justify-center">
        Delete
       <BiTrash />
      </button></div>
      }
      {
        !deleteBol && <div className="px-4 pb-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center w-full justify-center">
          Read more
          <span className="ml-2">→</span>
        </button>
      </div>
      }
      
    </div>
  );
};

export default Card;
