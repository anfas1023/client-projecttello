import React, { useState } from "react";
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
import {toast} from 'sonner'
import { Label } from "@/components/ui/label"
import axios from "axios";

import useSetTask from "@/store/SetTask";
export function AddComment({taskId}:{taskId:string}) {
const [comment,setComment] =useState<string>();
const addComment=useSetTask((state)=>state.addComment);
const viewTask=useSetTask((state)=>state.Viewtask)
  const handleClick=async()=>{
    const senderId=localStorage.getItem("userId");
    const data={
      comment,
      senderId,
      taskId,
    }
    try {
      const response=await axios.post(`http://localhost:5000/task/addComment`,data,{
        withCredentials:true
      })

      if(response){
        console.log("response.data",response.data);
        addComment(response.data.comments,taskId)
        console.log(viewTask);
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
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg">
                New
              </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat ">
        <DialogHeader>
          <DialogTitle className="text-white">New Comment</DialogTitle>
          <DialogDescription className="text-white">
            You can add comment click add comment
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="comment" className="text-left">
              Comment
            </Label>
            <textarea 
              id="comment"
              placeholder="Type your comment here..."
              className="p-2 text-white bg-custom-zinc border rounded-md w-full"
              onChange={(e)=>setComment(e.target.value)}
            />  
              <Button onClick={handleClick} type="submit" className="bg-sky-500 text-white">Add Comment</Button>
          </div>
        
        </div>
      </DialogContent>
    </Dialog>
  )
}
