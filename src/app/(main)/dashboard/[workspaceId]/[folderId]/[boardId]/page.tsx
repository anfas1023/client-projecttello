"use client";

import React from "react";
import CardPage from "@/components/List-board/Card";

type Params = {
  boardId: string;
  workspaceId: string;
  folderId: string;
};

type BoardsProps = {
  params: Params;
};

const Boards: React.FC<BoardsProps> = ({ params }) => {
  console.log("params page", params);

  return (
    <CardPage
      workspaceId={params.workspaceId}
      boardId={params.boardId}
      folderId={params.folderId}
    />
  );
};

export default Boards;
