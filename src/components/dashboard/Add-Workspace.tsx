"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { WorkspaceStore } from "@/store";
import { FiPlus } from "react-icons/fi";
import axiosInstance from "../../lib/axios";

type Space = {
  workspacename: string;
  description: string;
};

export type WorkspaceType = {
  workspacename: string;
  userId: string;
  description: string;
};
const AddWorkspace = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workspace, setWorkspace] = useState<Space>({
    workspacename: "",
    description: "",
  });
  const addWorkspace = WorkspaceStore((state) => state.addWorkspace);
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const data = {
      workspacename: workspace.workspacename,
      description: workspace.description,
      userId: userId,
      workspaceOwner:userId
    };

    console.log("data", workspace);
    try {
      const response = await axiosInstance.post(
        `/workspace/createWorkspace`,
        data,
        {withCredentials:true}
      );

      if (response.data) {
        // toast.success("Workspace Created Sucessfull", {
        //   position: "top-left",
        // });
        console.log("datat", response.data);
        // onUpdate(response.data);

        // response.data.forEach((workspace:WorkspaceType) => {
        //   addWorkspace({
        //     workspacename: workspace.workspacename,
        //     userId: workspace.userId,
        //     description: workspace.description,
        //   });
        // });

        addWorkspace({
          workspacename: response.data.workspacename,
          userId: response.data.userId,
          description: response.data.description,
          workspaceId:response.data._id
        });
        setDialogOpen(false);
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form>
        <Dialog open={dialogOpen} >
          <DialogTrigger asChild>
          {/* <FiPlus className="text-2xl text-white group-hover:text-white " /> */}
            <Button
              className="text-white border-0 p-5 bg-zinc-900"
              variant="outline"
              onClick={()=>setDialogOpen(!dialogOpen)}
            >
          
              Create Workspace
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Workspace Name
                </Label>
                <Input
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,
                      workspacename: e.target.value,
                    })
                  }
                  id="name"
                  name="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  className="col-span-3"
                  onChange={(e) =>
                    setWorkspace({ ...workspace, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger >
                <DialogClose asChild>

                <Button onClick={handleSubmit} type="submit">
                  Add Workspace
                </Button>
                </DialogClose>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

export default AddWorkspace;
