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
import { useRouter } from "next/navigation";
import { useEdgeStore } from "../../lib/edgestore";
import axios from "axios";
import useBearerStore from "@/store";
import axiosInstance from "../../lib/axios";
import Image from "next/image";

function Profile() {
  const [file, setFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const setImageUrl = useBearerStore((state) => state.setImageUrl);
  const setName = useBearerStore((state) => state.setUsername);
  const setEmail = useBearerStore((state) => state.setEmail);
  const setuserId = useBearerStore((state) => state.setuserId);
  const { username } = useBearerStore((state) => state.config);
  const { email } = useBearerStore((state) => state.config);
  const { imageUrl } = useBearerStore((state) => state.config);
  const userId = localStorage.getItem("userId") || "";

  const [usernameInput, setUsernameInput] = useState(username || "");

  useEffect(() => {
    const userName = localStorage.getItem("username") || "";
    const emails = localStorage.getItem("email") || "";
    const imageUrls = localStorage.getItem("imageUrl") || "";

    setName(userName);
    setEmail(emails);
    setuserId(userId);
    setImageUrl(imageUrls);
  }, [setEmail, setImageUrl, setName, setuserId, userId]);

  const handleSubmit = async () => {
    try {
      const data = { username: usernameInput, userId };

      const response = await axiosInstance.post(`updateProfile`, data, {
        withCredentials: true,
      });

      localStorage.setItem("username", response.data.username);

      if (response) {
        setName(response.data.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      router.replace("/");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MdOutlineSettings className="text-2xl text-slate-500 group-hover:text-slate-500" />
      </SheetTrigger>
      <SheetContent className="bg-white">
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
                setFile(e.target.files?.[0] || null);
              }}
            />

            {
              <Image
                src={imageUrl}
                height={200}
                width={200}
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
                      console.log(progress);
                    },
                  });

                  setImagePreview(res.url);

                  const data = {
                    userId,
                    imageUrl: res.url,
                  };

                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateImage`,
                    data,
                    { withCredentials: true }
                  );

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
            <Input
              id="name"
              onChange={(e) => setUsernameInput(e.target.value)}
              defaultValue={username}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input id="username" defaultValue={email} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
          <Button onClick={handleLogout} type="submit">
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Profile;
