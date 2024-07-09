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
import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { headers } from "next/headers";
import useSetTask from "@/store/SetTask";
import { toast } from "sonner";
import { FaExpandAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserIcon from "../../../public/images/user.png";
import { AddComment } from "./AddComment";
import { BiUserCircle } from "react-icons/bi";
import { AddDescription } from "./AddDescription";
import { AddAttachements } from "./AddAttachements";
import { FiLoader } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { FcHighPriority } from "react-icons/fc";
import { FaUsersLine } from "react-icons/fa6";
import { PiUserSwitch } from "react-icons/pi";
import { GrAttachment } from "react-icons/gr";
import { BiSolidSun } from "react-icons/bi";
import { WorkspaceStore } from "@/store";
import { AttachementPreview } from "./AttachementPreview";
interface Attachment {
  attachment: string;
  originalName: string;
}

interface Assigne {
  userName: string;
  email: string;
  userId: string;
  role: string;
}

export type taskType = {
  _id: string;
  randomId: string;
  status: string;
  assignee: Assigne[];
  startDate: string;
  endDate: string;
  priority: "high" | "medium" | "low";
  owner_id: string;
  taskName: string;
  attachments: Attachment[];
  description: string;
  comments: { senderId: string; comment: string; commentId: string }[];
};

const TaskDialog = ({
  task,
  workspaceId,
  folderId,
  boardId,
}: {
  task: taskType;
  workspaceId: string;
  folderId: string;
  boardId: string;
}) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const addAttachements = useSetTask((state) => state.addAttachments);
  const addTask = useSetTask((state) => state.addTask);
  const setDescription = useSetTask((state) => state.setDescription);
  const [description, setdescription] = useState("");
  const ViewTask = useSetTask((state) => state.Viewtask);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const Workspace = WorkspaceStore((state) => state.workspaces);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    string | ArrayBuffer | null
  >(null);

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

  useEffect(() => {
    if (selectedFile) {
      let reader = new FileReader();
      let file = selectedFile;
      reader.onloadend = () => {
        setPreviewFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
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

        if (response) {
          console.log("response", response.data);
          addAttachements(task._id, response.data);
        }
        setSelectedFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addDescription = async () => {
    try {
      const data = { description };
      const response = await axios.post(
        `http://localhost:5000/task/addDescription/${task._id}`,
        data,
        { withCredentials: true }
      );

      if (response) {
        setDescription(response.data.description, response.data._id);
        toast.success("Description added successfully", {
          position: "top-left",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userId = localStorage.getItem("userId");

  const renderPreview = (attachment: string, orginalName: string) => {
    if (orginalName.endsWith(".pdf")) {
      // console.log("here");

      return (
        <embed
          src={attachment}
          type="application/pdf"
          width="100px"
          height="100px"
          className="rounded-lg"
        />
      );
    } else {
      return (
        <Image
          alt="Preview"
          src={attachment}
          width={100}
          height={100}
          className=""
        />
      );
    }
  };

  console.log("ViewTaskTask", task);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">{task.taskName}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] bg-workspace-gray overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <FaExpandAlt
            onClick={() =>
              router.push(
                `/dashboard/taskDetails/${workspaceId}/${folderId}/${boardId}/${task._id}`
              )
            }
            size={18}
            className="text-slate-600"
          />
        </DialogHeader>
        <div className="flex flex-col m-20 gap-5 p-6">
          <IoDocument size={50} className="text-slate-600" />
          <div className="flex gap-5">
            <DialogTitle className="font-bold text-3xl text-white">
              {task.taskName}
            </DialogTitle>
          </div>

          <div className="flex gap-5">
            <BiSolidSun className="text-white" />
            <p className="text-slate-500">TaskId</p>
            {/* <Badge className={`${getStatusColour(task.status)}`}> */}
            <p className="text-white">{task.randomId}</p>
            {/* </Badge> */}
          </div>

          <div className="flex gap-5">
            <FaUserCheck className="text-white pt-1" />
            {Workspace.filter(
              (workspace) => workspace.workpspaceOwner.ownerId === task.owner_id
            ).map((space) => (
              <div key={space.userId} className="flex items-center gap-2">
                <p className="text-slate-500">Owner:</p>
                <p className="text-slate-500">
                  {space.workpspaceOwner.userName}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-5">
            <FiLoader className="text-white" />
            <p className="text-slate-500">Status</p>
            <Badge className={`${getStatusColour(task.status)}`}>
              <p>{task.status}</p>
            </Badge>
          </div>

          <div className="flex gap-5">
            <CgCalendarDates className="text-white" />

            <p className="text-slate-500">Start Date</p>
            <p className="text-white">{task.startDate}</p>
          </div>

          <div className="flex gap-5">
            <CgCalendarDates className="text-white" />

            <p className="text-slate-500">Due Date</p>
            <p className="text-white">{task.endDate}</p>
          </div>

          <div className="flex gap-5">
            <FcHighPriority className="text-white" />

            <p className="text-slate-500">Priority</p>
            <Badge className={`${getPriorityColorClass(task.priority)}`}>
              <p>{task.priority}</p>
            </Badge>
          </div>

          <div className="flex gap-5 ">
            <FaUsersLine className="text-white pt-1" />

            {task.assignee.map((assign, index) => (
              <div key={index} className="flex items-center gap-2">
                <p className="text-slate-500">Assignee:</p>
                <p className="text-slate-500">{assign.userName}</p>
                {/* <p className="text-slate-500">{assign.email}</p> */}
              </div>
            ))}
          </div>



          <hr className="text-slate-600 mt-12 "></hr>

          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="text-white font-bold mt-8 mb-10 text-2xl">
                Description
              </h1>
              <AddDescription
                taskDescription={task.description}
                taskId={task._id}
              />
            </div>
            <div className="w-full h-36 p-2 border border-0 text-white rounded bg-neutral-800 overflow-y-auto">
              {task.description}
            </div>
          </div>

          <hr className="text-slate-600 mt-12 "></hr>

          <div className="flex justify-between">
            <h3 className="text-white font-bold text-xl">Attachments</h3>
            <AddAttachements taskId={task._id} />
          </div>

          <div>
            <h2 className="text-white mt-10 mb-8 text-center text-xl">
              Current Attachments:
            </h2>
            <div className="space-y-2 ">
              <div className="w-full h-36 p-2 border border-0 text-white rounded bg-neutral-800 overflow-y-auto">
                <div className="">
                  {task.attachments.length ? (
                    <div className="space-y-2">
                      {task.attachments.map((attachment, index) => (
                        <div key={index}>
                          {/* <a
                            href={attachment.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-400 block"
                          >
                            {attachment.attachment}
                          </a> */}
                          {/* {renderPreview(
                            attachment.attachment,
                            attachment.originalName
                          )} */}
                          <AttachementPreview  attachement={attachment.attachment} orginalName={attachment.originalName} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white my-10 text-center">
                      No attachments
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="text-slate-600 mt-12 "></hr>

          <div className="flex justify-between mt-5 mb-4 items-center">
            <h3 className="text-white text-lg font-semibold">Comments</h3>
            <AddComment taskId={task._id} />
          </div>
          <div className="flex flex-col h-[60vh] overflow-y-auto justify-start space-y-4 p-4">
            <div className="flex flex-col space-y-5">
              {task.comments.length > 0 ? (
                task.comments.map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      task.senderId !== userId ? "justify-end" : ""
                    }`}
                  >
                    <Image
                      height={30}
                      width={30}
                      src={UserIcon}
                      alt="User Icon"
                      className="rounded-full"
                    />
                    <div className="flex flex-col bg-neutral-800 rounded-lg p-4 space-y-2 w-80">
                      <p className="text-white text-xs self-end">Just Now</p>
                      <p className="text-white text-sm">{task.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center h-36 p-2 border border-0 text-white rounded bg-neutral-800 overflow-y-auto">
                  <p className="text-white">No Comments Here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
