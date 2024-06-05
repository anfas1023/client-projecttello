"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { FiCheck } from "react-icons/fi";

import { RiFlag2Line } from "react-icons/ri";
import { CgCalendarDates } from "react-icons/cg";
import AddTask from "./Add-Task";
import { useDrag, useDrop } from "react-dnd";
import Navbar from "../dashboard/Navbar";
import axios from "axios";

import TableView from "../List-view/Table";
import CreateTask from "../List-view/CreateTask";
import useSetTask from "@/store/SetTask";
type Props = {
  workspaceId: string;
  boardId: string;
  folderId: string;
};
const CardPage = ({ workspaceId, boardId, folderId }: Props) => {
  const [changeView, setChangeView] = useState(false);
  const [open, setOpen] = useState(false);

  //  setTaskToTheUser

  const SetStatus = useSetTask((state) => state.setStatus);
  const SetTaskName = useSetTask((state) => state.setTaskName);
  const SetEndDate = useSetTask((state) => state.setEndDate);
  const SetStartDate = useSetTask((state) => state.setStartDate);
  const SetPriority = useSetTask((state) => state.setPriority);
  const viewTask = useSetTask((state) => state.Viewtask);
  const setTask = useSetTask((state) => state.setTasks);
  const addTask = useSetTask((state) => state.addTask);

  const handleClick = () => {
    // console.log("iuiu");
    setOpen(!open);
  };

  const handleProgress = () => {
    setInProgress(!inProgress);
  };

  const handleComplete = () => {
    setInComplete(!inComplete);
  };

  const handleBacklog = () => {
    setBacklog(!backlog);
  };

  useEffect(() => {
    async function fetchTask(email: string | null,userId:string) {
      // const data={
      //   workspaceId,
      //   boardId,
      //   folderId,
      //   email
      // }
      try {
        const response = await axios.get(
          `http://localhost:5000/task/getTask/${workspaceId}/${folderId}/${boardId}/${email}/${userId}`,
          {
            withCredentials: true,
          }
        );

        if (response) {
          console.log("pppp", response.data); 
      
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
    const userId=localStorage.getItem("userId");
    fetchTask(email,userId as string);
  }, []);

  const [inProgress, setInProgress] = useState(false);
  const [inComplete, setInComplete] = useState(false);
  const [backlog, setBacklog] = useState(false);

  // console.log("viewTask", viewTask);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority: string) => {
    // console.log("priority", priority);

    switch (priority) {
      case "low":
        return "text-blue-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className="w-[87.5%] absolute bg-workspace-gray flex flex-col ml-48 h-full ">
        <div className="ml-16 flex justify-between">
          <h3 className="text-white mt-5 font-semibold text-xl">Assign Task</h3>
          {changeView ? (
            <p
              onClick={() => setChangeView(!changeView)}
              className="text-white mt-5 font-semibold text-xl" 
            >
              Board View 
            </p>
          ) : (
            <p
              onClick={() => setChangeView(!changeView)}
              className="text-white mt-5 font-semibold text-xl"
            >
              List View
            </p>
          )}
          {/* <button className="text-white bg-blue-600 mr-8 mt-5 border border-sky-600 py-2 px-4 rounded-lg ">Create Task</button>  */}
          <CreateTask
            workspaceId={workspaceId}
            folderId={folderId}
            boardId={boardId}
          />
        </div>
        {changeView ? (
          <TableView />
        ) : (
          <div className="flex">
            <div className="ml-9 mt-10 flex flex-col gap-2">
              <div className="group  w-[270px] relative h-14 flex  border-t-2 border-blue-800 rounded-lg">
                <h6 className="text-lg text-white pl-10 pt-4">Planning</h6>
                <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiDotsHorizontalRounded className="text-white text-xl" />
                  <p onClick={handleClick}>
                    <IoMdAdd className="text-white text-xl" />
                  </p>
                  {/* <AddTask/> */}
                </div>
              </div>
              <div className="h-10 w-[270px] flex gap-2 rounded-lg">
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Filter</p>
                </div>
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Sort</p>
                </div>
              </div>
              {open ? (
                <AddTask
                  setOpen={setOpen}
                  open={open}
                  status={"planning"}
                  workspaceId={workspaceId}
                  boardId={boardId}
                  folderId={folderId}
                />
              ) : (
                " "
              )}

              <div>
                {viewTask 
                  .filter((task) => task.status === "Planning")
                  .map((task) => (
                    <Card
                      key={task._id}
                      className="group w-[270px] max-h-full mt-3 bg-neutral-800 border-zinc-600"
                    >
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle className="text-sm pt-0 text-start text-white font-normal">
                            {task.taskName}
                          </CardTitle>
                          <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Add any task-specific content here */}
                        <div className="flex gap-2">
                          <RiFlag2Line
                            className={getPriorityColor(task.priority)}
                          />
                          <p className="text-white text-sm">
                            {formatDate(task.startDate)} -
                          </p>
                          <p className="text-white text-sm">
                            {formatDate(task.endDate)}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex">
                          <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex">
                          <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
            <div className="ml-9 mt-10 flex flex-col gap-2">
              <div className="group  w-[270px] relative h-14 flex  border-t-2 border-yellow-400 rounded-lg">
                <h6 className="text-lg text-white pl-10 pt-4">In-Progress</h6>
                <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiDotsHorizontalRounded className="text-white text-xl" />
                  <p onClick={handleProgress}>
                    <IoMdAdd className="text-white text-xl" />
                  </p>
                  {/* <AddTask/> */}
                </div>
              </div>

              <div className="h-10 w-[270px] flex gap-2 rounded-lg">
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Filter</p>
                </div>
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Sort</p>
                </div>
              </div>
              {inProgress ? (
                <AddTask
                  setOpen={setInProgress}
                  open={inProgress}
                  status={"inProgress"}
                  workspaceId={workspaceId}
                  boardId={boardId}
                  folderId={folderId}
                />
              ) : (
                " "
              )}
              {viewTask
                .filter((tasks) => tasks.status === "inProgress")
                .map((task) => (
                  <Card
                    key={task._id}
                    className="group w-[270px] max-h-full mt-3 bg-neutral-800 border-zinc-600"
                  >
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-sm pt-0 text-start text-white font-normal">
                          {/* folder Name - Board Name */}
                          {task.taskName}
                        </CardTitle>
                        <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add any task-specific content here */}
                      <div className="flex gap-2">
                        <RiFlag2Line
                          className={getPriorityColor(task.priority)}
                        />
                        <p className="text-white text-sm">
                          {formatDate(task.startDate)} -
                        </p>
                        <p className="text-white text-sm">
                          {formatDate(task.endDate)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex">
                        <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex">
                        <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            <div className="ml-9 mt-10 flex flex-col gap-2">
              <div className="group  w-[270px] relative h-14 flex  border-t-2 border-green-500 rounded-lg">
                <h6 className="text-lg text-white pl-10 pt-4">Completed</h6>
                <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiDotsHorizontalRounded className="text-white text-xl" />
                  <p onClick={handleComplete}>
                    <IoMdAdd className="text-white text-xl" />
                  </p>
                  {/* <AddTask/> */}
                </div>
              </div>
              <div className="h-10 w-[270px] flex gap-2 rounded-lg">
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Filter</p>
                </div>
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Sort</p>
                </div>
              </div>
              {inComplete ? (
                <AddTask
                  setOpen={setInComplete}
                  open={inComplete}
                  status={"completed"}
                  workspaceId={workspaceId}
                  boardId={boardId}
                  folderId={folderId}
                />
              ) : (
                " "
              )}
              {viewTask
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <Card
                    key={task._id}
                    className="group w-[270px] max-h-full mt-3 bg-neutral-800 border-zinc-600"
                  >
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-sm pt-0 text-start text-white font-normal">
                          {task.taskName}
                        </CardTitle>
                        <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add any task-specific content here */}
                      <div className="flex gap-2">
                        <RiFlag2Line
                          className={getPriorityColor(task.priority)}
                        />
                        <p className="text-white text-sm">
                          {formatDate(task.startDate)} -
                        </p>
                        <p className="text-white text-sm">
                          {formatDate(task.endDate)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex">
                        <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex">
                        <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            <div className="ml-9 mt-10 flex flex-col gap-2">
              <div className="group  w-[270px] relative h-14 flex  border-t-2 border-red-500 rounded-lg">
                <h6 className="text-lg text-white pl-10 pt-4">BackLog</h6>
                <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiDotsHorizontalRounded className="text-white text-xl" />
                  <p onClick={handleBacklog}>
                    <IoMdAdd className="text-white text-xl" />
                  </p>
                  {/* <AddTask/> */}
                </div>
              </div>
              <div className="h-10 w-[270px] flex gap-2 rounded-lg">
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Filter</p>
                </div>
                <div className="h-10 w-[130px] border-2 rounded-lg border-zinc-600 ">
                  <p className="text-white text-center mt-2">Sort</p>
                </div>
              </div>
              {backlog ? (
                <AddTask
                  setOpen={setBacklog}
                  open={backlog}
                  status={"backlog"}
                  workspaceId={workspaceId}
                  boardId={boardId}
                  folderId={folderId}
                />
              ) : (
                " "
              )}
              {viewTask
                .filter((task) => task.status === "backlog")
                .map((task) => (
                  <Card
                    key={task._id}
                    className="group w-[270px] max-h-full mt-3 bg-neutral-800 border-zinc-600"
                  >
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-sm pt-0 text-start text-white font-normal">
                          folder Name - Board Name
                        </CardTitle>
                        <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add any task-specific content here */}
                      <div className="flex gap-2">
                        <RiFlag2Line
                          className={getPriorityColor(task.priority)}
                        />
                        <p className="text-white text-sm">
                          {formatDate(task.startDate)} -
                        </p>
                        <p className="text-white text-sm">
                          {formatDate(task.endDate)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex">
                        <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex">
                        <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardPage;