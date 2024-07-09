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
import { useFolderStore } from "@/store";
import useSetTask from "@/store/SetTask";
import axios from "axios";
import {toast} from 'sonner'
  import { RiDeleteBin5Line } from "react-icons/ri";
  export function DeleteConfirmation({folderId}:{folderId:string}) {
    // const removeTask= useSetTask((state)=>state.removeTask)
    const setDelete=useFolderStore((state)=>state.deleteFolder)

    async function handleDelete(folderId: string) {
        // Implement deletion logic here
        // console.log(`Deleting folder with ID: ${folderId}`);
    
    try {
      const response=await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/folders/deleteFromTrash/${folderId}`,{
        withCredentials:true
      });
    
      if(response){
        setDelete(folderId)
        toast.success("Folder deleted",{
          position:"top-left"
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);  
        
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
       {/* <RiDeleteBin5Line size={20} />  */}
       <p  className="text-red-500 text-lg cursor-pointer">Delete</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
             Folder 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>handleDelete(folderId)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  