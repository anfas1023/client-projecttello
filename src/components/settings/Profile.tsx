import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineSettings } from "react-icons/md";

import image from "../../../public/images/depositphotos_53989081-stock-photo-black-texture.jpg";
import { useEdgeStore } from "../../lib/edgestore";
import axios from "axios";
import useBearerStore from "@/store";
import axiosInstance from '../../lib/axios'

function Profile() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  const [imagePreview, setImagePreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  //   zustand hooks
  const setImageUrl = useBearerStore((state) => state.setImageUrl);
  const setName = useBearerStore((state) => state.setUsername);
  const setEmail = useBearerStore((state) => state.setEmail);
  const setuserId = useBearerStore((state) => state.setuserId);
  const { username } = useBearerStore((state) => state.config);
  const { email } = useBearerStore((state) => state.config);
  const { imageUrl } = useBearerStore((state) => state.config);
  let userId: string | null = localStorage.getItem("userId");

  const [usernameInput,setUsernameInput] = useState("")

  //   zustand hooks
  useEffect(() => {
    const userName = localStorage.getItem("username");
    const emails = localStorage.getItem("email");
    const imageUrls = localStorage.getItem("imageUrl");

    setName(userName as string); 
    setEmail(emails as string);
    setuserId(userId as string);
    setImageUrl(imageUrls as string);

    // const storedUsername = localStorage.getItem("username"); 
  }, [email, imageUrl]);
  //   setUsername(storedUsername);

  //   const handleImageChange = (e: any) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setImage(file);
  //       setImagePreview(URL.createObjectURL(file));
  //     }
  //   };
  // console.log("imageurl", imageUrl); 
  const handleSubmit = async() => {
    // console.log("Changes saved!",usernameInput); 

    try {
      const data={
        username:usernameInput,
        userId:userId
      }

      // console.log("data",data); 

      const response=await axiosInstance.post(`updateProfile`,data,{
        withCredentials:true
      })

      // console.log("response",response.data);  

      localStorage.removeItem("username")
      localStorage.setItem("username",response.data.username)
      
        if(response){
          setName(response.data.username)  
        }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MdOutlineSettings className="text-2xl text-slate-500 group-hover:text-slate-500" />
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="text-center">Edit Profile</SheetTitle>
          <SheetDescription className="text-gray-700 text-center font-medium text-xl">
            Welcome {username}  
          </SheetDescription>
        </SheetHeader>  
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <input
              type="file"
              id="image"
              className="bg-slate-100 rounded-lg py-3 px-3 hidden"
              ref={fileRef}
              onChange={(e) => {
                setFile(e.target.files?.[0]); 
              }}
            />

{
    
    <img
    src={imageUrl}
    alt="Profile Preview"
    onClick={() => fileRef.current?.click()}
    className="col-span-4 h-24 w-24 object-cover mt-2 mx-auto rounded-full"
  />
}

            <button
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      console.log(progress);
                    },
                  });
                  // you can run some server action or api here
                  // to add the necessary data to your database
                  // console.log("res edge store", res); 
                  setImagePreview(res.url);  

                  const data = {
                    userId: userId,
                    imageUrl: res.url,
                  };

                  // console.log("data", data); 

                  const response = await axios.post(
                    `http://localhost:5000/updateImage`,
                    data,
                    {
                      withCredentials: true,
                    }
                  );


                  console.log("resdddcjd",response.data.profilePhoto);

                  localStorage.setItem("imageUrl", response.data.profilePhoto);

                  setImageUrl(response.data.profilePhoto);
                }
              }}
            >
              Upload
            </button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" onChange={(e)=>setUsernameInput(e.target.value)} defaultValue={username} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username" 
              defaultValue={email}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
       
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
     
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Profile;
