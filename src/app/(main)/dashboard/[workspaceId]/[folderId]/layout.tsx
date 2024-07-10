"use client";

import React from 'react';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}; 

type Params = {
  workspaceId: string;
  folderId: string;  // Assuming you meant folderId here instead of boardId
};

const FolderLayout: React.FC<Props> = ({ children }) => {
  const params = useParams() as Params;
  console.log("params", params); // Uncomment for debugging

  return (
    <>
      {children}
    </>
  );
};

export default FolderLayout;
