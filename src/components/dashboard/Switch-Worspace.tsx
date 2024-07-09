"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkspaceStore } from "@/store";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import AddWorkspace from "./Add-Workspace";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import InviteMembers from "../Workspace-sedebar/InviteMembers";
import { MdOutlineOpenInNew } from "react-icons/md";
import { MemberDetails } from "./WorkspaceMembers";
type Props = {
  workspacename: string | undefined;
};

const SwitchWorkspace = ({ workspacename }: Props) => {
  const router = useRouter();
  const Workspace = WorkspaceStore((state) => state.workspaces);
  const [inputOpen, setInputOpen] = useState(false);
  const [handleValue, setHandleValue] = useState("");
  const [WorkspaceId, setWorspaceId] = useState("");
  const updateWorkspace=WorkspaceStore((state)=>state.updateWorkspace)
  const deleteWorkspace=WorkspaceStore((state)=>state.deleteWorkspace)
  const handleClick = (workspaceId: string) => {
    // e.preventDefault();
    console.log(workspaceId);

    router.push(`/dashboard/${workspaceId}`);
  };

  const handleDelete = async (workspaceId: string) => {
    console.log("workspaceId", workspaceId);

    try {
      const response = await axiosInstance.delete(
        `/workspace/deleteWorkspace/${workspaceId}`,
        {
          withCredentials:true
        },
      );
      if(response){
        deleteWorkspace(response.data._id)   

        toast.success("Workspace deleted",{
          position:"top-left"
        })
      }
    } catch (error) {
      console.log(error); 
    }
  };

  const handleEdit = async  () => {
    // console.log("workspaceId", workspaceId); 
    try {

      const data={
        WorkspaceId:WorkspaceId,
        workspacename:handleValue
      }
      // console.log("data",data); 
      
      const response=await axiosInstance.put(`/workspace/editWorkpsace`,data,{
        withCredentials:true
      })   
      
      if(response) {
        setInputOpen(!inputOpen)
        // console.log("response",response.data);   
        let workspaceData;
         workspaceData={
          workspaceId:response.data._id,
          workspacename:response.data.workspacename,
          description:response.data.description,
          userId:response.data.userId,
          inviteMembers:response.data.inviteMembers,
          workpspaceOwner:response.data.response.data
        }
        // console.log("workspaceData",workspaceData); 

     
            
        
        
        updateWorkspace(workspaceData) 
        
        toast.success("Workspace name edited",{
          position:"top-left"
        })
 
        
      }
    } catch (error) {
      console.log(error);  
      
    }
  };

  const handleSetInputOpen = (workspaceId: string) => {
    setInputOpen(!inputOpen);
    setWorspaceId(workspaceId);
    // console.log("WorkspaceId", WorkspaceId); 
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-neutral-800 text-white font-normal text-xl px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
          {workspacename}
        </button>
      </DialogTrigger>
      <DialogContent className="h-screen block sm:h-[440px] overflow-scroll w-full p-6 sm:p-8 bg-chat rounded-lg shadow-lg sm:max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl text-center font-semibold mb-4">
            Workspaces
          </DialogTitle>
          <DialogDescription className="text-white text-center mb-10">
            {inputOpen
              ? "Edit Your Workpspace"
              : "Select a workspace to switch to that workspace"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  justify-center item  space-y-4 ">
          {inputOpen ? (
            <div className="flex flex-col items-center justify-center h-44 w-80 ml-28 gap-5   ">
              <input
                className="py-2 px-5 border border-slate-600"
                placeholder="Enter new Workspace Name"
                onChange={(e) => setHandleValue(e.target.value)}
              />

              <div className="flex gap-4">
                <button onClick={handleEdit} className="bg-green-500 rounded-lg px-4 py-2">
                  Save
                </button>
                <button
                  onClick={() => setInputOpen(!inputOpen)}
                  className="bg-red-500 rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            Workspace.map((workspace, index) => (
              <div className=" group flex justify-between items-center">
                <h3
                  className="text-white text-xl hover:cursor-pointer hover:text-lime-600"
                  onClick={() => handleClick(workspace.workspaceId)}
                  key={index}
                >
                  {workspace.workspacename}
                </h3>
                <div className="flex ">
                <p>
                    {" "}
<MemberDetails workspaceId={workspace.workspaceId} />
                  </p>
                  <p>
                    {" "}
                    <MdDeleteOutline
                      onClick={() => handleDelete(workspace.workspaceId)}
                      size={30}
                      className=" text-lime-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </p>
                  <p>
                    <CiEdit
                      onClick={() => handleSetInputOpen(workspace.workspaceId)}
                      size={30}
                      className=" text-lime-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8 flex justify-center item-center">
          <AddWorkspace />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchWorkspace;
