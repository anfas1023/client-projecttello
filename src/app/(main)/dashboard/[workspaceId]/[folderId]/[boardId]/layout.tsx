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

  return (
    <>


{children}


{/* </div> */}
 
    </>
  );
};

export default BoardLayout;
