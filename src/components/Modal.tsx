import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

type ModalProps = {
  post: {
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
  };
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        {/* X button positioned over the image */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white-800 text-white p-1 rounded-full z-50 font-extrabold font-xl"
        >
          X
        </button>

        {/* Post Image */}
        <img
          className="w-full object-cover p-2"
          src={post.image}
          alt={post.title}
        />

        {/* Post Content */}
        <div className="px-4 py-4">
          <div className="font-extrabold text-[20px] mb-2 line-clamp-2 overflow-hidden">
            {post.title}
          </div>

          <p className="flex items-center text-orange-600 font-bold">
            <SlCalender /> 
            <span>{post.date}</span>
          </p>

          <div className="flex items-center text-blue-400 mt-2">
            <FaLocationDot />
            <p className="ml-1">{post.location}</p>
          </div>

          <p className="text-gray-700 text-base mt-2">{post.description}</p>
        </div>

        {/* Posted By Section */}
        <div className="mt-5 p-2 border-t-2">
          <div className="font-bold text-l">Posted By</div>

          <div className="flex items-center mt-2">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={post.profilepic}
              alt={post.username}
            />
            <div>
              <p className="text-gray-700 mb-1">{post.username}</p>
              <p className="text-gray-700">{post.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
