"use client";

import React, { useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
export default function ForgotPassword() {
  const router=useRouter()
  const [error,setErrorMessage]=useState<string>("")
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget)
    const email=formData.get('email')
    const password=formData.get('password')
    const ConfirmPassword=formData.get('ConfirmPassword')

    const pass = password as string;

    const data={
      email,
      password
    }

    // console.log(data);
    try {

      if(!email){
        toast.error("please fill the Email", { position: "top-left" })
        return
      }

      if(!password){
        toast.error("please fill the Password", { position: "top-left" })
        return
      }
    
      if(password!==ConfirmPassword){
        toast.error("password and confirm password must be equals", { position: "top-left" })
        return
      }

      if(pass.length<6){
        toast.error("password should more than 6", { position: "top-left" })
        return
      }


      if(!password || !ConfirmPassword){
        toast.error("password and confirm password must be Filled Its Mandatory", { position: "top-left" })
        return
      }
     
    const response=await axios.post(`http://localhost:5000/forgotpassword`,data,{
      withCredentials:true
    })

    if(response.status===201){
      toast.success("OTP for Password Verification sent to mail",{position:"top-left"})
      localStorage.setItem("email",email as string)
  router.push('/otp')
    }

    
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }

  }
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <Card className="w-full  ">
              <CardHeader>
                <CardTitle className="font-bold text-red-700 capitalize text-2xl text-center">
                  Forgot-Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full item-center gap-4 ">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Email.."
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Email.."
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Confirm Password</Label>
                    <Input
                      id="ConfirmPassword"
                      name="ConfirmPassword"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Email.."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col justify-center gap-5 items-center">
                <Button className="px-28 bg-blue-900">Verify</Button>
              </CardFooter>
              {/* <hr className="bg-gray-200 my-3 w-4/12 "/> */}
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
