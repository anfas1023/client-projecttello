import { ChevronsLeft } from "lucide-react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import { SlDocs } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
// import { CiViewBoard } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Workspacedropdown from "./Workspace-dropdown";
import AddWorkspace from "./Add-Workspace";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <aside className="group/sidebar h-screen pt-4   bg-zinc-900 overflow-y-auto relative flex flex-col w-80  gap-6">
        <h3 className="text-white text-2xl text-center font-bold ">
          Project Tello
        </h3>

        {/* <div className="flex ">
          <hr className="border-gray-500 border-2   absolute left-5 bottom-20 hidden md:block w-60"></hr>
          <IoPersonAddOutline
            size={20}
            className="text-white absolute left-10 bottom-8"
          />
          <p className="absolute text-white left-20 bottom-7 text-xl">Invite</p>
        </div> */}

        <div className="flex item-center justify-start ml-8  gap-5">
          <BiHomeAlt className="text-white" size={20} />
         <Link href='/home'> <p className="text-white">Home</p></Link>
        </div>
        <div className="flex item-center justify-start ml-8 gap-5">
          <BsInbox className="text-white" size={20} />
          <p className="text-white">Inbox</p>
        </div>
        {/* {/* <div className="flex item-center justify-start ml-8 gap-5">
          <SlDocs />
          <p className="">Docs</p>
        </div> */}
        <div className="flex item-center justify-start ml-8 gap-5">
          <FaRegTrashAlt className="text-white" />
          <p className="text-white">Trash Managment</p>
        </div>
        <div className="flex item-center justify-start ml-8  gap-5">
          <CiSettings className="text-white" size={20} />
          <p className="text-white">Settings</p>
        </div>
        <div className="flex justify-center">
          <hr className="border-gray-500 border-2 hidden md:block w-60 " />
        </div>
        <div className="flex flex-col gap-6  justify-center ">
          <p className="text-white pl-20 text-xl">Spaces</p>
          <Workspacedropdown />
          <AddWorkspace />
          <div className="flex pl-10   gap-3">
            <IoMdAdd className="text-white" size={20} />
          </div>
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
      </aside>
    </>
  );
};

export default Sidebar;
