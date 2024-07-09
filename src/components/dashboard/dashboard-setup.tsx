"use client";
import React,{useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WorkspaceStore } from "@/store";

// import { zodResolver } from "@hookform/resolvers/zod"

import { Switch } from "@/components/ui/switch";
import axiosInstance from "../../lib/axios";
interface Props {
  onUpdate: (data: any) => void;
}
const DashboardSetUp = ({ onUpdate }: Props) => {
  const setWorkspaceName = WorkspaceStore((state) => state.setWorkspaceName);
  const setuserId = WorkspaceStore((state) => state.setUserId);
  const setDescription = WorkspaceStore((state) => state.setDescription);
  const addWorkspace = WorkspaceStore((state) => state.addWorkspace);
  const router = useRouter();

  const [state,setState]=useState<string>('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const workspacename = formdata.get("name");
    const description = formdata.get("description");
    const userId = localStorage.getItem("userId");
    const email=localStorage.getItem("email");
    const username=localStorage.getItem("username");
    if(isPrivate){
      setState('private')
    }else{
      setState('public')
    }



    const data = {
      workspacename,
      description,
      userId,
      email,
      username
    };

    console.log(data);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/createWorkspace`,
        data,
        {withCredentials:true}
      );
      
      if (response.data) {
        toast.success("Workspace Created Sucessfull", {
          position: "top-left",
        });
        console.log("datat", response.data);
        onUpdate(response.data);

        addWorkspace({
          workspacename: response.data.workspacename,
          userId: response.data.userId,
          description: response.data.description,
          workspaceId: response.data._id,
          inviteMembers:response.data.inviteMembers,
          workpspaceOwner:response.data.workspaceOwner
        });
        // setWorkspaceName(response.data.workspacename);
        // setuserId(response.data.userId)
        // setDescription(response.data.description)
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const [isPrivate, setIsPrivate] = useState(false);  

  const handleSwitchChange = (event: React.MouseEvent<HTMLButtonElement>) => {

    setIsPrivate(!isPrivate);
   
  };

  return (
    <Card className="w-[900px]  sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Let's create a private workspace to get you started. You can add
          collaborators later from the workspace setting tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col  gap-4">
            {" "}
            {/* Centering items */}
            <div className="flex flex-col gap-3  text-sm">
              <Label>Workspace Name</Label>
              <Input
                className="p-2"
                type="text"
                name="name"
                placeholder="Enter Workspace Name..."
              />
            </div>
            <div className="flex flex-col gap-3  text-sm">
              <Label>Description</Label>
              <Input
                className="p-2"
                type="text"
                name="description"
                placeholder="Enter a Description..."
              />
            </div>
            <div className="flex items-center space-x-2">

    </div>
            <Button className="px-28 bg-blue-900">Create A Workspace</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default DashboardSetUp;
