"use client"
import  React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CgCalendarDates } from "react-icons/cg";
import { taskType } from "./Add-Task"
import useTaskStore from "@/store/Task"


export function EndDate() {
//   const [date, setDate] = React.useState<Date>()

  const {endDate}=useTaskStore((state)=>state.task)
  const setDate=useTaskStore((state)=>state.setEndDate)

//   console.log("endDate",endDate);
  

  return (
    <Popover>
      <PopoverTrigger asChild>
<p><CgCalendarDates className="text-white text-2xl pr-1"/> </p>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={endDate}
          onSelect={(date) => setDate(date ?? new Date())}
          initialFocus
        />
        {/* <Button onClick={handleDate}>Select</Button> */}
      </PopoverContent>
      
    </Popover>
  )
}
