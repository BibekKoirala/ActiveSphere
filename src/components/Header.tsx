"use client";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosLogIn } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const session = useSession();

  return (
    <div className="flex justify-between p-5 border-b-[2px] border-color-grey">
      <Link href={session.status === "authenticated" ? "/dashboard" : "/"}>
        <img
          src="./images/Logo.png"
          alt="Logo"
          className="w-[250px] h-[75px] SM:w-[150px] SM:h-[50px]"
        />
      </Link>

      <div className="flex gap-4">
        {session.status === "authenticated" && (
          <>
            <Link
              className="bg-black p-2 px-3 text-white rounded-full flex flex-col justify-center"
              href="/create-post"
            >
              <span className="hidden sm:block  px-4">CREATE POST</span>{" "}
              <HiOutlinePencilSquare className="sm:hidden text-[20px]" />
            </Link>
            <button
              className="bg-white p-2 px-3 text-gray border-[1px] rounded-full justify-center flex flex-col"
              onClick={() => signOut({ redirectTo: "/" })}
            >
              <span className="hidden sm:block">Sign Out</span>{" "}
              <IoIosLogIn className="sm:hidden text-[20px] " />
            </button>
            <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <Link href={"/profile"}>
                <img src={session.data?.user?.image || ""} />
              </Link>
            </div>
          </>
        )}
        {session.status === "unauthenticated" && (
          <Link
            className="bg-white p-2 px-3 text-gray border-[1px] rounded-full justify-center flex flex-col"
            href={"/signin"}
          >
            <span className="hidden sm:block">Sign In</span>{" "}
            <IoIosLogIn className="sm:hidden text-[20px] " />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
