"use client"
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar'
import React, { useEffect } from 'react';
import {io} from 'socket.io-client'
import { log } from 'util';

const Notification = ({params}:{params:{workspaceId:string}}) => {
  useEffect(() => {
    console.log("here");
    
    const socket = io(`http://localhost:5000`, {
      withCredentials: true,
    });

    console.log("socket",socket);
    

    // socket.on("connect", () => {
    //   console.log("Connected to the server");
    // });

    // socket.on("firstEvent", (msg) => {
    //   console.log("msg", msg);
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from the server");
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
<>
{/* <WorkspcaeSidebar workspaceId={params.workspaceId}/>   */}
</>
  )
}

export default Notification
