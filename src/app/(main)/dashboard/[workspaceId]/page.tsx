"use client"
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar';
import React from 'react'
import imageUrl from '../../../../../public/images/tello-high-resolution-logo.png'
import Image from "next/image";
const Workspace = ({params}:{params:{workspaceId:string}}) => {
  console.log("params.workspacename",params.workspaceId);
  return (
  <>
<div className='flex'>
<WorkspcaeSidebar workspaceId={params.workspaceId} />

<div className=" w-[87.5%] ml-48 absolute h-[100%] bg-zinc-900">
           {/* <div className="ml-16 flex justify-between">
          <h3 className="text-white mt-5 font-semibold text-xl">Assign Task</h3>
          <button className="text-white bg-blue-600 mr-8 mt-5 border border-sky-600 py-2 px-4 rounded-lg ">Create Task</button>
        </div> */}

        <div className="flex w-[40%] h-[50%] ml-[30%] mt-40  items-center justify-center">
        <Image
              height={80}
              width={80}
              className=" rounded-lg hover:scale-110"
              src={imageUrl}
              alt="logo"
            />
        </div>
  </div>
</div>


  </>
  )
}

export default Workspace
