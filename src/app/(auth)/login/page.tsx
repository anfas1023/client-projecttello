"use client";
import React, { useEffect, useState } from "react";
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
import LoginImage from '../../../../public/images/project-management-tools-illustration-20vwwkbworhkpzff.jpg'
export default function Login() {
  const setUserId=useBearerStore((state)=>state.setuserId)
  const setEmail=useBearerStore((state)=>state.setEmail)
  const [loading,setLoading]=useState(false)
  const setUsername=useBearerStore((state)=>state.setUsername)

  const handleGoogleLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`, "_self");
  };

  const handleGithubLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/callback`, "_self");
  };

  const router = useRouter();
  console.log("process.env.NEXT_PUBLIC_BACKEND_URL",process.env.NEXT_PUBLIC_BACKEND_URL)
 useEffect(()=>{
  const userId=localStorage.getItem("userId");
  if(userId){
    console.log("onLogin",userId); 
    return  router.push('/dashboard');  
  }
 },[router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email");
    const password = formdata.get("password");
   

    const data = {
      email,
      password,
    };

  console.log("process.env.NEXT_PUBLIC_BACKEND_URL",process.env.NEXT_PUBLIC_BACKEND_URL)

    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, data, {
        withCredentials: true,
      });
      if (response) {
   
        setLoading(false)
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
        setUsername(response.data.username);

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
    <div className="w-full flex flex-col lg:flex-row items-start justify-start">
  <div className="mt-10 w-full lg:w-5/12 flex flex-col items-center justify-center">
    <Card className="w-full max-w-md h-auto lg:h-4/5">
      <CardHeader>
        <CardTitle className="text-center p-3">Welcome Back!</CardTitle>
        <CardDescription className="text-2xl text-center pb-3 font-semibold text-black">
          Log In
        </CardDescription>
        <CardDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                className="p-5 bg-gray-200"
                placeholder="Enter Your Email.."
              />
            </div>
            <div className="flex flex-col mt-2 space-y-2">
              <Label htmlFor="password">Password</Label>
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
            <Button className="w-full px-8 bg-blue-900">
              {loading ? "Loading..." : "Login"}
            </Button>
            <div className="flex gap-3">
              <p className="text-gray-600 underline font-medium">
                Don’t Have An Account?
              </p>
              <Link href="/signup">
                <span className="text-indigo-500 font-semibold no-underline">
                  Sign Up
                </span>
              </Link>
            </div>
          </CardFooter>
        </form>
        <div className="flex gap-5 items-center justify-center mt-4">
          <Button onClick={handleGoogleLogin} className="px-10">
            Google
          </Button>
          <Button onClick={handleGithubLogin} className="px-10">
            Github
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  <div className="h-auto lg:h-screen w-full lg:w-7/12">
    <Image
      src={LoginImage}
      className="h-full w-full object-cover"
      width={900}
      height={240}
      alt="Images"
    />
  </div>
</div>

    </>
  );
}
