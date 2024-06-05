import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { IoDocument } from "react-icons/io5";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { headers } from "next/headers";
import useSetTask from "@/store/SetTask";
import { toast } from "sonner";
// import "./globals.css";
type taskType = {
  _id: string;
  status: string;
  assignee: string[];
  startDate: string;
  endDate: string;
  priority: string;
  owner_id: string;
  taskName: string;
  attachments: string[];
  description:string;
};
const TaskDialog = ({ task }: { task: taskType }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const addAttachements = useSetTask((state) => state.addAttachments);
  const addTask = useSetTask((state) => state.addTask);

  const setDescription=useSetTask((state)=>state.setDescription)
  // const des=useSetTask((state)=>state.Viewtask) 

  const [description,setdescription] = useState("")

  const ViewTask = useSetTask((state) => state.Viewtask);

  // const Description=

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Handle file upload here, e.g., send it to the server or perform any other action
      console.log("Selected file:", selectedFile);
      // Reset the selected file state after handling the upload if needed
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.post(
          `http://localhost:5000/task/uploadAttachments/${task._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setSelectedFile(null);

        if (response) {
          console.log("response", response.data);
          // console.log("response.data.attachments",response.data.attachments);

          addAttachements(task._id, response.data);

          //     // addTask(response.data)
          // console.log("ViewTask",ViewTask);
        }
        setSelectedFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  };


  const addDescription=async()=>{
  try {

    const data={
      description
    }
    const response=await axios.post(`http://localhost:5000/task/addDescription/${task._id}`,data,{
      withCredentials:true
    })


    if(response){
      console.log(response.data);
      
      setDescription(response.data.description,response.data._id)

      toast.success("Description added suceefully",{
        position:"top-left"
      })
    }
  } catch (error) {
    console.log(error);
    
  }

  }

  //

  // const Description=task.

  // React.useEffect(() => {
  //   console.log("TaskList - Rendered with Viewtask:", ViewTask);
  // }, [ViewTask]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>{task.taskName}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] bg-workspace-gray overflow-y-auto  max-h-[80vh]">
        <DialogHeader>
          <DialogDescription>{task._id}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col m-20 gap-5 p-6">
          <IoDocument size={50} className="text-slate-600" />
          <div className="flex gap-5">
            <DialogTitle className="font-bold text-3xl text-slate-400">
              {task.taskName}
            </DialogTitle>
          </div>

          <div className="flex gap-5">
            <p className="text-slate-500">Status</p>
            <Badge className={`${getStatusColour(task.status)}`}>
              <p>{task.status}</p>
            </Badge>
          </div>

          <div className="flex gap-5">
            <p className="text-slate-500">Start Date</p>
            <p className="text-white">{task.startDate}</p>
          </div>

          <div className="flex gap-5">
            <p className="text-slate-500">Due Date</p>
            <p className="text-white">{task.endDate}</p>
          </div>

          <div className="flex gap-5">
            <p className="text-slate-500">Priority</p>
            <Badge className={`${getPriorityColorClass(task.priority)}`}>
              <p>{task.priority}</p>
            </Badge>
          </div>

          <div className="flex gap-5 ">
            <p className="text-slate-500">Assignee</p>
            {/* Add the assignee information here */}
          </div>

          <hr className="text-slate-600 mt-12 "></hr>

          <div>
            <h1 className="text-white mt-10 text-2xl">Description</h1>
            <textarea
              className="w-full h-32 p-2 mt-2 border rounded"
           defaultValue={task.description}
              onChange={(e)=>setdescription(e.target.value)} 
            />
            <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={addDescription} >
              Save Description
            </button>
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="assignee">Attachements:</label>
            <input
              type="file"
              name="pdfUpload"
              id="pdfUpload"
              className="border rounded p-2 text-black"
              onChange={handleFileChange}
            />
            <button className="text-white" onClick={handleUpload}>
              Add
            </button>
          </div>

          <div>
            <h2 className="text-white mt-10 text-xl">Current Attachments:</h2>
            <ul>
              {task.attachments.map((attachment, index) => (
                <li key={index} className="text-blue-400">
                  <a
                    href={attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachment}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button>  */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
