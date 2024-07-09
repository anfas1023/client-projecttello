"use client";
import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// import { Search } from "lucide-react";
import axios from "axios";
import useListTaskStore from "@/store/List-View";
import { WorkspaceStore } from "@/store";

// function PopoverDemo({setAssigneError,workspaceId}:{setAssigneError:React.Dispatch<React.SetStateAction<boolean>>,workspaceId:string}) {
//   const [query, setQuery] = useState("");
//   const [email,setEmail]=useState<string[]>([])
//   const [searchValue, setSerachValue] = useState<string[]>([]);
//   const setAssigne=useListTaskStore((state)=>state.setAssigne)
//   const {assigne}=useListTaskStore((state)=>state.task)
//   const Workspace=WorkspaceStore((state)=>state.workspaces)
//   const handleFindUser = async () => {
//     console.log(query);
//     const response = await axios.get(
//       `http://localhost:5000/task/assignTaskToOthersFindThem/${query}/${workspaceId}`
//     );

//     if (response) {
//       // console.log(response.data);

//       const emailArray = response.data.inviteMembers.map((user:string[]) => user);
//         // console.log("emailArray",emailArray);

//       setSerachValue(emailArray);

//       //   console.log("searchValue",searchValue);
//     }
//   };

//   const handleAssign=(nemail:string)=>{
//     setEmail([...email,nemail])
//   }

//   const handleAssignee=()=>{
//     setAssigne(email)
//     // assigne
//     setAssigneError(false)
//   }

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <button className="text-black bg-white border border-sky-600 py-2 px-10 rounded-lg">
//           Assignee
//         </button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-4 bg-chat rounded-lg border-0 shadow-lg">
//         <div className="flex items-center mb-4 gap-4">
//           <div className="relative flex-1">
//             <Search
//               onClick={handleFindUser}
//               className="absolute left-44 top-1/2 transform -translate-y-1/2 text-gray-500"
//             />
//             <Input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 border rounded p-2 text-black w-full"
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//           <Button onClick={handleAssignee} className="text-white bg-blue-600 border border-sky-600 py-2 px-4 rounded-lg">
//             Add
//           </Button>
//         </div>
//         <div className="flex flex-col">
//       {Workspace
//         .filter((workspace) => workspace.workspaceId === workspaceId)
//         .map((workspace) =>
//           workspace.inviteMembers.map((member, index) => (
//             <div key={index} className="flex items-center">
//               <input
//                 type="checkbox"
//                 onChange={() => handleAssign(member.email)}
//               />
//               <p className="text-black">{member.email}</p>
//             </div>
//           ))
//         )}

//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

// export default PopoverDemo;


// import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface Assigne {
  userName: string;
  email: string;
  userId: string;
  role: string;
}
function AssignTaskList({
  assigneError,
  setAssigneError,
  workspaceId,
}: {
  assigneError:boolean,
  setAssigneError: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // const Workspace=WorkspaceStore((state)=>state.workspaces)
    const [query, setQuery] = useState("");
  const [email,setEmail]=useState<string[]>([])
  const [searchValue, setSerachValue] = useState<string[]>([]);
  const setAssigne=useListTaskStore((state)=>state.addAssigne)
  const {assigne}=useListTaskStore((state)=>state.task)
  const Workspace=WorkspaceStore((state)=>state.workspaces)


  const handleAssign=(nemail:string,member:Assigne)=>{
    console.log("assigne11");
    
    setEmail([...email,nemail]);
    setAssigne(member);
    // setAssigneError(!assigneError)
    console.log("assigneError",assigneError,email);
    
  }

  const handleAssignee=()=>{
   
    // assigne
   
  }

return (
  <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <button className="bg-custom-zinc text-white py-2 px-10 rounded-lg">
      Assignee
    </button>
  </PopoverTrigger>
  <PopoverContent className="w-[300px] p-0">
    <Command className="bg-chat text-white border-1 border-zinc-800">
      <CommandInput placeholder="Search framework..." className="h-9 border-0" />
      <CommandList className="border-0">
        <CommandEmpty className="border-0">No framework found.</CommandEmpty>
        <CommandGroup className="border-0 bg-chat">
          {Workspace.filter((workspace) => workspace.workspaceId === workspaceId).map((workspace) =>
            workspace.inviteMembers.map((member, index) => ( 
              <CommandItem key={index} className="border-0 bg-chat">
                <div className="flex bg-red-800  items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleAssign(member.email,member)}
                  />
                  <p className="text-white bg-chat">{member.email}</p>
                </div>
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
)
}
export default AssignTaskList;
