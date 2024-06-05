"use client"
import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { RiFlag2Line } from "react-icons/ri";
import useTaskStore from '@/store/Task'


const PriorityPopover = () => {
  const setPriority=useTaskStore((state)=>state.setPriority)
const {priority}=useTaskStore((state)=>state.task)

const handleClick = (e: React.MouseEvent<HTMLParagraphElement>, priority: string) => {
  e.preventDefault()
  setPriority(priority)
}
// console.log("priority",priority);

  return (
  <>
   <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Open popover</Button> */}
        <p><RiFlag2Line className="text-neutral-700 text-2xl pr-1 " /></p>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Set Priority</h4>
            <p className="text-sm text-muted-foreground">
              Set Your Priority to You Task
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              {/* <Label htmlFor="width">Urgent</Label> */}
              <p onClick={(e) => handleClick(e, "Urgent")}>Urgent</p>

              <p><RiFlag2Line className="text-orange-700 text-2xl pr-1 " /></p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              {/* <Label htmlFor="maxWidth">High</Label> */}
              <p onClick={(e)=>handleClick(e,"High")}>High</p>
              <p><RiFlag2Line className="text-yellow-500 text-2xl pr-1 " /></p>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              {/* <Label htmlFor="maxHeight">Low</Label> */}

              <p onClick={(e)=>handleClick(e,"Low")}>Low</p>
              <p><RiFlag2Line className="text-slate-600 text-2xl pr-1 " /></p>

            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>

  </>
  )
}

export default PriorityPopover
