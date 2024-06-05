"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import useBearerStore from "@/store";
import axiosInstance from '../../../lib/axios'
export default function Login() {
  const setUserId=useBearerStore((state)=>state.setuserId)
  const setEmail=useBearerStore((state)=>state.setEmail)

  const setUsername=useBearerStore((state)=>state.setUsername)

  const handleGoogleLogin = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  const handleGithubLogin = () => {
    window.open(`http://localhost:5000/auth/github/callback`, "_self");
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email");
    const password = formdata.get("password");

    const data = {
      email,
      password,
    };

    // console.log(email, password);
    try {
      const response = await axiosInstance.post(`/login`, data, {
        withCredentials: true,
      });
      if (response) {
        // console.log("response",response.data);
        // localStorage.setItem('userId',)
        toast.success("Login Completed", {
          position: "top-left",
        });

        // console.log(response.data);

        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email",response.data.email);
        localStorage.setItem("username",response.data.username)
        localStorage.setItem("token",response.data.token)

        setUserId(response.data.userId)
        setEmail(response.data.email)
        setUsername(response.data.username)

        router.replace("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <div className="w-full  flex items-start justify-start ">
        <div className="h-screen w-5/12  flex flex-col  items-center justify-center">
          <Card className="w-full max-w-md h-4/5 ">
            <CardHeader>
              <CardTitle className="text-center p-3">Welcome Back!</CardTitle>
              <CardDescription className="text-2xl text-center  pb-3 font-semibold text-black">
                LogIn
              </CardDescription>
              <CardDescription className="">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Email.."
                    />
                  </div>
                  <div className="flex flex-col mt-2 space-y-2">
                    <Label htmlFor="framework">Password</Label>
                    <Input
                      name="password"
                      className="p-5 bg-gray-200"
                      id="password"
                      placeholder="Enter your Password.."
                    />
                  </div>
                  <Link href="/forgotpassword">
                    <p className="text-right">Forgot Password?</p>
                  </Link>
                </div>
                <CardFooter className="flex flex-col justify-center gap-5 items-center">
                  <Button className="px-28 bg-blue-900">Login</Button>
                  <div className="flex gap-3">
                    <p className="text-gray-600 underline font-medium">
                      Don't Have An Account?{" "}
                    </p>
                    <Link href="/signup">
                      <span className="text-indigo-500 font-semibold no-underline">
                        SignUp
                      </span>
                    </Link>
                  </div>
                </CardFooter>
              </form>
              <div className="flex gap-5 items-center justify-center ">
                <Button onClick={handleGoogleLogin} className="px-10">
                  Google
                </Button>
                <Button onClick={handleGithubLogin} className="px-10">
                  Github
                </Button>
              </div>
            </CardContent>

            {/* <hr className="bg-gray-200 my-3 w-4/12 "/> */}
          </Card>
        </div>
        <div className="h-screen">
          <Image
           src={`https://source.unsplash.com/random/?tech&q=100&t=${Date.now()}`}
            className="h-full  object-cover"
            width={900}
            height={490}
            alt="Images"
          ></Image>
        </div>
      </div>
    </>
  );
}
