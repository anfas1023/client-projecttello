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

type DateProps={
  startDate:Date;
  setAddTask: React.Dispatch<React.SetStateAction<taskType>>
}

export function PickUpDate() {
  // const [date, setDate] = React.useState<Date>()

  const {startDate}=useTaskStore((state)=>state.task)
  const addStartDate=useTaskStore((state)=>state.setStartDate)
  // console.log("startDate",startDate);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
<p><CgCalendarDates className="text-white text-2xl pr-1  " /></p>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(date) => addStartDate(date ?? new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
