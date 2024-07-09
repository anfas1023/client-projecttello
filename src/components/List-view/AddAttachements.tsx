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
import Image from 'next/image'
import cloud from'../../../public/images/cloud-computing.png'
import useSetTask from "@/store/SetTask";
import axios from "axios";
import React, { useState, ChangeEvent,useRef } from "react"
import {toast} from 'sonner'
export function AddAttachements({taskId}:{taskId:string}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading,setLoading] =useState(false)
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const addAttachements = useSetTask((state) => state.addAttachments);

  const fileRef = useRef<HTMLInputElement | null>(null);


  const handleUpload = async () => {
    if (selectedFile) {
      // Handle file upload here, e.g., send it to the server or perform any other action
      console.log("Selected file:", selectedFile); 
      // Reset the selected file state after handling the upload if needed
      const formData = new FormData();
      formData.append("file", selectedFile);
      setLoading(true)
      try {
        const response = await axios.post(
          `http://localhost:5000/task/uploadAttachments/${taskId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials:true
          }
        );

        setSelectedFile(null);

        if (response) {
          console.log("response", response.data);
          // console.log("response.data.attachments",response.data.attachments);

          addAttachements(taskId,response.data);
      setLoading(false)


          //     // addTask(response.data)
          // console.log("ViewTask",ViewTask);
        }
        setSelectedFile(null);
      } catch (error) {
      setLoading(false)

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
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
      <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg ">
          Add Attachements
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat">
        <DialogHeader>
          <DialogTitle className="text-white">Add an Attachements here</DialogTitle>
          <DialogDescription className="text-white">
            Select an attachements click add 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4  py-4">
        <div className="ml-1 h-28 rounded-lg border " onClick={() => fileRef.current?.click()}>
        <Image className="ml-32 mt-5" src={cloud} alt="" height={90} width={70} />
        </div>
        <input
              type="file"
              name="pdfUpload"
              ref={fileRef}
              id="pdfUpload"
              className="border rounded p-2 text-white hidden"
              onChange={handleFileChange}
            />
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleUpload}
        >
        {loading ? "Loading.." : "Add Attachements"}
        </button> 

      </DialogContent>
    </Dialog>
  )
}
