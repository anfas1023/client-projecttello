"use client";

import React, { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { IoDocument } from "react-icons/io5";
// import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { headers } from "next/headers";
import useSetTask from "@/store/SetTask";
import { toast } from "sonner";
import { FaExpandAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import Image from "next/image";
import date from "../../../../../../../../../public/images/calendar.png";
import { CgCalendarDates } from "react-icons/cg";
import { FcHighPriority } from "react-icons/fc";
import { FaUsersLine } from "react-icons/fa6";
import { PiUserSwitch } from "react-icons/pi";
import { GrAttachment } from "react-icons/gr";
import UserIcon from "../../../../../../../../../public/images/user.png";
import { MdDescription } from "react-icons/md";
import { attachToElement } from "livekit-client";
const TaskDetails = ({
  params,
}: {
  params: {
    workspaceId: string;
    folderId: string;
    boardId: string;
    taskId: string;
  };
}) => {
  const ViewTask = useSetTask((state) => state.Viewtask);
  console.log("taskDetailsParams",params);
  
  const taskDetails = ViewTask.find((task) => task._id === params.taskId);
  const setTask = useSetTask((state) => state.setTasks);

  console.log("taskDetails", ViewTask);

  useEffect(() => {
    async function fetchTask(email: string | null, userId: string) {
      // const data={
      //   workspaceId,
      //   boardId,
      //   folderId,
      //   email
      // }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/getTask/${params.workspaceId}/${params.folderId}/${params.boardId}/${email}/${userId}`,
          {
            withCredentials: true,
          }
        );

        if (response) {
          // console.log("pppp", response.data);

          // console.log("here1"); // This means the array is empty
          //  if()

          setTask(response.data);

          // SetStatus(response.data.status)
          // SetTaskName(response.data.taskName)
          // SetEndDate(response.data.endDate)
          // SetStartDate(response.data.startDate)
          // SetPriority(response.data.priority)
        }
      } catch (error) {
        console.log(error);
      }
    }
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    fetchTask(email, userId as string);
  }, [setTask,params.workspaceId,params.folderId,params.boardId]);

  const userId = localStorage.getItem("userId");

  const getPriorityColorClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500"; // Default color if priority is not recognized
    }
  };

  const getStatusColour = (status: string) => {
    switch (status) {
      case "inProgress":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      case "BackLog":
        return "bg-red-500";
      case "Planning":
        return "bg-violet-500";
      default:
        return "bg-gray-500"; // Default color if status is not recognized
    }
  };
  return (
    <div className="bg-workspace-gray w-full">
      <div className="flex flex-col m-20 gap-5 p-6">
        <div className="flex flex-col gap-5 ml-56 p-6">
          <IoDocument size={50} className="text-slate-600" />
          <div className="flex gap-5">
            <h2 className="font-bold text-3xl text-slate-400">
              {taskDetails?.taskName}
            </h2>
          </div>

          <div className="flex ml-5 gap-5">
            <FiLoader className="text-white" />
            <p className="text-slate-500">Status</p>
            <Badge
              className={`${getStatusColour(taskDetails?.status as string)}`}
            >
              <p>{taskDetails?.status}</p>
            </Badge>
          </div>

          <div className="flex ml-5 gap-5 ">
            <PiUserSwitch className="text-white" />
            <p className="text-slate-500">Owner</p>
            {/* Add the assignee information here */}
          </div>

          <div className="flex ml-5 gap-5">
            <CgCalendarDates className="text-white" />
            <p className="text-slate-500">Start Date</p>
            <p className="text-white">{taskDetails?.startDate}</p>
          </div>

          <div className="flex ml-5 gap-5">
            <CgCalendarDates className="text-white" />

            <p className="text-slate-500">Due Date</p>
            <p className="text-white">{taskDetails?.endDate}</p>
          </div>

          <div className="flex ml-5 gap-5">
            <FcHighPriority className="text-white" />
            <p className="text-slate-500">Priority</p>
            <Badge
              className={`${getPriorityColorClass(
                taskDetails?.priority as string
              )}`}
            >
              <p>{taskDetails?.priority}</p>
            </Badge>
          </div>

          <div className="flex ml-5 gap-5 ">
            <FaUsersLine className="text-white pt-1" />
            <p className="text-slate-500">Assignee</p>
            {/* Add the assignee information here */}
          </div>
        </div>

        <hr className="text-slate-600 mt-12 "></hr>

        <div className="flex flex-col justify-center item-center gap-5">
          <div>
           
            <h1 className="text-white text-center  font-bold  mt-10 text-2xl">
              Description
            </h1>
          </div>

          <div className=" h-36 w-[100%] p-2   border border-0 text-white rounded bg-neutral-800 overflow-y-auto">
            {taskDetails?.description}
          </div>
        </div>

        {/* <hr className="text-slate-600 mt-12 "></hr> */}

        <div className="flex gap-2 flex-col">
          <h3 className="text-white font-bold text-2xl text-center mb-6">
            Attachements
          </h3>  
        </div>

        <div className="w-full h-36 p-2 border  text-white rounded bg-neutral-800 overflow-y-auto">
          <div>
            {taskDetails?.attachments.length ? (
              <div className="space-y-2">
                {taskDetails.attachments.map((attachment, index) => (
                  <div key={index} className="flex justify-center items-center gap-2">
                    <GrAttachment className="text-center text-white" />
                    <a
                      key={index}
                      href={attachment.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-center text-white block"
                    >
                      {attachment.attachment}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white my-10 text-center">No attachments</p>
            )}
          </div>
        </div>
        <hr className="text-slate-600 mt-12 "></hr>
      </div>
    </div>
  );
};

export default TaskDetails;
