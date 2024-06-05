"use client";
import React, { useEffect, useState } from "react";
import imageUrl from '../../../../public/images/tello-high-resolution-logo.png'
import Image from "next/image";
export default function Dashboard() {
return (
 
  <div className=" w-[87.5%] absolute bg-zinc-900 flex  ml-48 h-[100%]">
           {/* <div className="ml-16 flex justify-between">
          <h3 className="text-white mt-5 font-semibold text-xl">Assign Task</h3>
          <button className="text-white bg-blue-600 mr-8 mt-5 border border-sky-600 py-2 px-4 rounded-lg ">Create Task</button>
        </div> */}

        <div className="flex w-[40%] h-[50%] ml-[30%] mt-40  items-center justify-center">
        <Image
              height={80}
              width={80}
              className=" rounded-lg hover:scale-110"
              src={imageUrl}
              alt="logo"
            />
        </div>
  </div>
 
)

}
