"use client";
import React, { useEffect, useState, useRef } from "react";
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
import { useRouter } from "next/navigation";

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
import AlertComponenet from "../notification/AlertComponenet";
import { useFolderStore } from "@/store";
import { Sort } from "./SortTask";
import { FilterTask } from "./FilterTask";
import Avatar from "../../../public/images/man.png";
import Image from "next/image";
import TaskDetails from "./../List-view/TaskDetails";
import WorkspcaeSidebar from "../Workspace-sedebar/Workspace-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
type Props = {
  workspaceId: string;
  boardId: string;
  folderId: string;
};
const CardPage = ({ workspaceId, boardId, folderId }: Props) => {
  const [changeView, setChangeView] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const folders = useFolderStore((state) => state.folders);

  const [showDocs, setShowDocs] = useState<boolean>(false);

  //  setTaskToTheUser

  const SetStatus = useSetTask((state) => state.setStatus);
  const SetTaskName = useSetTask((state) => state.setTaskName);
  const SetEndDate = useSetTask((state) => state.setEndDate);
  const SetStartDate = useSetTask((state) => state.setStartDate);
  const SetPriority = useSetTask((state) => state.setPriority);
  const viewTask = useSetTask((state) => state.Viewtask);
  const setTask = useSetTask((state) => state.setTasks);
  const addTask = useSetTask((state) => state.addTask);

  const Folders = useFolderStore((state) => state.folders);

  const Folder = Folders.find((folder) => folder.folderId === folderId);

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
    async function fetchTask(email: string | null, userId: string) {
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
          // console.log();

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

  const changeToDocs = () => {
    router.push(`/dashboard/${workspaceId}/${folderId}/${boardId}/Docs`);
    // return (
    //   // <DocsPage />
    //   <Room DocsPage={DocsPage}  />
    // )
  };

  const folder = folders.find((folder) => folder.folderId === folderId);

  const folderIsTrash = folder?.trash;

  const folderName = folder?.folderName;

  const filterTasksByNameAndStatus = useSetTask(
    (state) => state.filterTasksByNameAndStatus
  );

  const handleChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: string
  ) => {
    console.log(e.target.value);

    filterTasksByNameAndStatus(e.target.value, status);
  };

  const dragDiv = useRef<string | null>(null); // Ref for dragged item status
  const draggedOverDiv = useRef<string | null>(null);
  const handleSort = (status: string) => {
    console.log("handle sort");
    console.log("status", status);

    if (dragDiv.current && draggedOverDiv.current) {
      const taskClone = [...viewTask];

      // Find the dragged task and its index
      const draggedTaskIndex = taskClone.findIndex(
        (task) => task.status === dragDiv.current
      );
      const draggedTask = taskClone[draggedTaskIndex];

      // Find the task being dragged over and its index
      const draggedOverTaskIndex = taskClone.findIndex(
        (task) => task.status === draggedOverDiv.current
      );
      const draggedOverTask = taskClone[draggedOverTaskIndex];

      console.log("draggedTask", draggedTask);
      console.log("draggedOverTask", draggedOverTask);

      // If both tasks are found, perform the status update
      if (draggedTask && draggedOverTask) {
        // Update the status of the dragged task
        draggedTask.status = draggedOverDiv.current;

        // Remove the dragged task from its original position
        taskClone.splice(draggedTaskIndex, 1);

        // Insert the dragged task into the new position
        taskClone.splice(draggedOverTaskIndex, 0, draggedTask);

        // Update state with the modified tasks
        setTask(taskClone);
      }
    }
  };

  const handleDragStart = (status: string) => {
    console.log("handleDragStart", status);

    dragDiv.current = status;
  };

  const handleDragEnter = (status: string) => {
    console.log("handleDragEnter", status);

    draggedOverDiv.current = status;
  };

  // console.log("viewTask", viewTask);

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


   console.log("isOpen",isOpen)
  return (
    <>
      {/* <Navbar/> */}
      <WorkspcaeSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleSidebar={toggleSidebar}
        workspaceId={workspaceId}
      />
      {folderIsTrash ? (
        <div className="w-[87.5%] absolute bg-workspace-gray flex flex-col ml-48 h-full">
          <p className="text-white">please Restore Your Folder</p>
        </div>
      ) : (
        <div className="w-full h-full absolute bg-workspace-gray flex flex-col">
          <div
           className={`ml-4 ${
            isOpen ? "ml-52" : "ml-5"
          } flex flex-col h-full`}
            >
            <div className="ml-2 sm:ml-16 flex flex-wrap justify-between items-center">
              {isOpen ? (
                ""
              ) : (
                <button
                  onClick={toggleSidebar}
                  className="text-white mb-2 sm:mb-0"
                >
                  <GiHamburgerMenu size={24} />
                </button>
              )}
              <h3 className="text-white mt-5 sm:mt-0 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-xl cursor-pointer">
                Assign Task
              </h3>

              <p
                className="text-white mt-5 sm:mt-0 font-semibold text-xl sm:text-xl cursor-pointer"
                onClick={changeToDocs}
              >
                Docs
              </p>
              {changeView ? (
                <p
                  onClick={() => setChangeView(!changeView)}
                  className="text-white mt-5 sm:mt-0 font-semibold text-xl sm:text-xl cursor-pointer"
                >
                  Board View
                </p>
              ) : (
                <p
                  onClick={() => setChangeView(!changeView)}
                  className="text-white mt-5 sm:mt-0 font-semibold text-xl sm:text-xl cursor-pointer"
                >
                  List View
                </p>
              )}
              <div className="mt-5 sm:mt-0">
                <CreateTask
                  workspaceId={workspaceId}
                  folderId={folderId}
                  boardId={boardId}
                />
              </div>
            </div>

            {changeView ? (
              <TableView
                workspaceId={workspaceId}
                folderId={folderId}
                boardId={boardId}
              />
            ) : (
              <div className="flex flex-wrap overflow-auto h-full">
                <div className="ml-9 mt-10 flex flex-col gap-2 w-[270px]">
                  <div className="group relative h-14 flex w-72  border-t-2 border-blue-800 rounded-lg">
                    <h6 className="text-lg text-white pl-5 pt-4">Planning</h6>
                    <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BiDotsHorizontalRounded className="text-white text-xl" />
                      <p onClick={handleClick}>
                        <IoMdAdd className="text-white text-xl" />
                      </p>
                    </div>
                  </div>

                  <div className="h-13 w-72 flex gap-1 rounded-lg">
                    <div className="h-10 w-[160px] text-white  rounded-lg border-zinc-600">
                      <input
                        type="text"
                        placeholder="Filter Task"
                        onChange={(e) => handleChangeEvent(e, "Planning")}
                        className="h-5 px-5 py-[19px] w-[130px] rounded-lg text-white border border-zinc-600 bg-workspace-gray focus:border-transparent focus:ring-0 focus:outline-none focus:bg-neutral-800 placeholder-white"
                      />
                    </div>
                    <div className="h-10 w-[160px] border rounded-lg border-zinc-600">
                      <Sort
                        workspaceId={workspaceId}
                        folderId={folderId}
                        boardId={boardId}
                        status={"Planning"}
                      />
                    </div>
                  </div>

                  {open ? (
                    <AddTask
                      setOpen={setOpen}
                      open={open}
                      status={"Planning"}
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
                      .map((task, index) => (
                        <div
                          draggable
                          onDragStart={() => handleDragStart(task.status)}
                          onDragEnter={() => handleDragEnter("Planning")}
                          onDragEnd={() => handleSort(task.status)}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <Card
                            key={task._id}
                            className="group max-h-full mt-3 border bg-neutral-800 border-neutral-800"
                          >
                            <CardContent>
                              <div className="flex flex-col">
                                <div className="flex flex-col gap-1 pt-5 pb-3 justify-between">
                                  <h3 className="text-sm   text-start text-white font-normal">
                                    {/* {task.taskName} */}
                                    <TaskDetails
                                      task={task}
                                      workspaceId={workspaceId}
                                      folderId={folderId}
                                      boardId={boardId}
                                    />
                                  </h3>
                                  <h6 className="text-lg text-white">
                                    {folderName}
                                  </h6>
                                  {/* <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                                  {task.description ? (
                                    <p className="text-white">
                                      {task.description}
                                    </p>
                                  ) : (
                                    <p className="text-white">
                                      No description added
                                    </p>
                                  )}
                                </div>

                                <div className="flex gap-9">
                                  <div className=" rounded-lg  h-8 w-24">
                                    <p className="text-white text-base text-center">
                                      {task.endDate}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <div className="pt-1">
                                      <RiFlag2Line
                                        className={`${getPriorityColor(
                                          task.priority
                                        )}`}
                                      />
                                    </div>
                                    <p className="text-white">
                                      {task.priority}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex">
                                  <Image
                                    height={20}
                                    width={28}
                                    alt=""
                                    src={Avatar}
                                  />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between"></CardFooter>
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="ml-9 mt-10 flex flex-col gap-2 w-[270px]">
                  <div className="group relative h-14 flex w-72 border-t-2 border-yellow-400 rounded-lg">
                    <h6 className="text-lg text-white pl-10 pt-4">
                      In-Progress
                    </h6>
                    <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BiDotsHorizontalRounded className="text-white text-xl" />
                      <p onClick={handleProgress}>
                        <IoMdAdd className="text-white text-xl" />
                      </p>
                    </div>
                  </div>
                  <div className="h-10 flex gap-2 rounded-lg">
                    <div className="h-10 w-[130px]  rounded-lg border-zinc-600">
                      <input
                        type="text"
                        placeholder="Filter Task"
                        onChange={(e) => handleChangeEvent(e, "inProgress")}
                        className="h-5 px-5 py-5 w-[130px] rounded-lg text-white border border-zinc-600 bg-workspace-gray focus:border-transparent focus:ring-0 focus:outline-none hover:bg-neutral-800 placeholder-white"
                      />
                    </div>
                    <div className="h-10 w-[130px] border rounded-lg border-zinc-600">
                      <Sort
                        workspaceId={workspaceId}
                        folderId={folderId}
                        boardId={boardId}
                        status={"inProgress"}
                      />
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
                    .filter((task) => task.status === "inProgress")
                    .map((task, index) => (
                      <div
                        draggable
                        onDragStart={() => handleDragStart(task.status)}
                        onDragEnter={() => handleDragEnter("inProgress")}
                        onDragEnd={() => handleSort(task.status)}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Card
                          key={task._id}
                          className="group max-h-full mt-3 bg-neutral-800 border-neutral-800"
                        >
                          <CardContent>
                            <div className="flex flex-col">
                              <div className="flex flex-col gap-1 pt-5 pb-3 justify-between">
                                <h3 className="text-sm   text-start text-white font-normal">
                                  {/* {task.taskName} */}

                                  <TaskDetails
                                    task={task}
                                    workspaceId={workspaceId}
                                    folderId={folderId}
                                    boardId={boardId}
                                  />
                                </h3>
                                <h6 className="text-lg text-white">
                                  {folderName}-{task.randomId}
                                </h6>
                                {/* <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                                {task.description ? (
                                  <p className="text-white">
                                    {task.description}
                                  </p>
                                ) : (
                                  <p className="text-white">
                                    No description added
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-9">
                                <div className=" rounded-lg  h-8 w-24">
                                  <p className="text-white text-base text-center">
                                    {task.endDate}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <div className="pt-1">
                                    <RiFlag2Line
                                      className={`${getPriorityColor(
                                        task.priority
                                      )}`}
                                    />
                                  </div>
                                  <p className="text-white">{task.priority}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <Image
                                  height={20}
                                  width={28}
                                  alt=""
                                  src={Avatar}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            {/* <div className="flex">
                            <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex">
                            <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div> */}
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                </div>
                <div className="ml-9 mt-10 flex flex-col gap-2 w-[270px]">
                  <div className="group relative h-14 flex w-72 border-t-2 border-green-500 rounded-lg">
                    <h6 className="text-lg text-white pl-10 pt-4">Completed</h6>
                    <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BiDotsHorizontalRounded className="text-white text-xl" />
                      <p onClick={handleComplete}>
                        <IoMdAdd className="text-white text-xl" />
                      </p>
                    </div>
                  </div>
                  <div className="h-10 flex gap-2 rounded-lg">
                    <div className="h-10 w-[130px]  rounded-lg border-zinc-600">
                      <input
                        type="text"
                        placeholder="Filter Task"
                        onChange={(e) => handleChangeEvent(e, "completed")}
                        className="h-5 px-5 py-5 w-[130px] rounded-lg text-white border border-zinc-600 bg-workspace-gray focus:border-transparent focus:ring-0 focus:outline-none hover:bg-neutral-800 placeholder-white"
                      />
                    </div>
                    <div className="h-10 w-[130px] border rounded-lg border-zinc-600">
                      <Sort
                        workspaceId={workspaceId}
                        folderId={folderId}
                        boardId={boardId}
                        status={"completed"}
                      />
                    </div>
                  </div>
                  {inComplete ? (
                    <AddTask
                      setOpen={setInComplete}
                      open={inComplete}
                      status={"Completed"}
                      workspaceId={workspaceId}
                      boardId={boardId}
                      folderId={folderId}
                    />
                  ) : (
                    " "
                  )}
                  {viewTask
                    .filter((task) => task.status === "completed")
                    .map((task, index) => (
                      <div
                        draggable
                        onDragStart={() => handleDragStart(task.status)}
                        onDragEnter={() => handleDragEnter("completed")}
                        onDragEnd={() => handleSort(task.status)}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Card
                          key={task._id}
                          className="group max-h-full mt-3 bg-neutral-800 border-neutral-800"
                        >
                          <CardContent>
                            <div className="flex flex-col">
                              <div className="flex flex-col gap-1 pt-5 pb-3 justify-between">
                                <h3 className="text-sm   text-start text-white font-normal">
                                  {/* {task.taskName} */}
                                  <TaskDetails
                                    task={task}
                                    workspaceId={workspaceId}
                                    folderId={folderId}
                                    boardId={boardId}
                                  />
                                </h3>
                                <h6 className="text-lg text-white">
                                  {folderName}
                                </h6>
                                {/* <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                                {task.description ? (
                                  <p className="text-white">
                                    {task.description}
                                  </p>
                                ) : (
                                  <p className="text-white">
                                    No description added
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-9">
                                <div className=" rounded-lg  h-8 w-24">
                                  <p className="text-white text-base text-center">
                                    {task.endDate}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <div className="pt-1">
                                    <RiFlag2Line
                                      className={`${getPriorityColor(
                                        task.priority
                                      )}`}
                                    />
                                  </div>
                                  <p className="text-white">{task.priority}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <Image
                                  height={20}
                                  width={28}
                                  alt=""
                                  src={Avatar}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            {/* <div className="flex">
                            <RiFlag2Line className="text-orange-700 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CgCalendarDates className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex">
                            <FiCheck className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <BiDotsHorizontalRounded className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div> */}
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                </div>
                <div className="ml-9 mt-10 flex flex-col gap-2 w-[270px]">
                  <div className="group relative h-14 flex w-72 border-t-2 border-red-500 rounded-lg">
                    <h6 className="text-lg text-white pl-10 pt-4">BackLog</h6>
                    <div className="absolute flex right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BiDotsHorizontalRounded className="text-white text-xl" />
                      <p onClick={handleBacklog}>
                        <IoMdAdd className="text-white text-xl" />
                      </p>
                    </div>
                  </div>
                  <div className="h-10 flex gap-2 rounded-lg">
                    <div className="h-10 w-[130px]  rounded-lg border-zinc-600">
                      <input
                        type="text"
                        placeholder="Filter Task"
                        onChange={(e) => handleChangeEvent(e, "BackLog")}
                        className="h-5 px-5 py-5 w-[130px] rounded-lg text-white border border-zinc-600 bg-workspace-gray focus:border-transparent focus:ring-0 focus:outline-none hover:bg-neutral-800 placeholder-white"
                      />
                    </div>
                    <div className="h-10 w-[130px] border rounded-lg border-zinc-600">
                      <Sort
                        workspaceId={workspaceId}
                        folderId={folderId}
                        boardId={boardId}
                        status={"BackLog"}
                      />
                    </div>
                  </div>
                  {inComplete ? (
                    <AddTask
                      setOpen={setBacklog}
                      open={backlog}
                      status={"BackLog"}
                      workspaceId={workspaceId}
                      boardId={boardId}
                      folderId={folderId}
                    />
                  ) : (
                    " "
                  )}
                  {viewTask
                    .filter((task) => task.status === "BackLog")
                    .map((task) => (
                      <Card
                        key={task._id}
                        className="group max-h-full mt-3 bg-neutral-800 border-zinc-600"
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
        </div>
      )}
    </>
  );
};

export default CardPage;
