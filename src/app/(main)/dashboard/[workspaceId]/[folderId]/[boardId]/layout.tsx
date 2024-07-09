"use client";

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BoardLayout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default BoardLayout;
