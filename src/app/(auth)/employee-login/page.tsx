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
import { useSearchParams } from 'next/navigation'
export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email : string | null = searchParams.get('email');
  const workpsaceId : string | null=searchParams.get("workspaceId");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phonenumberError, setphoneError] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmError, setConfirmError] = useState("");

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
    // const email = formdata.get("email");
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
    role:"member",
    workpsaceId:workpsaceId
  };
  const response = await axios.post("http://localhost:5000/signup", data);

  console.log(response.data);
  // localStorage.setItem("email", email as string);
  if (response) {
    console.log("hereee");

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
      // router.push('/login'); 
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

  console.log(email)  

  return (
    <>
      <div className="w-full h-screen flex items-start justify-start ">
        <div className="h-screen w-7/12  flex flex-col  items-center justify-center ">
          <Card className="w-full max-w-md h-5/6 ">
            <CardHeader>
              <CardTitle className="font-bold text-red-700 capitalize text-2xl text-center">
                Employee-SignUp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      name="username"
                      id="Username"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Username.."
                    />
                    {error && (
                      <p className="text-red-700 text-left text-sm font-semibold ">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mt-2 space-y-2">
                    <Label htmlFor="framework">Email</Label>
                    <Input
                      name="email"
                      value={email as string}
                      readOnly
                      className="p-5  bg-gray-200"
                      id="email"
                      placeholder="Enter your Password.."
                    />
                    {emailError && (
                      <p className="text-red-700 text-left text-sm font-semibold ">
                        {emailError}
                      </p>
                    )}
                    
                  </div>
                  <div className="flex flex-col mt-2 space-y-2">
                    <Label htmlFor="framework">PhoneNumber</Label>
                    <Input
                      name="phonenumber"
                      className="p-5 bg-gray-200"
                      id="Phonenumber"
                      placeholder="Enter your Password.."
                    />
                    {phonenumberError && (
                      <p className="text-red-700 text-left text-sm font-semibold ">
                        {phonenumberError}
                      </p>
                    )}
                  </div>


                  <div className="flex flex-col  mt-2 space-y-2">
                    <Label htmlFor="name">Password</Label>
                    <Input 
                      name="password" 
                      id="Password"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Username.."
                    />
                    {password && (
                      <p className="text-red-700 text-left text-sm font-semibold ">
                        {password}
                      </p>
                    )}
                  </div>



                  <div className="flex flex-col  mt-2 space-y-2">
                    <Label htmlFor="name">ConfirmPassword</Label>
                    <Input
                      name="confirmpassword"
                      id="Password"
                      className="p-5 bg-gray-200"
                      placeholder="Enter Your Username.."
                    />

                    {ConfirmError && (
                      <p className="text-red-700 text-left text-sm font-semibold ">
                        {ConfirmError}
                      </p>
                    )}
                  </div>

                  <CardFooter className="flex flex-col justify-center gap-5 items-center">
                    <Button className="px-28 bg-blue-900">SignUp</Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className=" h-screen">
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
