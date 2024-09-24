"use client";
import React, { FormEvent, useState } from "react";
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
// import Sass from '../../../../public/images/WhatsApp Image 2024-05-01 at 18.08.40_49fb1842.jpg'
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signUpImage from '../../../../public/images/project-management-tools-illustration-20vwwkbworhkpzff.jpg'
 
export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phonenumberError, setphoneError] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmError, setConfirmError] = useState("");
  const [loading,setLoading] =useState(false)
  const validateEmail = (email: string) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{1,10}$/;

    return phoneRegex.test(number);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const username = formdata.get("username");
    const phonenumber = formdata.get("phonenumber");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const confirmpassword = formdata.get("confirmpassword");
    const number = phonenumber as string;
    const pass = password as string;
    setError("")
    setEmailError("")
    setphoneError("")
    setPassword("")
    setConfirmError("")
    

    // console.log(username, phonenumber, email, password);

    if (!username) {
      setError("Enter a valid username");
      return;
    }

    if (!email) {
      setEmailError("Enter Valid Email");
      return;
    }

    if (!validateEmail(email as string)) {
      setEmailError("Enter Valid Email");
      return;
    }

    if (number.length > 10 || number.length < 10 || number.length < 0) {
      setphoneError("Your Phone Numer Should be 10 numbers");
      return;
    }

    if (!password || pass.length < 5) {
      setPassword("Password Should contain at least 6");
      return;
    }

    if (password !== confirmpassword) {
      setConfirmError("Password and confirm password should match");
      return;
    }



try {

  const data = {
    username,
    email,
    password,
    phonenumber,
  };
  setLoading(true)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, data);

  console.log(response.data);
  // localStorage.setItem("email", email as string);
  if (response) {
    console.log("hereee");
    setLoading(false)
    toast("OTP", {
      description: "OTP sent to gmail sucessfully",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });

    router.replace("/sucess");
  }
} catch (error) {
  console.log("error",error);
  
  if(axios.isAxiosError(error) && error.response){
    if (error.response.data === "user already exists") {
      toast.error("user already exists", {
        position: "top-left",
      });
    } else {
      toast.error("user already exists try different email", {
        position: "top-left",
      });
    }
  }else{
    toast.error("An unexpected error occurred", {
      position: "top-left",
    });
  }
}

    // console.log(response.data)
  };

  return (
    <>
<div className="w-full h-screen flex flex-col lg:flex-row items-start justify-start">
        <div className="h-auto lg:h-screen w-full lg:w-7/12 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-bold text-red-700 capitalize text-2xl text-center">
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      name="username"
                      id="username"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Username.."
                    />
                    {error && (
                      <p className="text-red-700 text-left text-sm font-semibold">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      className="p-5 bg-gray-200"
                      id="email"
                      placeholder="Enter your Email.."
                    />
                    {emailError && (
                      <p className="text-red-700 text-left text-sm font-semibold">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="phonenumber">Phone Number</Label>
                    <Input
                      name="phonenumber"
                      className="p-5 bg-gray-200"
                      id="phonenumber"
                      placeholder="Enter your Phone Number.."
                    />
                    {phonenumberError && (
                      <p className="text-red-700 text-left text-sm font-semibold">
                        {phonenumberError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      id="password"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Password.."
                    />
                    {password && (
                      <p className="text-red-700 text-left text-sm font-semibold">
                        {password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                    <Input
                      name="confirmpassword"
                      id="confirmpassword"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Confirm Password.."
                    />
                    {ConfirmError && (
                      <p className="text-red-700 text-left text-sm font-semibold">
                        {ConfirmError}
                      </p>
                    )}
                  </div>
                  <CardFooter className="flex flex-col justify-center gap-5 items-center">
                    <Button className="px-28 bg-blue-900 w-full">{loading ? "Loading..." : "Sign Up"}</Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="h-auto lg:h-screen w-full lg:w-5/12">
          <Image
            src={signUpImage}
            className="h-full w-full object-cover"
            width={900}
            height={490}
            alt="Sign Up Illustration"
          />
        </div>
      </div>
    </>
  );
}
