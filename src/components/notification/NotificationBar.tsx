"use client";
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
import {useRouter} from 'next/navigation'
import React, { useEffect, useState } from "react";
import socket from "../../lib/Socket";
import useSetTask from "@/store/SetTask";

// Define the notification type
interface Notification {
  taskName: string;
  workspaceId: string;
  folderId: string;
  boardId: string;
  taskId: string;
}

type Props = {
  notificationState: boolean;
  setNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  notificationLength: number;
  setNotificationLength: React.Dispatch<React.SetStateAction<number>>;
}

export function NotificationBar({ setShowAlert, notificationLength, setNotificationLength }: Props) {
  const router=useRouter();
  const ViewTask = useSetTask((state) => state.Viewtask);
     const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleClickToTaskDetails=(workspaceId:string,folderId:string,boardId:string,taskId:string) =>{
    router.push( `/dashboard/taskDetails/${workspaceId}/${folderId}/${boardId}/${taskId}`);
  }

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");
    
    console.log("currentUserEmail", currentUserEmail);

    socket.on(`newTaskAssigned_${currentUserEmail}`, (data) => {
      console.log("New task assigned:", data);
      console.log("data.email.email",data.email.email);
      
      // if (currentUserEmail === data.email.email) {
        // console.log("data", data);
        
        setNotifications((prevNotifications) => {
          const newNotification: Notification = {
            taskName: data.taskName,
            workspaceId: data.workspaceId,
            folderId: data.folderId,
            boardId: data.boardId,
            taskId: data.taskId
          };

          if (!prevNotifications.some(notification => notification.taskId === newNotification.taskId)) {
            const updatedNotifications = [...prevNotifications, newNotification];
            setNotificationLength(updatedNotifications.length);
            return updatedNotifications;
          }

          return prevNotifications;
        });

        setShowAlert(true);
      // } 
    });

    return () => {
      socket.off("newTaskAssigned");
    };
  }, [setShowAlert, setNotificationLength]);

  console.log("notificationLength", notificationLength); 

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="left">
        <SheetTrigger asChild>
          <div className="flex">
            {/* <IoNotifications className="text-lg text-slate-500 group-hover:text-slate-500 " /> */}
            <h3 className="text-base  text-slate-500 group-hover:text-slate-500 font-semibold">
              Notification
            </h3>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white" side="left">
          <SheetHeader>
            <SheetTitle className="text-center">Notification - {notificationLength}</SheetTitle>
            <SheetDescription className="text-center">
              Notification should be listed down
            </SheetDescription>
          </SheetHeader>
          <ul className="list-disc pl-5">
            {notifications.map((notification, index) => (
              <li key={index}>
                <p className="cursor-pointer" onClick={()=>handleClickToTaskDetails(notification.workspaceId,notification.folderId,notification.boardId,notification.taskId)}><strong>Task Name:</strong> {notification.taskName}</p>
              </li>
            ))}
          </ul>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
