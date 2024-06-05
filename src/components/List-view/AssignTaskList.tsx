import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import axios from "axios";
import useListTaskStore from "@/store/List-View";

function PopoverDemo({workspaceId}:{workspaceId:string}) {
  const [query, setQuery] = useState("");
  const [email,setEmail]=useState<string[]>([])
  const [searchValue, setSerachValue] = useState<string[]>([]);
  const setAssigne=useListTaskStore((state)=>state.setAssigne)
  const {assigne}=useListTaskStore((state)=>state.task)
  const handleFindUser = async () => {
    console.log(query);
    const response = await axios.get(
      `http://localhost:5000/task/assignTaskToOthersFindThem/${query}/${workspaceId}`
    );

    if (response) {
      console.log(response.data); 

      const emailArray = response.data.inviteMembers.map((user:string[]) => user); 
        console.log("emailArray",emailArray);  

      setSerachValue(emailArray);

      //   console.log("searchValue",searchValue);
    }
  };

  const handleAssign=(nemail:string)=>{
    setEmail([...email,nemail])
  }

  const handleAssignee=()=>{
    setAssigne(email)
    // assigne
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-black bg-white border border-sky-600 py-2 px-10 rounded-lg">
          Assignee
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-4 gap-4">  
          <div className="relative flex-1">  
            <Search 
              onClick={handleFindUser}
              className="absolute left-44 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 border rounded p-2 text-black w-full"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAssignee} className="text-white bg-blue-600 border border-sky-600 py-2 px-4 rounded-lg">
            Add
          </Button>
        </div>
        <div className="flex flex-col">
          {searchValue.map((email: string, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                  onChange={(event) => handleAssign(email)} 
              />
              <p className="text-black"> {email}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverDemo;
