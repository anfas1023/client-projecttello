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
import useSetTask from "@/store/SetTask";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { toast } from "sonner";

export function AddDescription({ taskDescription, taskId }: { taskDescription: string, taskId: string }) {
  const [description, setDescription] = useState("");
  const setTaskDescription = useSetTask((state) => state.setDescription);
  const [isOpen, setIsOpen] = useState(false);

  const addDescription = async () => {
    try {
      const data = { description };
      console.log(data);

      const response = await axios.post(
        `http://localhost:5000/task/addDescription/${taskId}`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        console.log(response.data.description);

        setTaskDescription(response.data._id, response.data.description);

        toast.success("Description added successfully", {
          position: "top-left",
        });

        // Close the dialog
        setIsOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.log(error);  
        
        if (error.response.status === 401) {
          toast.error("token expired logout", { position: "top-left" });
        } else {
          toast.error("Error", { position: "top-left" });
        }
      } else {
        toast.error("An unexpected error occured", { position: "top-left" });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg mt-8 mb-10">
          Add Description
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat">
        <DialogHeader>
          <DialogTitle className="text-white">Add description</DialogTitle>
          <DialogDescription className="text-white">
           Add a new description please add the description by clicking savedescription
          </DialogDescription>
        </DialogHeader>
        <textarea
          className="w-full h-32 p-2  bg-custom-zinc text-white rounded mb-4"
          defaultValue={taskDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={addDescription}
        >
          Save Description
        </button>
        <DialogFooter>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
