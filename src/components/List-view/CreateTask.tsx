import React, { useState } from "react";
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
import useTaskStore from "@/store/Task";
import useListTaskStore from "@/store/List-View";
import { WorkspaceStore } from "@/store";
import { LogIn } from "lucide-react";
import AssignTaskList from "./AssignTaskList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { log } from "util";
import useSetTask from "@/store/SetTask";

type Props = {
  workspaceId: string;
  folderId: string;
  boardId: String;
};

const CreateTask = ({ workspaceId, folderId, boardId }: Props) => {
  // Task Store In Zustand

  const setStartingDate = useListTaskStore((state) => state.setStartDate);
  const setEndDate = useListTaskStore((state) => state.setEndDate);
  const setPriority = useListTaskStore((state) => state.setPriority);
  const setTaskName = useListTaskStore((state) => state.setTaskName);
  const setAssignee = useListTaskStore((state) => state.setAssigne);
  const setStatus = useListTaskStore((state) => state.setStatus);
  const setOwnerId = useListTaskStore((state) => state.setOwnerId);
  const task = useListTaskStore((state) => state.task);
  // const task = useListTaskStore((state) => state.);
  const addTask = useSetTask((state) => state.addTask);
  const setTask = useSetTask((state) => state.setTasks);
  const Viewtask = useSetTask((state) => state.Viewtask);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // WorkspaceStore In Zustand

  const workspace = WorkspaceStore((state) => state.workspaces);

  // State Update IN Zustand

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskName(e.target.value);
  const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartingDate(e.target.value);
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndDate(e.target.value);
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPriority(e.target.value);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value);

  const handleTaskUpdate = async () => {
    // console.log("task",task);
    try {
      const workspaces = workspace.find(
        (work) => work.workspaceId === workspaceId
      );

      setOwnerId(workspaces?.userId as string);

      const data = {
        status: task.status,
        assigne: task.assigne,
        startDate: task.startDate,
        endDate: task.endDate,
        ownerId: workspaces?.userId,
        workspaceId: workspaces?.workspaceId,
        boardId: boardId,
        priority: task.priority,
        taskName: task.taskname,
        folderId: folderId,
      };

      // console.log("data",data);

      const response = await axios.post(
        `http://localhost:5000/task/createTask`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        // console.log("response.data",response.data);

        setTask(Viewtask);
        addTask(response.data);
        // setTask()
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("task",task);

    // console.log("workspaces?.userId",workspaces?.userId);

    console.log("Viewtask", Viewtask);
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="text-white bg-blue-600 mr-8 mt-5 border border-sky-600 py-2 px-4 rounded-lg">
            Create Task
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px] bg-neutral-800 p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Create A Task
            </DialogTitle>
            <DialogDescription className="text-center text-white">
              Here You Can Add Task And Click On Update The Task To Update
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 text-white">
            <div className="flex flex-col gap-2">
              <Label htmlFor="taskName">Task Name:</Label>
              <Input
                type="text"
                name="taskName"
                id="taskName"
                className="border rounded p-2 text-black"
                onChange={handleTaskNameChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="startingDate">Starting Date:</Label>
                <Input
                  type="date"
                  name="startingDate"
                  id="startingDate"
                  className="border rounded p-2 text-black"
                  onChange={handleStartingDateChange}
                />
              </div>
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="border rounded p-2 text-black"
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="status">Status:</Label>
                <select
                  name="status"
                  id="status"
                  className="border rounded p-2 text-black"
                  onChange={handleStatusChange}
                >
                  <option value="">Default</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="BackLog">BackLog</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="priority">Priority:</Label>
                <select
                  name="priority"
                  id="priority"
                  className="border rounded p-2 text-black"
                  onChange={handlePriorityChange}
                >
                  <option value="">Default</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="assignee">Assignee:</Label>
              {/* <Input
                type="text"
                name="assignee"
                id="assignee"
                className="border rounded p-2 text-black"
                onChange={handleAssigneeChange}
              /> */}
              <AssignTaskList workspaceId={workspaceId} />
            </div>

            {/* <div className="flex gap-2 flex-col">
              <Label htmlFor="assignee">Attachements:</Label>
              <Input
                type="file"
                name="pdfUpload"
                id="pdfUpload"
                accept=".pdf"
                className="border rounded p-2 text-black"
              />
            </div> */}
          </div>
          <DialogFooter className="flex justify-center mt-6">
            <Button
              onClick={() => handleTaskUpdate()}
              className="text-white bg-blue-600 border border-sky-600 py-2 px-10 rounded-lg"
            >
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTask;
