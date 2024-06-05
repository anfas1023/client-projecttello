"use client";
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  workspaceId: string;
}

const InviteMembers = ({ workspaceId }: Props) => {
  const [query, setSearchQuery] = useState<string>();
  const [searchValue, setSearchValue] = useState<string[]>([]);
  const [email, setEmail] = useState<string[]>([]);

  const handleInviteMembers = async () => {
    // console.log("email set", email);

    const data = {
      emails: email,
      workspaceId: workspaceId
    };

    try {
      const response = await axios.post(`http://localhost:5000/workspace/addMemberToWorkspace`, data, {
        withCredentials: true
      });

      if (response) {
        toast.success("Members added successfully", {
          position: "top-left",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = async () => {
    console.log("searchQuery", query);

    try {
      const response = await axios.get(`http://localhost:5000/workspace/inviteToWorkspace/${query}`);
      console.log(response.data);
      
      const emailArray = response.data.map((user: any) => user.email);
      setSearchValue(emailArray);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAssign = (nemail: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail([...email, nemail]);
  };

  return (
    <>
     <Dialog>
      <DialogTrigger asChild>
      <button className="focus:outline-none">
            <AiOutlineUsergroupAdd className="text-white" size={30} />
          </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-4 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Search Members To Add To Workspace</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex'>
            <input
              type="email"
              className="border p-2 rounded"
              placeholder="Search by email"
              value={query}
              onChange={handleSearchChange}
            />
            <button onClick={handleClick} className="ml-2">
              <IoSearchOutline size={20} />
            </button>
          </div>
          <div className='flex flex-col mt-4'>
            {searchValue.map((email: string, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={(event) => handleAssign(email, event)}
                />
                <p className="ml-2 text-black">{email}</p>
              </div>
            ))}
            <button onClick={handleInviteMembers} className="mt-4 bg-blue-500 text-white p-2 rounded">
              Add
            </button>
          </div>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button>  */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default InviteMembers;
