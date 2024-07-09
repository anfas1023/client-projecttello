"use client";
import React, { useEffect, useState } from "react";
import imageUrl from '../../../../public/images/tello-high-resolution-logo.png'
import Image from "next/image";
import { WorkspaceStore } from "@/store";
import WorkspcaeSidebar from "@/components/Workspace-sedebar/Workspace-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const Workspaces = WorkspaceStore((state) => state.workspaces);
return (
 
  <>
      <div className="flex">
        <WorkspcaeSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleSidebar={toggleSidebar}
          workspaceId={Workspaces[0].workspaceId}
        />
        <div className="w-full h-full absolute bg-workspace-gray flex flex-col">
        {isOpen ? (
            ""
          ) : (
            <button onClick={toggleSidebar} className="text-white ml-9 mb-2 sm:mb-0">
              <GiHamburgerMenu size={24} />
            </button>
          )}
          <div
            className={`ml-4 sm:${
              isOpen ? "ml-52" : "ml-5"
            } flex flex-col h-full`}
          ></div>


        </div>
      </div>
    </>
)

}
