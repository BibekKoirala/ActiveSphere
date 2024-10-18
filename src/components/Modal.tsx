import React from 'react';

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
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-xl"
          >
            X
          </button>
        </div>
        <img src={post.image} alt={post.title} className="mb-4" />
        <p className="text-gray-700 mb-2">Posted by: {post.username}</p>
        <p className="text-gray-700 mb-2">Email: {post.email}</p>
        <p className="text-gray-700 mb-2">Sport: {post.sport}</p>
        <p className="text-gray-700 mb-2">Location: {post.location}</p>
        <p className="text-gray-700 mb-2">Zipcode: {post.zipcode}</p>
        <p className="text-gray-700 mb-2">Posted on: {post.date}</p>
        <p className="text-gray-700 mb-2">{post.description}</p>
      </div>
    </div>
  );
};

export default Modal;
