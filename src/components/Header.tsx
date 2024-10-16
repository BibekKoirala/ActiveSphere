"use client"
import React from "react";
import logo from "@/images/Logo.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosLogIn } from "react-icons/io";
import { signIn } from "@/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";


function Header() {
  // let session = useSession()
  // console.log(session)
 
  return (
    <div className="flex justify-between p-5 border-b-[2px] border-color-grey">
      <img src="./images/Logo.png" alt="Logo" className="w-[250px] h-[75px] SM:w-[150px] SM:h-[50px]"/>


      <div className="flex gap-4">
        <button className="bg-black p-2 px-3 text-white rounded-full ">
          <span className="hidden sm:block">CREATE POST</span> <HiOutlinePencilSquare className="sm:hidden text-[20px]"/>
        </button>
        <Link className="bg-white p-2 px-3 text-gray border-[1px] rounded-full " href={'/signin'}>
        <span className="hidden sm:block" >Sign In</span> <IoIosLogIn className="sm:hidden text-[20px] "/>
        </Link>

        <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-24 h-24 text-gray-400 -left-[5px]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
