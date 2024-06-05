"use client"
import React from 'react'
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar';
import CardPage from '@/components/List-board/Card';
import CoverUrl from '@/components/List-board/Cover-url';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Boards= ({params}:{params:{boardId:string,workspaceId:string,folderId:string}}) => {
    console.log("params page",params);
    
  return (
 
    <>
  
   <CardPage workspaceId={params.workspaceId} boardId={params.boardId} folderId={params.folderId} />
  
 

    </>
  )
}

export default Boards
