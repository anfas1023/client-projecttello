import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import AddWorkspace from "./Add-Workspace";
import { IoMdAdd } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import Workspacedropdown from "./Workspace-dropdown";
import SwitchWorkspace from "./Switch-Worspace";




function SideNavbar() {
  return (
    // <div className="group/sidebar  h-full pt-4 bg-zinc-900   flex flex-col w-80">
        <div className="p-6 w-80  h-screen bg-zinc-900 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Virtual Dashboard
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiHomeAlt className="text-2xl text-white group-hover:text-zinc-900 " />
                <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                 Home
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BsInbox className="text-2xl text-white group-hover:text-zinc-900 " />
                <h3 className="text-base text-white group-hover:text-zinc-900  font-semibold ">
                Inbox
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaRegTrashAlt className="text-2xl text-white group-hover:text-zinc-900 " />
                <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                  Trash
                </h3>
              </div>
              {/* <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Analytics
                </h3>
              </div> */}
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 bg-zinc-900 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-white group-hover:text-zinc-900" />
                {/* <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                 Workspcaes
               </h3>   */}
               {/* <SwitchWorkspace /> */}
                {/* <HamburgerMenu/> */}
              </div>
                 <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-white group-hover:text-zinc-900" />
                <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                  Settings
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <div>
            <FiPlus className="text-2xl text-white group-hover:text-white " />
            </div>
                <AddWorkspace/>
              </div>
            </div>
            {/* setting  */}
            <div className=" my-4 border-gray-100 pb-4 ">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h3 className=" text-center text-white group-hover:text-white font-semibold">
                 Spaces
                </h3>
              </div>
              {/* <div className="flex mb-2 justify-start items-center gap-4 pl-5 ">
                <FiPlus size={2} className="text-2xl text-white group-hover:text-zinc-900 " />
                {/* <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  More
                </h3> */}
                
              {/* </div> */} 
              {/* <div className="flex item-center justify-center">
                <Workspacedropdown/>
              </div> */}
            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-white group-hover:text-zinc-900 " />
                <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
  
    // </div>
  );
}

export default SideNavbar;