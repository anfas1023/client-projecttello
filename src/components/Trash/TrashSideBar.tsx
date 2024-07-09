import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFolderStore } from "@/store";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

import { MdOutlineRestorePage } from "react-icons/md";
import { toast } from "sonner";

import { MdDelete } from "react-icons/md";
import { DeleteConfirmation } from "./DeleteConfirmation";

export function TrashBar({ workspaceId }: { workspaceId: string }) {
  const folders = useFolderStore((state) => state.folders);
  const setTrash=useFolderStore((state)=>state.setTrash);
  const setDelete=useFolderStore((state)=>state.deleteFolder)

 async function handleDelete(folderId: string) {
    // Implement deletion logic here
    // console.log(`Deleting folder with ID: ${folderId}`);

try {
  const response=await axios.delete(`http://localhost:5000/folders/deleteFromTrash/${folderId}`,{
    withCredentials: true,
  });   

  if(response){
    setDelete(folderId)
    toast.success("Folder deleted",{
      position:"top-left"
    })
  }
} catch (error) {
  console.log(error);

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

  }
  
 async function handleRestore(folderId: string) {
    // Implement restoration logic here
    // console.log(`Restoring folder with ID: ${folderId}`);

    try {
      const response=await axios.put(`http://localhost:5000/folders/restoreTrash/${folderId}`,{},{
        withCredentials: true,
      });

      if(response){

        // console.log(response.data);
        
        setTrash(folderId,false);
        toast.success("Folder restored",{
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
    <Sheet>
      <SheetTrigger asChild>
        <FaRegTrashAlt className="text-lg text-slate-500 group-hover:text-slate-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center font-semibold text-white">
            Trash Management
          </SheetTitle>
        </SheetHeader>

        {folders
          .filter((folder) => folder.workspaceId === workspaceId)
          .filter((folder) => folder.trash !== false)
          .map((folder, index) => (
            <div
              className="flex justify-evenly mt-5 ml-8 text-white mb-2 gap-7  bg-workspace-gray"
              key={index}
            >
              <div className="flex gap-1">
                <span className="pt-1">
                  <FaFolder />
                </span>

                <p className="font-semibold">{folder.folderName}</p>
              </div>
              {/* Display folder name or ID */}
              <div className="flex cursor-pointer">
                <span className="pt-1">
                  <MdDelete className="text-red-500 text-lg" />
                </span>
                {/* <p
                  className="text-red-500 text-lg cursor-pointer"
                  onClick={() => handleDelete(folder.folderId)}
                >
                  Delete
                </p> */}
                <DeleteConfirmation folderId={folder.folderId} />
              </div>
              <div className="flex cursor-pointer">
                <span className="pt-1">
                  <MdOutlineRestorePage className="text-green-500 text-xl" />
                </span>
                <p
                  className="text-green-500 text-xl"
                  onClick={() => handleRestore(folder.folderId)}
                >
                  Restore
                </p>
              </div>
            </div>
          ))}

        <SheetFooter>
          {/* Uncomment and adjust as needed */}
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
          <SheetDescription className="text-red text-center">
            Once You Deleted You cannot get that item
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


