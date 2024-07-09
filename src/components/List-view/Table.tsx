import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSetTask from "@/store/SetTask";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FiChevronRight } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

import { IoStatsChartOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { TbCalendarDue } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import TaskDetails from "./TaskDetails";
import axios from "axios";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";

interface AssigneeProfile {
  email: string;
  profilePhoto: string;
}

interface TaskAssigneeDetails {
  taskId: string;
  assigneProfiles: AssigneeProfile[];
}

const TableView = ({
  workspaceId,
  folderId,
  boardId,
}: {
  workspaceId: string;
  folderId: string;
  boardId: string;
}) => {
  const ViewTask = useSetTask((state) => state.Viewtask);
  const [arrow, setArrow] = useState(false);
  const [progressarrow, setProgressArrow] = useState(false);
  const [completeArrow, setCompleteArrow] = useState(false);

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

  const planningTasksCount = ViewTask.filter(
    (task) => task.status === "Planning"
  ).length;
  const progressTasksCount = ViewTask.filter(
    (task) => task.status === "inProgress"
  ).length;
  const CompletedTasksCount = ViewTask.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <>
      <div className="flex  justify-center   bg-workspace-gray">
        <div className=" ml-9 mt-10 w-[80%]  flex flex-col ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                <div className="flex gap-2">
                  <p onClick={() => setArrow(!arrow)}>
                    {arrow ? (
                      <RiArrowDownSLine
                        size={30}
                        className=" pt-1  text-white"
                      />
                    ) : (
                      <FiChevronRight size={30} className=" pt-1  text-white" />
                    )}{" "}
                  </p>
                  <p className="text-lg text-left text-white">Planning</p>
                  <Badge className="bg-blue-500 text-white">
                    {planningTasksCount}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-white">
                        Name
                      </TableHead>
                      <TableHead className="text-white text-center">
                        <div className="flex item-center justify-center gap-2">
                          <IoStatsChartOutline />
                          <p>Status</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <TbCalendarDue />
                          <p>Due</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <IoIosArrowDropdown />
                          <p>Priority</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          <AiOutlineUsergroupAdd />
                          <p>Assigne</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          <AiOutlineUsergroupAdd />
                          <p>Action</p>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ViewTask.filter(
                      (task, index) => task.status === "Planning"
                    ).map((task, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-white">
                          <div  className="flex gap-3">
                            {/* <HiOutlineClipboardDocumentList size={40} />  */}
                            <TaskDetails
                              task={task}
                              workspaceId={workspaceId}
                              folderId={folderId}
                              boardId={boardId}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-white flex item-center justify-center">
                          <div className="bg-blue-500 rounded-lg w-20">
                            <p className="text-center">{task.status}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white text-center">
                          {task.endDate}
                        </TableCell>
                        <TableCell className=" text-white flex justify-center ">
                          <div
                            className={`rounded-lg w-20 ${getPriorityColorClass(
                              task.priority
                            )}`}
                          >
                            <p className="text-center">{task.priority}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-white">
                          <div className="flex flex-col">
                            {task.assignee.map((assignee, index) => (
                              <div key={index}>{assignee.userName}</div>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell className="text-center text-white">
                          <TableHead className="text-right text-white">
                            <div className="flex gap-2">
                              {/* <button className="border py-3 bg-neutral-800 rounded-lg">Edit</button>
                          <button className="border py-3 bg-neutral-800 rounded-lg">Del</button> */}
                              <EditTask
                                task={task}
                                workspaceId={workspaceId}
                                folderId={folderId}
                                boardId={boardId}
                              />
                              <DeleteTask
                                taskId={task._id}
                                workspaceId={workspaceId}
                                folderId={folderId}
                                boardId={boardId}
                              />
                            </div>
                          </TableHead>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* IN PROGRESS */}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                <div className="flex gap-2">
                  <p onClick={() => setProgressArrow(!progressarrow)}>
                    {progressarrow ? (
                      <RiArrowDownSLine
                        size={30}
                        className=" pt-1  text-white"
                      />
                    ) : (
                      <FiChevronRight size={30} className=" pt-1  text-white" />
                    )}{" "}
                  </p>
                  <p className="text-lg text-left text-white">InProgress</p>

                  <Badge className="bg-yellow-500 text-white">
                    {progressTasksCount}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-white">
                        Name
                      </TableHead>
                      <TableHead className="text-white text-center">
                        <div className="flex item-center justify-center gap-2">
                          <IoStatsChartOutline />
                          <p>Status</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <TbCalendarDue />
                          <p>Due</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <IoIosArrowDropdown />
                          <p>Priority</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          <AiOutlineUsergroupAdd />
                          <p>Assigne</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          <AiOutlineUsergroupAdd />
                          <p>Action</p>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ViewTask.filter(
                      (task) => task.status === "inProgress"
                    ).map((task, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-white">
                          <TaskDetails
                            task={task}
                            workspaceId={workspaceId}
                            folderId={folderId}
                            boardId={boardId}
                          />
                        </TableCell>
                        <TableCell className="text-white text-center flex item-center justify-center">
                          <div
                            
                            className="bg-yellow-500 rounded-lg w-20"
                          >
                            <p className="text-center">{task.status}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white text-center">
                          {task.endDate}
                        </TableCell>
                        <TableCell className=" text-white flex items-center justify-center">
                          <div
                            className={`rounded-lg w-20 ${getPriorityColorClass(
                              task.priority
                            )}`}
                          >
                            <p className="text-center">{task.priority}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-white">
                          <div className="flex flex-col">
                            {task.assignee.map((assignee, index) => (
                              <div key={index}>{assignee.userName}</div>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell className="text-center text-white">
                          <div className="flex gap-2">
                            {/* <button className="border py-3 bg-neutral-800 rounded-lg">Edit</button>
                          <button className="border py-3 bg-neutral-800 rounded-lg">Del</button> */}
                            <EditTask
                              task={task}
                              workspaceId={workspaceId}
                              folderId={folderId}
                              boardId={boardId}
                            />

                            <DeleteTask
                              taskId={task._id}
                              workspaceId={workspaceId}
                              folderId={folderId}
                              boardId={boardId}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Completed */}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                <div className="flex gap-2">
                  <p onClick={() => setCompleteArrow(!completeArrow)}>
                    {completeArrow ? (
                      <RiArrowDownSLine
                        size={30}
                        className=" pt-1  text-white"
                      />
                    ) : (
                      <FiChevronRight size={30} className=" pt-1  text-white" />
                    )}{" "}
                  </p>
                  <p className="text-lg text-left text-white">Completed</p>
                  {/* <p>{CompletedTasksCount}</p>  */}
                  <Badge className="bg-green-500 text-white">
                    {CompletedTasksCount}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  {/* <TableCaption>A list of your recent invoices.</TableCaption>  */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-white">
                        Name
                      </TableHead>
                      <TableHead className="text-white text-center">
                        <div className="flex item-center justify-center gap-2">
                          <IoStatsChartOutline />
                          <p>Status</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <TbCalendarDue />
                          <p>Due</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-white">
                        <div className="flex item-center justify-center gap-2">
                          <IoIosArrowDropdown />
                          <p>Priority</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          <AiOutlineUsergroupAdd />
                          <p>Assigne</p>
                        </div>
                      </TableHead>

                      <TableHead className="text-right text-white">
                        <div className="flex item-center justify-center gap-2">
                          action
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ViewTask.filter((task) => task.status === "completed").map(
                      (task,index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-white">
                            <TaskDetails
                              task={task}
                              workspaceId={workspaceId}
                              folderId={folderId}
                              boardId={boardId}
                            />
                          </TableCell>
                          <TableCell className="text-white text-center flex justify-center">
                            <div   className="bg-green-500 rounded-lg w-20">
                              <p className="text-center">{task.status}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white text-center">
                            {task.endDate}
                          </TableCell>
                          <TableCell className=" text-white flex items-center justify-center">
                            <div
                              className={`rounded-lg w-20 ${getPriorityColorClass(
                                task.priority
                              )}`}
                            >
                              <p className="text-center">{task.priority}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-white">
                            <div className="flex gap-2">
                              {/* <button className="border py-3 bg-neutral-800 rounded-lg">Edit</button>
                          <button className="border py-3 bg-neutral-800 rounded-lg">Del</button> */}
                              <EditTask
                                task={task}
                                workspaceId={workspaceId}
                                folderId={folderId}
                                boardId={boardId}
                              />

                              <DeleteTask
                                taskId={task._id}
                                workspaceId={workspaceId}
                                folderId={folderId}
                                boardId={boardId}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* BackLog */}
        </div>
      </div>
    </>
  );
};

export default TableView;
