"use client";
import WorkspcaeSidebar from "@/components/Workspace-sedebar/Workspace-sidebar";
import React, { useState } from "react";
import imageUrl from "../../../../../public/images/tello-high-resolution-logo.png";
import Image from "next/image";
import videoCall from "../../../../../public/images/Animation - 1715593245274.gif";
import { GiHamburgerMenu } from "react-icons/gi";
const Workspace = ({ params }: { params: { workspaceId: string } }) => {
  console.log("params.workspacename", params.workspaceId);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex">
        <WorkspcaeSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleSidebar={toggleSidebar}
          workspaceId={params.workspaceId}
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
  );
};

export default Workspace;
