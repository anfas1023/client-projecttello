"use client";
import { WorkspaceStore } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Workspacedropdown = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const workspacesFromStore = WorkspaceStore((state) => state.workspaces);

  return (
    <>
      <div className="text-white">
        <ul>
          {/* Mapping over the workspaces */}
          {workspacesFromStore.map((workspace, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{workspace.workspacename}</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Workspacedropdown;
