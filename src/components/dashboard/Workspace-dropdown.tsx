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

  // useEffect(() => {
  //   const fetchWorkspaces = async (userId: string | null) => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/workspace/getAllWorkspace/${userId}`
  //       );

  //       if (response.data) {
  //         setWorkspaces(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching workspaces:", error);
  //     }
  //   };

  //   const userId = localStorage.getItem("userId");
  //   if (userId) {
  //     fetchWorkspaces(userId);
  //   } else {
  //     console.error("User ID not found in localStorage");
  //   }
  // }, []);

  // Fetching workspaces from the Recoil state
  const workspacesFromStore = WorkspaceStore((state) => state.workspaces);

  return (
    <>
      <div className="text-white">
        <ul>
          {/* Mapping over the workspaces */}
          {workspacesFromStore.map((workspace, index) => (
            <Accordion type="single" collapsible>
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
