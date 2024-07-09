import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import useSetTask from "@/store/SetTask";
import axios from "axios";
  import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
  export function DeleteTask({taskId,workspaceId,folderId,boardId}:{taskId:string,workspaceId:string,folderId:string,boardId:string}) {
    const removeTask= useSetTask((state)=>state.removeTask)
   const  handleDelete=async()=>{
    try {
      const response=await axios.delete(`http://localhost:5000/task/deleteTask/${taskId}`,{
        withCredentials:true
      })
      if(response){
        removeTask(response.data._id)
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
       <RiDeleteBin5Line size={20} /> 
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
             Task from the Board
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  