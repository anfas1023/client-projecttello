"use client"
import { useBoardStore } from '@/store';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation'
import { CiFileOn } from "react-icons/ci";
const ListOfBoard = ({ folderId, workspaceId, foldername }: { folderId: string, workspaceId: string, foldername: string }) => {
  const router=useRouter()
  const [inputOpen,setInputOpen]=useState<boolean>(false)
  const boards = useBoardStore((state) => state.board);
   

  // Filter boards by folderId
  const filteredBoards = boards.filter((board) => board.folderId === folderId);

  const handleClick=(boardId:string)=>{

    router.push(`/dashboard/${workspaceId}/${folderId}/${boardId}`);
  }

  return (
    <>
<ol>
  {filteredBoards.map((board) => (
    <li className='flex justify-center gap-2 ' key={board.id}> 
    <CiFileOn className='text-slate-500 hover:text-white' size={18} />
       <h6 onClick={()=>handleClick(board.id)} className='text-slate-500 text-sm text-center pb-2 hover:text-white'>{board.boardName}</h6>
      
    </li>
  ))}
</ol>

    </>
  );
}

export default ListOfBoard;
