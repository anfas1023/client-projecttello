import Image from "next/image";
import React from "react";
import { CiChat1 } from "react-icons/ci";
import imageUrl from "../../../../public/images/images.png";

export default function page() {
  return (
    
    <div className=" w-full  flex items-center justify-center mx-auto bg-workspace-gray h-screen">
      <div className="flex w-6/12 h- flex-col gap-6 items-center  justify-center">
        <h1 className="text-5xl font-semibold font text-white">
          Welcome To Tello
        </h1>
        <div className="flex flex-col item-center gap-1 justify-center text-white ">
          <p className="text-white text-center ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p className="text-center">
            Lorem Ipsum has been the industrys standard dummy text ever since
            the 1500s, when an unknown printer took a galley
          </p>
          
        </div>

        {/* <p><CiChat1 className="text-white" size={50}/></p> */}
        {/* <Image src=''/> */}
        <div className="flex text-white flex-col gap-4 mt-8  item-center justify-center  ">
          <div className="flex items-center justify-center">
            <Image
              height={60}
              width={60}
              className=" hover:scale-110"
              src={imageUrl}
              alt="logo"
            />
          </div>
          <h5 className="text-2xl font-semibold text-center ">
            Project Managment Tool
          </h5>
          <p>
            Tello is Project Managment tool Where you can add task to Teammates
            and real time collabration valiable
          </p>
          <div className="flex justify-center mt-4 item-center">
            <button className="border-2 px-7 py-3 bg-blue-950 rounded-lg transition duration-700 ease-in-out hover:scale-110 hover:opacity-50">
              Start Exploring
            </button>

          </div>
        </div>
      </div>
    </div>

  );
}
