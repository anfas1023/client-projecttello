"use client"
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar';
import React from 'react';
import { useParams } from 'next/navigation';

type Props = {
  workspaceId: string;
  children: React.ReactNode;
}; 

type Params={
  workspaceId:string;
  boardId:string
}

const BoardLayout = ({ workspaceId, children }: Props) => {
  const params :Params=useParams()
    console.log("params",params);
  return (
    <>
        {/* Uncomment and pass workspaceId as a prop */}
{/* <div className='flex w-[100%]'> */}
<WorkspcaeSidebar workspaceId={params.workspaceId} />

{children}


{/* </div> */}
 
    </>
  );
};

export default BoardLayout;
