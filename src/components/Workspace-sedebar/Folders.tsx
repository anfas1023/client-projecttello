"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiDotsHorizontal } from "react-icons/hi";
import { PlusIcon } from "lucide-react";
import { useBoardStore, useFolderStore } from "@/store";
import ListOfBoard from "./ListOfBoard";
import axios from "axios";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { IoIosArrowForward } from "react-icons/io";
import { LuFolder } from "react-icons/lu";
import { EditFolder } from "./EditFolder";
export default function Folders({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const folders = useFolderStore((state) => state.folders);
  const deleteFolder=useFolderStore((state)=>state.deleteFolder)
  const addBoard=useBoardStore((state)=>state.addBoard)

  // Function to toggle accordion
  // const toggleAccordion = () => {
  //   setIsOpen(!isOpen);
  // };

  const addBoards = async (
    folderId: string,
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const data = {
        boardName: "untitiled",
        folderId: folderId,
        workspaceId: workspaceId,
      };
      const response = await axios.post(
        `http://localhost:5000/board/createBoard`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("Board Created Sucessfull", {
          position: "top-left",
        });

        console.log("responsesss",response.data);

        addBoard({
          boardName:response.data.
          boardName,
          folderId:response.data.folderId,
          workspaceId:response.data.workspaceId,
          id:response.data._id,
          togglVisibilit:false
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleDeleteFolder=async(folderId:string)=>{
   try {
    const response=await axios.delete(`http://localhost:5000/folders/deleteFolder/${folderId}`)

    if(response){

      // console.log("response",response.data);    

      deleteFolder(folderId);
      
    }


   } catch (error) {
    
   }
  }

  return (
    <>
      {folders
  .filter(folder => folder.workspaceId === workspaceId)
  .map((folder, index) => (
    <Accordion key={index} type="single" collapsible>
      <AccordionItem value={`item-${index}`}>
        <div className="group flex items-center justify-around hover:bg-workspace-gray ">
          <div className="flex items-center ">
            <AccordionTrigger className="text-slate-500 flex gap-3   hover:no-underline">
              <IoIosArrowForward size={15} className="text-slate-500  " />
              <LuFolder size={15} className="text-slate-500 " />
              {folder.folderName}
            </AccordionTrigger>
          </div>
          <PlusIcon
            onClick={(event) => addBoards(folder.folderId, event)}
            className="text-slate-500"
            size={15}
          />
          <MdDeleteOutline onClick={() => handleDeleteFolder(folder.folderId)} className=" text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <EditFolder folderId={folder.folderId} />
        </div>
        <AccordionContent className="text-right">
          <ListOfBoard
            folderId={folder.folderId}
            workspaceId={folder.workspaceId}
            foldername={folder.folderName}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ))}

    </>
  );
}
