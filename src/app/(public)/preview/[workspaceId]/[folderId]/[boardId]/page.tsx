"use client";
import React, { useState,useMemo } from "react";
import { EditorComponentPreview } from "../../../../../../components/publish/EditorComponentPreview";
import { RoomProvider } from "../../../../../../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { CollaborativeEditor } from "@/components/TextEditor/Editor";
// Define the shape of the workspace object
interface Workspace {
  isPublished: any;
  name: string;
  pageCount: number;
  pages: Page[];
}

// Define the shape of a page object
interface Page {
  _id: string;
  PageName: string;
}

// Define the props for the WorkspaceId component
interface WorkspaceIdProps {
  params: {
    workspaceId: string;
    folderId: string;
    boardId: string;
  };
}

const WorkspaceId: React.FC<WorkspaceIdProps> = ({ params }) => {
  const [workspace, setWorkspace] = useState<Workspace>({
    name: "",
    pageCount: 0,
    pages: [],
    isPublished: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  console.log("params", params);

  const exampleRoomId = useExampleRoomId(`workspace-${params.workspaceId}-folder-${params.folderId}-board-${params.boardId}`);

  return (
    // <div className="h-full bg-black">
    //   <div className="flex justify-between items-center py-2 px-4 sticky top-0 z-10">
    //     <div>
    //       <span className="flex items-center ml-5 text-lg font-semibold">
    //         Workspace:{" "}
    //         <span className={darkMode ? "text-white" : "text-black"}>
    //           {workspace.name}
    //         </span>
    //       </span>
    //     </div>
    //     <div className="flex items-center gap-4 mr-4">
    //       <span className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
    //         {workspace.pageCount}
    //       </span>
    //     </div>
    //     <button className="text-xl" onClick={toggleDarkMode}>
    //       {darkMode ? <FiSun /> : <FiMoon color="black" />}
    //     </button>
    //   </div>
<div className="min-h-screen bg-workspace-gray">
  <RoomProvider
    id={exampleRoomId}
    initialPresence={{
      cursor: null,
    }}
  >
    <ClientSideSuspense fallback="Loading...">
      {() => <EditorComponentPreview />}
    </ClientSideSuspense>
  </RoomProvider>
</div>


    
  );
};

export default WorkspaceId;

function useExampleRoomId(roomId: string) {
    console.log("roomId",roomId)
    const params = useSearchParams();
    const exampleId = params?.get("exampleId");
  
    const exampleRoomId = useMemo(() => {
      return exampleId ? `${roomId}-${exampleId}` : roomId;
    }, [roomId, exampleId]);
  
    return exampleRoomId;
}
