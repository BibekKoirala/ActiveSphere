import React from 'react';

type CardProps = {
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

const Card: React.FC<CardProps> = ({
  title,
  username,
  sport,
  date,
  description,
  location,
  image,
  profilepic,
  zipcode,
  email,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 cursor-pointer">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={profilepic}
          alt={username}
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{username}</p>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">Location: {location}, Zip: {zipcode}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-600">Sport: {sport}</p>
        <p className="text-gray-600">Posted on: {date}</p>
      </div>
    </div>
  );
};

export default Card;
