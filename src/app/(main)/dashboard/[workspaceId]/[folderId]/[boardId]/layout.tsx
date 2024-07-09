"use client"
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar';
import React,{useState} from 'react';
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
  // const [showAlert, setShowAlert] = useState(true);
    // console.log("params",params);
  return (
    <>
        {/* Uncomment and pass workspaceId as a prop */}
{/* <div className='flex w-[100%]'> */}
{/* <WorkspcaeSidebar workspaceId={params.workspaceId} /> */}

{children}


{/* </div> */}
 
    </>
  );
};

export default BoardLayout;
