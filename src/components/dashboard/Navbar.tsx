"use client";

import React from "react";
import { Plus } from "lucide-react"

const Navbar = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-around fixed z-10 h-11 bg-neutral-800  w-screen  p-2">
    <p className="text-lg text-white font-semibold">Tello</p>
    <div className="flex items-center border border-gray-400 rounded-lg px-2 mt-2 md:mt-0">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-white placeholder-gray-300"
      />
    </div>
    <div className="flex items-center mt-2 md:mt-0">
      <p className="text-white mr-2">New</p>
      <button className="text-white mr-4">Upgrade</button>
      <hr className="border-gray-500 border-1 rotate-90 hidden md:block h-px w-7" />
    </div>
    <div className="flex items-start justify-start">
      <p className="text-white">Hello</p>
      <p className="text-white ml-4">Hello</p>
      <p className="text-white ml-4">Hello</p>
      <p className="text-white ml-4">Hello</p>
      <p className="text-white ml-4">Hello</p>
    </div>
  </div>
  
    </>
  );
};

export default Navbar;
