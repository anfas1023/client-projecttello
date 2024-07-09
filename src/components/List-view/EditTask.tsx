import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WorkspaceStore } from "@/store";
import useListTaskStore from "@/store/List-View";
import useSetTask from "@/store/SetTask";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { toast } from "sonner";

interface Attachment {
  attachment: string;
  originalName: string;
}

interface assigne{
  email:string;
  role:string;
  userName:string;
  userId:string
}

export type taskType = {
  _id: string;
  status: string;
  assignee: assigne[];
  startDate: string;
  endDate: string;
  priority: "high" | "medium" | "low";
  owner_id: string;
  taskName: string;
  attachments:Attachment[];
  description: string;
  comments:{senderId:string,comment:string,commentId:string}[]
};
export function EditTask({task,workspaceId,folderId,boardId}:{task:taskType,workspaceId:string,folderId:string,boardId:string}) {

  const setEndDate = useListTaskStore((state) => state.setEndDate);
  const setPriority = useListTaskStore((state) => state.setPriority);
  const setTaskName = useListTaskStore((state) => state.setTaskName);
  // const setAssignee = useListTaskStore((state) => state.setAssigne);
  const setStatus = useListTaskStore((state) => state.setStatus);
  const setStartingDate = useListTaskStore((state) => state.setStartDate);
  const edittask =useListTaskStore((state)=>state.task)


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
  const workspace = WorkspaceStore((state) => state.workspaces);

const SetTaskName=useSetTask((state)=>state.setTaskName)
const SetStatus=useSetTask((state)=>state.setStatus);
const SetPriority=useSetTask((state)=>state.setPriority)
const SetStartDate=useSetTask((state)=>state.setStartDate);
const SetEndData=useSetTask((state)=>state.setEndDate)

const updateTask=useSetTask((state)=>state.updateTask)








  const editTask=async()=>{

  console.log("here");
  
  const workspaces = workspace.find(
    (work) => work.workspaceId === workspaceId
  );
   const data={
    status : edittask.status,
    startDate: edittask.startDate,
    endDate: edittask.endDate,
    workspaceId: workspaces?.workspaceId,
    boardId: boardId,
    priority: edittask.priority,
    taskName: edittask.taskname,
    folderId: folderId,
   }
try {
  const response=await axios.put(`http://localhost:5000/task/editTask`,data,{
    withCredentials:true
  })

  if(response){
    console.log("response>>editTask",response.data);

    // SetTaskName(response.data._id,response.data.taskName)
    // SetStatus(response.data._id,response.data.status)
    // SetPriority(response.data._id,response.data)

    updateTask(response.data)
    
  }
} catch (error) {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 401) {
      toast.error("token expired logout", { position: "top-left" });
    } else {
      toast.error("Error", { position: "top-left" });
    }
  } else {
    toast.error("An unexpected error occured", { position: "top-left" });
  }
}
  //  console.log(data);
   

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <TbEdit size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Task</DialogTitle>
          <DialogDescription className="text-white">
            Make changes to your task and update It...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-white">
            <div className="flex flex-col gap-2">
              <Label htmlFor="taskName">Task Name:</Label>
              <Input
              defaultValue={task.taskName}
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
                defaultValue={task.startDate}
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
                defaultValue={task.endDate}
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
                  defaultValue={task.status}
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
                defaultValue={task.priority}
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
             <button onClick={editTask} className="bg-sky-500 px-5 py-2 text-white" type="submit">Save changes</button>
          </div>
        <DialogFooter>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
