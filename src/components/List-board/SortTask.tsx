// "use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useSetTask from "@/store/SetTask"

export function Sort({workspaceId,folderId,boardId,status}:{workspaceId:string,folderId:string,boardId:string,status:string}) {
const sortTasksByPriority=useSetTask((state)=>state.sortTasksByPriority);
const sortByDueDate =useSetTask((state)=>state.sortByDueDate)
const viewTask=useSetTask((state)=>state.Viewtask)

    const handleSort=()=>{
        sortTasksByPriority(status)

        console.log("viewTask",viewTask);
        
    }

    const sortDueDate=()=>{
        sortByDueDate(status)
    }


  return (
    <Popover>
    <PopoverTrigger asChild>
      {/* <Button variant="outline">Open popover</Button> */}
      <p className="text-white text-center mt-2 cursor-default">Sort</p>
    </PopoverTrigger>
    <PopoverContent className="w-[140px] bg-neutral-800">
      <div className="grid gap-2">
        <div className="mb-2">
          <h4 className="font-medium text-center cursor-default text-white leading-none">Sort Task</h4>
        </div>
        <div className="grid ">
          <div className="grid items-center gap-4  rounded-lg  hover:bg-workspace-gray cursor-pointer">
            <p onClick={handleSort} className=" text-white text-center  py-2">Priority</p>
          </div>
          <div className="grid  items-center gap-4 rounded-lg hover:bg-workspace-gray cursor-pointer">
          <p onClick={sortDueDate}  className=" text-white  text-center py-2 ">Due Date</p>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
  )
}
