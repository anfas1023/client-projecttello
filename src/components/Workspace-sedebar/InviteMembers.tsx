"use client";
import React, { useState } from 'react';
import { toast } from "sonner";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
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
  const [loading,setloading]=useState<boolean>(false)

  const handleInviteMembers = async () => {
   

    const data = {
      emails: email,
      workspaceId: workspaceId
    };
    setloading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/addMemberToWorkspace`, data, {
        withCredentials: true
      });

      if (response) {
        toast.success("Members added successfully", {
          position: "top-left",
        });
        setloading(false)
      }
    } catch (error) {
      console.log("error", error);
      setloading(false)
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = async () => {
    console.log("searchQuery", query);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/inviteToWorkspace/${query}`);
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

  const handleSendVerificationLink=async(email:string)=>{
    console.log("email",email);
    setloading(true)
    try{
const response=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/sendInvitationLink?email=${email}&workspaceId=${workspaceId}`,{
  withCredentials:true
});

if(response){
  setloading(false)

  toast.success(response.data.success,{position:"top-left"})
}
    }catch(error){
    setloading(false);
    console.log(error);
    
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("User already invited to this workspace.", { position: "top-left" });
    }else if(axios.isAxiosError(error) && error.response?.status === 401){
      toast.error("token expired logout", { position: "top-left" });
    }
     else {
        toast.error("An error occurred while sending the verification link.", { position: "top-left" });
    }
    }
  }

  return (
    <>
     <Dialog>
      <DialogTrigger asChild>
      <button className="focus:outline-none">
            <AiOutlineUsergroupAdd className="text-white" size={30} />
          </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat p-4 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className='text-center text-white mb-2'>Enter an email send Verification </DialogTitle>
          <DialogDescription className='text-center text-white'>
            Enter a email click on button to send inviation link 
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full'>
            <input
              type="email"
              className="border w-full  text-left px-6 py-2 rounded"
              placeholder="Enter A email..."
              value={query}
              onChange={handleSearchChange}
            />
          </div>

          <button onClick={()=>handleSendVerificationLink(query as string)} className="mt-4 bg-blue-500 text-white p-2 rounded">
             {loading?"Loading..." : "Send Verification Link"}
            </button>
 

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button>  */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default InviteMembers;
