"use client";

import { Room } from "./Room";
import { CollaborativeEditor } from "../../../../../../../components/TextEditor/Editor";
import WorkspcaeSidebar from "@/components/Workspace-sedebar/Workspace-sidebar";
import Image from "next/image";
import Car from "../../../../../../../../public/images/pexels-abdulwahab-alawadhi-5063630.jpg";
import publish from "../../../../../../../../public/images/document.png";
import { PublishButton } from "@/components/publish/PublishButton";
import { useState } from "react";

export default function DocsPage({ params }: any) {
  console.log("params", params);

  const { workspaceId, folderId, boardId } = params;
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <WorkspcaeSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleSidebar={toggleSidebar}
        workspaceId={workspaceId}
      />
    <div className="w-full h-full absolute bg-workspace-gray flex flex-col">
      <div className={`flex flex-col transition-all duration-300 ${isOpen ? "ml-52" : "ml-4"} overflow-y-auto`}>
        {/* Container with image and docs page */}
        <div className="w-full flex flex-col">
        <div className="flex flex-col items-start mt-4 ml-16">
      <p className="text-white">
        {workspaceId}/{folderId}/{boardId}
      </p>
      <PublishButton
        workspaceId={workspaceId}
        folderId={folderId}
        boardId={boardId}
      />
    </div>
 
          <div className="relative w-full h-60"> 
            <Image src={Car} layout="fill" objectFit="cover" alt="Workspace Image" />
          </div>
          {/* Collaborative Editor below the image */}
          <div className="flex-grow">
            <Room roomId={`workspace-${workspaceId}-folder-${folderId}-board-${boardId}`}>
              <CollaborativeEditor />
            </Room>
          </div>
        </div>
      </div>
    </div>

      {/* </div> */}
    </>
  );
}
