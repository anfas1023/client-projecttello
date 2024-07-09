import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import React from 'react'
import { IoSearch } from "react-icons/io5";


export function NewChat({workspaceId,fetchMessage}:{workspaceId:string,fetchMessage: (conversationId: string, receiver: string) => Promise<void>}) {
  const [userData, setuserData] = React.useState<string[] | undefined>();
  const [query, setQuery] = React.useState<string>();

  const searchUser = async () => {
    console.log("query", query);

    const response = await axios.get(
      `http://localhost:5000/chat/searchUsers/${query}/${workspaceId}`
    );

    if (response) {
      const localStorageEmail = localStorage.getItem("email");
      const filteredData = response.data.filter(
        (user: any) => user.email !== localStorageEmail
      );
      // console.log("filteredData", filteredData);

      // console.log("response", response);

      // response.data.map((user:any)=>{

      // })
      setuserData(filteredData);

      // console.log("userData", userData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <h3 className="text-sm text-white">NewChat</h3>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Members</DialogTitle>
          <DialogDescription>
          You can Find memebers by searching
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="mt-5 ">
              <input
                onChange={(e) => setQuery(e.target.value)}
                className="px-12 py-2 rounded-lg bg-workspace-gray text-white  focus:border-0 outline-none"
                placeholder="search..."
              />
              <div className="fixed">
                {/* <Image className="absolute  top-22 left-55" height={20} width={20} src={searchIcon} alt="" />  */}
                <IoSearch
                  onClick={searchUser}
                  className="absolute bottom-2.5 text-white left-2"
                  size={20}
                />
              </div>
            </div>
        <div className=" mt-4 ">
            {userData
              ? userData.map((user: any) => (
                  <React.Fragment key={user.username}>
                    <div
                      onClick={() => fetchMessage("new", user._id)}
                      className="flex overscroll-auto items-center py-[27.7px] border-b border-gray-300"
                    >
                      <div className="cursor-pointer">
                        {/* <Image height={40} width={40} alt="" src={Avatar} /> */}
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg">{user.username}</h3>
                        <p className="text-base font-light">{status}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              : " "}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
