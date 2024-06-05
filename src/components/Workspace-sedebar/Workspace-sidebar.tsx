"use client";
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
import AddWorkspace from "../dashboard/Add-Workspace";
import { IoMdAdd } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import Workspacedropdown from "../dashboard/Workspace-dropdown";
import SwitchWorkspace from "../dashboard/Switch-Worspace";
import Folders from "./Folders";
import AddFolders from "../Workspace-sedebar/AddFolder";
import { WorkspaceStore } from "@/store";
import { useRouter } from "next/navigation";

import { AiOutlineUsergroupAdd } from "react-icons/ai";



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import InviteMembers from "./InviteMembers";
import Profile from "../settings/Profile";

import { IoNotifications } from "react-icons/io5";

function WorkspcaeSidebar({ workspaceId }: { workspaceId: string }) {
  // console.log("workspacename", workspaceId);
  const router=useRouter()
  const workspace = WorkspaceStore((state) => state.workspaces);
  const works = workspace.find((work) => work.workspaceId === workspaceId);
  // console.log("workspacename",workspacename);

  const handleInviteMembers = () => {

  };


  const handlePushToNotification=()=>{
    router.push(`/dashboard/${workspaceId}/notification`)
  }

  return (
    // <div className="group/sidebar w-40 max-h-full pt-4 bg-custom-zinc flex flex-col">
    <div className="p-2 w-30  h-full bg-neutral-800 z-20 pl-2  fixed top-0 -left-96 lg:left-0 lg:w-48 h-ful  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
      <div className="flex flex-col justify-start item-center">
        <h1 className="text-base text-left cursor-pointer font-light text-white  border-gray-100  w-full">
          <SwitchWorkspace workspacename={works?.workspacename} />
        </h1>
        <div className=" my-2  border-gray-100 ">
          {/* <div className="flex mb-2 justify-start items-center gap-4 pl-5 bg-neutral-800 hover:  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <MdOutlineIntegrationInstructions className="text-xl text-white group-hover:bg-neutral-800 " /> */}
          {/* <h3 className="text-base text-white group-hover:text-zinc-900 font-semibold ">
                 Workspcaes
               </h3>   */}
          {/* <SwitchWorkspace /> */}
          {/* <HamburgerMenu/> */}
          {/* </div>  */}
          <div className="flex mb-2 justify-start items-center gap-4  hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <Profile />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold ">
              Settings
            </h3>
          </div>


          <div className="flex  mb-2 justify-start items-center gap-4 pl-2 hover:bg-workspace-gray  rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <IoNotifications className="text-lg text-slate-500 group-hover:text-slate-500 " />
            <h3 onClick={handlePushToNotification} className="text-base text-slate-500 group-hover:text-slate-500 font-semibold ">
             Notification
            </h3>
          </div>

          <div className="flex  mb-2 justify-start items-center gap-4 pl-2 hover:bg-workspace-gray  rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <FaRegTrashAlt className="text-lg text-slate-500 group-hover:text-slate-500 " />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold ">
              Trash
            </h3>
          </div>
        </div>
        {/* setting  */}
        <div className=" my-4 border-gray-100 pb-4 ">
          <div className="flex mb-1 justify-start items-center gap-14   hover: p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            {/* <h3 className=" text-center text-white group-hover:text-white font-semibold"/> */}
            <AddFolders workspaceId={workspaceId} />
            <FiPlus className="text-xl  text-white" />
          </div>

          <div className="flex flex-col ">
            <Folders workspaceId={workspaceId} />
          </div>
        </div>
        <div className="absolute border-t-2 border-slate-400 flex gap-5 bottom-4 left-5 mt-4">
<InviteMembers workspaceId={workspaceId}/>
          <p className="text-white text-xl">Invite</p>
        </div> 
      </div> 
    </div>
  );
}

export default WorkspcaeSidebar;
