"use client"
import React from 'react';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}; 

type Params = {
  workspaceId: string;
  boardId: string;
};

const FolderLayout: React.FC<Props> = ({ children }) => {
  const params = useParams() as Params;
  console.log("params", params);

  return (
    <>
   
      {children}
    </>
  );
};

export default FolderLayout;
