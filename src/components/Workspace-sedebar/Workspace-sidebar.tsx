"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";


import { FiPlus } from "react-icons/fi";

import SwitchWorkspace from "../dashboard/Switch-Worspace";
import Folders from "./Folders";
import AddFolders from "../Workspace-sedebar/AddFolder";
import { WorkspaceStore } from "@/store";
import { useRouter } from "next/navigation";

import { NotificationBar } from "../notification/NotificationBar";
import { IoMdChatbubbles } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

import InviteMembers from "./InviteMembers";
import Profile from "../settings/Profile";

import { IoNotifications } from "react-icons/io5";
import AlertComponenet from "../notification/AlertComponenet";
import { TrashBar } from "../Trash/TrashSideBar";

function WorkspcaeSidebar({
  isOpen,
  setIsOpen,
  toggleSidebar,
  workspaceId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  workspaceId: string;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [notificationState, setNotificationState] = useState(false);

  const router = useRouter();
  const workspace = WorkspaceStore((state) => state.workspaces);
  const works = workspace.find((work) => work.workspaceId === workspaceId);
  const [notificationLength, setNotificationLength] = useState<number>(0);

  const handlePushToChat = () => {
    router.push(`/dashboard/${workspaceId}/Chat`);
  };

  return (
    <div 
      className={`p-2 ${
        isOpen ? "w-full  md:w-40  lg:w-52 " : "bg-workspace-gray"
      } h-full bg-neutral-800 z-20 pl-2 fixed top-0 left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 min-h-screen overflow-y-auto`}
    >
      <div className="flex flex-col justify-start items-center">
        <div className="flex items-center justify-between">
          <h1
            className={`text-base text-left cursor-pointer font-light text-white border-gray-100 ${
              !isOpen && "hidden"
            }`}
          >
            <SwitchWorkspace workspacename={works?.workspacename} />
          </h1>
          {isOpen ? (
            <button onClick={toggleSidebar} className="text-white">
              <GiHamburgerMenu size={24} />
            </button>
          ) : (
            ""
          )}
        </div>
        <AlertComponenet setShowAlert={setShowAlert} showAlert={showAlert} />
        <div className={`my-2 border-gray-100 w-full ${!isOpen && "hidden"}`}>
          <div className="flex mb-2 justify-start items-center gap-4 hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg">
            <Profile />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold">
              Settings
            </h3>
          </div>

          <div className="flex mb-2 justify-start items-center gap-4 hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg">
            <TrashBar workspaceId={workspaceId} />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold">
              Trash
            </h3>
          </div>

          <div
            onClick={() => router.push(`/room/121`)}
            className="flex mb-2 justify-start items-center gap-4 hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg"
          >
            <FaVideo className="text-lg text-slate-500 group-hover:text-slate-500" />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold">
              Meeting
            </h3>
          </div>

          <div
            onClick={handlePushToChat}
            className="flex mb-2 justify-start items-center gap-4 hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg"
          >
            <IoMdChatbubbles className="text-lg text-slate-500 group-hover:text-slate-500" />
            <h3 className="text-base text-slate-500 group-hover:text-slate-500 font-semibold">
              Chat
            </h3>
          </div>

          <div className="flex mb-2 justify-start items-center gap-4 hover:bg-workspace-gray p-2 rounded-md group cursor-pointer hover:shadow-lg">
            {/* <Badge className="absolute bg-neutral-800 text-sm hover:bg-workspace-gray"> */}
            {notificationLength === 0 ? " " : notificationLength}
            <IoNotifications className="text-xl text-slate-500 group-hover:text-slate-500" />
            {/* </Badge> */}
            <NotificationBar
              notificationState={notificationState}
              setNotificationState={setNotificationState}
              setShowAlert={setShowAlert}
              notificationLength={notificationLength}
              setNotificationLength={setNotificationLength}
            />
          </div>
        </div>

        <div
          className={`flex flex-col mb-2 justify-start items-center gap-4 w-full ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex mb-1 justify-between items-center gap-4 p-2 rounded-md group cursor-pointer hover:shadow-lg w-full">
            <AddFolders workspaceId={workspaceId} />
            <FiPlus className="text-xl text-white" />
          </div>

          <div className="flex flex-col w-full">
            <Folders workspaceId={workspaceId} />
          </div>
        </div>

        <div
          className={`absolute border-t-2 border-slate-400 flex gap-5 bottom-4 left-5 mt-4 ${
            !isOpen && "hidden"
          }`}
        >
          <InviteMembers workspaceId={workspaceId} />
          <p className="text-white text-xl">Invite</p>
        </div>
      </div>
    </div>
  );
}

export default WorkspcaeSidebar;
