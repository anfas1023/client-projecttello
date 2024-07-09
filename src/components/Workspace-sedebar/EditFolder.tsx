
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useFolderStore } from "@/store";
import axios from "axios";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
type Props ={
    folderId:string
}

export function EditFolder({folderId}:Props) {
    // console.log("folderId",folderId);
    const updateFolder=useFolderStore((state)=>state.updateFolder)
    const folders=useFolderStore((state)=>state.folders)
    const [folderName,setValue]=useState<string>("")
    const handleSubmit = async () => {

      const data={
        folderId,
        folderName
      }

      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/folders/editFolder`, data, {
          withCredentials: true,
        });
        console.log("response",response.data._id);  
        
    


        updateFolder({
          folderId: response.data._id,
          folderName: response.data.folderName,
          workspaceId: response.data.workspaceId,
          trash:response.data.trash
        });
       

        toast.success("Folder Name Updated", {
          position: "top-left",
        });
        

    

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
    };
    


    

    
    
  return (
    <Popover>
      <PopoverTrigger asChild>
      <p><CiEdit  className=" text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" /></p>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-center">Edit Folder</h4>
            {/* <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p> */}
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">FolderName</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
                onChange={(e)=>setValue(e.target.value)}
                
              />
            </div>

            <button onClick={handleSubmit}>Edit</button>



          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
