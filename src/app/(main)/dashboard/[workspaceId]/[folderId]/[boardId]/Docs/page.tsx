"use client";

import { Room } from "./Room";
import { CollaborativeEditor } from "../../../../../../../components/TextEditor/Editor";
import WorkspcaeSidebar from "@/components/Workspace-sedebar/Workspace-sidebar";
import Image from "next/image";
import Car from "../../../../../../../../public/images/pexels-abdulwahab-alawadhi-5063630.jpg";
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
    <div className="relative h-full w-full">
      <WorkspcaeSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleSidebar={toggleSidebar}
        workspaceId={workspaceId}
      />
      <div
        className={`w-full h-full absolute bg-workspace-gray flex flex-col ${
          isOpen ? "ml-52" : "ml-5"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex ml-16 items-center">
            <p className="text-white">
              {workspaceId}/{folderId}/{boardId}
            </p>
            <PublishButton
              workspaceId={workspaceId}
              folderId={folderId}
              boardId={boardId}
            />
          </div>
          <div className="relative flex-1">
            <Image src={Car} layout="fill" objectFit="cover" alt="" />
          </div>
          <Room
            roomId={`workspace-${workspaceId}-folder-${folderId}-board-${boardId}`}
          >
            <CollaborativeEditor />
          </Room>
        </div>
      </div>
    </div>
  );
}
