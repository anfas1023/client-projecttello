"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgCalendarDates } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import PriorityPopover from "./Priority-Popover";
import { PickUpDate } from "./PickUpDate";
import { AssignTask } from "./Assign-task";
import { EndDate } from "./EndDate";
import useTaskStore from "@/store/Task";
import { Status } from "./Set-Staus";
import { WorkspaceStore } from "@/store";
import axios from "axios";
import { toast } from "sonner";


type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  status: string;
  workspaceId:string;
boardId:string;
folderId:string;
};

export type taskType = {
  status: string;
  assigne: string[];
  startDate: Date;
  endDate: Date;
  priority: string;
  owner_id: string;
  taskname: string;
};

const AddTask = ({ setOpen, open, status,workspaceId,boardId,folderId }: Props) => {
  // const [close,setClose]=useState(false)
  // const [addTask,setAddTask] =useState<taskType>({
  //   status:'',
  //   assigne:[],
  //   startDate: new Date(), // Default to current date
  //   endDate: new Date(),
  //   priority:'',
  //   owner_id:'',
  //   taskname:'',
  // });
  const task = useTaskStore((state) => state.task);
  const setTaskname = useTaskStore((state) => state.setTaskName);

  // console.log("task", task);

  const Status = useTaskStore((state) => state.task.status);
  const setstatus = useTaskStore((state) => state.setStatus);
 const workspace=WorkspaceStore((state)=>state.workspaces)

  const handleState=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTaskname(e.target.value)
    setstatus(status);
  }


  const handleAddTask=async()=>{
    try {
      const workspaceData=workspace.find((workspace)=>workspace.workspaceId===workspaceId)
      // console.log("ownerId",workspaceData);
      // console.log("task", task);
      const data={
        status:task.status,
        assigne:task.assigne,
        startDate:task.startDate,
        endDate:task.endDate,
        ownerId:workspaceData?.userId,
        workspaceId:workspaceData?.workspaceId,
        boardId:boardId,
        priority:task.priority,
        taskName:task.taskname,
        folderId:folderId
    
      }


      const response=await axios.post(`http://localhost:5000/task/createTask`,data,{
        withCredentials:true
      })

      if(response){
        console.log(response.data);

        toast.success("task has been added", {
          position: "top-left",
        });
      }
      // const ownerId=localStorage.getItem("userId")
    } catch (error) {
      console.log("error",error)
    }
  }
  return (
    <>
      <Card className="group w-[280px] max-h-full bg-zinc-800 border-zinc-600">
        <div className="mt-6 ">
          <CardContent className="flex justify-between">
            <div className="mt-2">
              <RxCross2
                onClick={() => setOpen(!open)}
                className="text-white text-sm cursor-pointer"
              />
            </div>
            <input
              placeholder="Task Name Or Type"
              onChange={(e) =>handleState(e)}
              className=" w-40  h-7 px-4 py-2 text-white   rounded-lg  bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-1">
              {/* <AiOutlineUsergroupAdd className="text-white text-xl" /> */}
              <AssignTask />
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex justify-between ">
          <div className="flex">
            {/* <CgCalendarDates className="text-white text-2xl pr-1  " />
        
            <CgCalendarDates className="text-white text-2xl pr-1  " /> */}
            {/* <RiFlag2Line className="text-orange-700 text-2xl pr-1 " /> */}
            <PickUpDate />
            <EndDate />
            <PriorityPopover />
            {/* <Status/> */}
          </div>

          <div className="flex">
            <button onClick={handleAddTask} className="text-white px-3 py-1 border rounded-lg border-purple-500 bg-purple-500 text-sm transition-opacity duration-200 hover:opacity-90">
              Save
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddTask;
