"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Folder, WorkspaceStore, useFolderStore } from "@/store";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddFolders({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [folderName, setFolderName] = useState("");
  const workspaces = WorkspaceStore((state) => state.workspaces);
  const [dialogOpen, setDialogOpen] = useState(false);
  const addFolder = useFolderStore((state) => state.addFolder);
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      folderName: folderName,
      workspaceId: workspaceId,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/folders/createfolder`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response) {
        // toast.success()

        // response.data.forEach(())

        // console.log(response.data);

        addFolder({
          folderId: response.data._id,
          workspaceId: response.data.workspaceId,
          folderName: response.data.folderName,
          trash: response.data.trash,
        });

        toast.success("Folder Created Sucessfull", {
          position: "top-left",
        });
        setDialogOpen(!dialogOpen);
        // router.push(`/dashboard/${workspaceId}`)
      }
    } catch (error) {
      setDialogOpen(!dialogOpen);
      // console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data === "Folder Exist") {
          toast.error("Folder already exists", {
            position: "top-left",
          });
        } else if (error.response.status === 401) {
          toast.error("token expired logout", {
            position: "top-left",
          });
        } else {
          toast.error("Folder already exists", {
            position: "top-left",
          });
        }
      } else {
        toast.error("An unexpected error occurred", {
          position: "top-left",
        });
      }
    }
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setDialogOpen(!dialogOpen)}
          className=" flex justify-between bg-neutral-800 text-white font-normal text-l  rounded-lg hover:bg-workspace-gray"
        >
          Folders
          {/* <FiPlus className="text-2xl pl-6 text-white" /> */}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center pt-3">Add folders</DialogTitle>
          <DialogDescription className="text-center">
            You can create Folders here.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Foldername
              </Label>
              <Input
                id="name"
                placeholder="Enter Your folder name"
                className="col-span-3"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} type="submit">
              Add Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
