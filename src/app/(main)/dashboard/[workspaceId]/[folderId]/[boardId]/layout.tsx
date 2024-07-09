"use client"
import WorkspcaeSidebar from '@/components/Workspace-sedebar/Workspace-sidebar';
import React,{useState} from 'react';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}; 



const BoardLayout = ({ children }: Props) => { 

  return (
    <>
{children}
    </>
  );
};

export default BoardLayout;
