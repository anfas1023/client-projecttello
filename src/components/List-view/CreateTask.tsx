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
import AssignTaskList from "./AssignTaskList";
import axios from "axios";
import socket from "../../lib/Socket";
import useSetTask from "@/store/SetTask";
import {toast} from 'sonner'
type Props = {
  workspaceId: string;
  folderId: string;
  boardId: String;
};

const CreateTask = ({ workspaceId, folderId, boardId }: Props) => {
  const setStartingDate = useListTaskStore((state) => state.setStartDate);
  const setEndDate = useListTaskStore((state) => state.setEndDate);
  const setPriority = useListTaskStore((state) => state.setPriority);
  const setTaskName = useListTaskStore((state) => state.setTaskName);
  const setAssignee = useListTaskStore((state) => state.addAssigne);
  const setStatus = useListTaskStore((state) => state.setStatus);
  const setOwnerId = useListTaskStore((state) => state.setOwnerId);
  const task = useListTaskStore((state) => state.task);
  const addTask = useSetTask((state) => state.addTask);
  const setTask = useSetTask((state) => state.setTasks);
  const Viewtask = useSetTask((state) => state.Viewtask);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const workspace = WorkspaceStore((state) => state.workspaces);


  const [taskError,setTaskError]=useState(false)
  const [statusError,setstatusError]=useState(false);
  const [priorityError,setPriorityError]=useState(false);
  const [ assigneError,setAssigneError]=useState(false);
  const [descriptionError,setDescriptionError] =useState(false)

console.log("task",task);

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(!e.target.value.trim()){
      setTaskError(true)
      return;
    }
    setTaskName(e.target.value);
    setTaskError(false)
  }
   

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    if(!e.target.value.trim()){
      setPriorityError(true)
    }
    setPriority(e.target.value);
    setPriorityError(false)

  }
   
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
if(!e.target.value.trim()){
  setstatusError(true)
}
    setStatus(e.target.value);
    setstatusError(false)
  }
   

  const handleTaskUpdate = async () => {
    try {
      const workspaces = workspace.find(
        (work) => work.workspaceId === workspaceId
      );

      setOwnerId(workspaces?.userId as string);

      if(!task.taskname.trim()){
        setTaskError(true)
      }

      if(!task.startDate.trim()){
        setDateError(true);
        
      }

      if(!task.endDate.trim()){
        setDateError(true);
      }

      if(!task.status.trim()){
        setstatusError(true);
        
      }


      if(!task.priority.trim()){
        setPriorityError(true)
       
      }
      if(!description.trim()){
        setDescriptionError(true)
      }

      if(task.assigne.length<=0){
      setAssigneError(true);
      return
      }

  

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
        description: description,
      };

      console.log(data);
      

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/createTask`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        socket.emit("taskAssigned", {
          task: response.data,
          assignee: response.data.assignee,
          workspaceId: response.data.workspaceId,
          folderId: response.data.folderId,
          boardId: response.data.boardId,
          taskId: response.data._id,
        });

        setTask(Viewtask);
        addTask(response.data);
        setIsDialogOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.log(error);  
        
        if (error.response.status === 401) {
          toast.error("token expired logout", { position: "top-left" });
        } else {
          toast.error("Error", { position: "top-left" });
        }
      } else {
        toast.error("An unexpected error occured", { position: "top-left" });
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setdescription] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const [dateError, setDateError] = useState(false);

  // const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedDate = new Date(e.target.value);
  //   const today = new Date();

  //   // Remove time parts for correct date-only comparison
  //   today.setHours(0, 0, 0, 0);
  //   selectedDate.setHours(0, 0, 0, 0);

  //   console.log(today);
  //   console.log(selectedDate);
    
  //   if (selectedDate <= today) {
  //     console.log("1");
  //     setDateError(true);
  //   } else {
  //     console.log("2");
  //     setDateError(false);
  //     setStartingDate(e.target.value);
  //   }
  // };
     


  const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setStartingDate(e.target.value);
    setDateError(false)
  }



  // const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedDate = new Date(e.target.value);
  //   const today = new Date();
  //   if (selectedDate <= today) {
  //     setDateError(true);
  //     console.log("11");
     
      
  //   } else {
     
  //     console.log("22");
      
  //     setDateError(false);
  //     setEndDate(e.target.value);
  //   }
  // };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEndDate(e.target.value);
    setDateError(false)
  }

  const handleDescriptionChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setdescription(e.target.value);
    setDescriptionError(false)

  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="text-white bg-blue-600 mr-8 mt-5 border border-sky-600 py-2 px-4 rounded-lg">
            Create Task
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] bg-chat p-6 rounded-lg">
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
                className=" rounded p-2 bg-custom-zinc border-0  text-white focus:outline-none focus:ring-2 focus:ring-neutral-200"
                onChange={handleTaskNameChange}
              />
              {taskError && <p className="text-red-500">Task Name</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="startingDate">Starting Date:</Label>
                <Input
                  type="date" 
                  name="startingDate"
                  id="startingDate"
                  className="border-0 bg-custom-zinc rounded p-2 text-white custom-date-input"
                  onChange={handleStartingDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="border-0 bg-custom-zinc rounded p-2 text-white"
                  onChange={handleEndDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            {dateError && <p className="text-red-500">Provide Valid date</p>}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="status">Status:</Label>
                <select
                  name="status"
                  id="status"
                  className="border-0 rounded p-2 bg-custom-zinc text-white"
                  onChange={handleStatusChange}
                >
                  <option value="">Default</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="BackLog">BackLog</option>
                  <option value="Planning">Planning</option>
                </select>
                {statusError && <p className="text-red-500 ">Select a status</p>}
              </div>
              <div className="flex gap-2 flex-col flex-1">
                <Label htmlFor="priority">Priority:</Label>
                <select
                  name="priority"
                  id="priority"
                  className=" rounded p-2 bg-custom-zinc text-white"
                  onChange={handlePriorityChange}
                >
                  <option value="">Default</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {priorityError && <p className="text-red-500 ">Select a priority</p> }
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="assignee">Assignee:</Label>
              <AssignTaskList assigneError={assigneError} setAssigneError={setAssigneError}  workspaceId={workspaceId} />
              {assigneError && <p className="text-red-500 ">choose Assigne</p>}
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="Description">Description:</Label>
              <textarea
                onChange={handleDescriptionChange}
                className="w-full text-white bg-custom-zinc h-10 p-2 mt-2  rounded"
              />
              {descriptionError && <p className="text-red-500 ">Please add a description</p>}
            </div>
            <Button
              onClick={() => handleTaskUpdate()}
              className="text-white bg-blue-600 border border-sky-600 py-2 px-10 rounded-lg"
            >
              Update Task
            </Button>
          </div>
          <DialogFooter className="flex justify-center mt-6">

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTask;
