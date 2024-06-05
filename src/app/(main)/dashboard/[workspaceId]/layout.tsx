"use client";
import { WorkspaceStore, useBoardStore, useFolderStore } from "@/store";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
// import { Folder } from "@/store";

type Folder = {
  _id: string;
  folderName: string;
  workspaceId: string;
};

type Board = {
  boardName: string;
  folderId: string;
  workspaceId: string;
  _id: string;
};

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  // const Workspace = WorkspaceStore((state) => state.workspaces);
  const addFolders = useFolderStore((state) => state.addFolder);
  const addBoard = useBoardStore((state) => state.addBoard);
  const board=useBoardStore((state)=>state.board)
  const params = useParams();
  useEffect(() => {
    async function fetchAllFolders() {
      try {
        const response = await axios.get(
          `http://localhost:5000/folders/getAllFolders/${params.workspaceId}`
        );
        if (response) {
          // console.log("response", response.data);
          response.data.forEach((folder: Folder) => {
            addFolders({
              workspaceId: folder.workspaceId,
              folderName: folder.folderName,
              folderId: folder._id,
            });
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchAllFolders();

    // console.log("params", params.workspaceId);
  }, []);

  // console.log("folder", folder);
  // console.log("childrens",childrens);
  
  // console.log("board",board);
  

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await axios.get(
          `http://localhost:5000/board/getAllBoards`
        );

        if (response) {
          // console.log("response.data", response.data);

          response.data.forEach((board: Board) => {
            addBoard({
              boardName: board.boardName,
              folderId: board.folderId,
              workspaceId: board.workspaceId,
              id:board._id,
              togglVisibilit:false
            });
          });
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchBoards();
  });

  return <>{children}</>;
};

export default WorkspaceLayout;
