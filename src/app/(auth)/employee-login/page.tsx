"use client";
import React, { FormEvent, useState, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string | null = searchParams.get("email");
  const workspaceId: string | null = searchParams.get("workspaceId");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phonenumberError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const username = formdata.get("username");
    const phonenumber = formdata.get("phonenumber");
    const password = formdata.get("password");
    const confirmpassword = formdata.get("confirmpassword");

    setError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmError("");

    if (!username) {
      setError("Enter a valid username");
      return;
    }

    if (!email) {
      setEmailError("Enter Valid Email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Enter Valid Email");
      return;
    }

    if (!validatePhoneNumber(phonenumber as string)) {
      setPhoneError("Your Phone Number Should be 10 numbers");
      return;
    }

    if (!password || (password as string).length < 6) {
      setPasswordError("Password Should contain at least 6 characters");
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
        role: "member",
        workspaceId: workspaceId,
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, data);

      if (response) {
        toast("OTP", {
          description: "OTP sent to gmail successfully",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });

        router.replace("/success");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data === "user already exists") {
          toast.error("user already exists", {
            position: "top-left",
          });
        } else {
          toast.error("user already exists try different email", {
            position: "top-left",
          });
        }
      } else {
        toast.error("An unexpected error occurred", {
          position: "top-left",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-start justify-start">
      <div className="h-screen w-7/12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md h-5/6">
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
                    <p className="text-red-700 text-left text-sm font-semibold">
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
                <div className="flex flex-col mt-2 space-y-2">
                  <Label htmlFor="framework">PhoneNumber</Label>
                  <Input
                    name="phonenumber"
                    className="p-5 bg-gray-200"
                    id="Phonenumber"
                    placeholder="Enter your Phone Number.."
                  />
                  {phonenumberError && (
                    <p className="text-red-700 text-left text-sm font-semibold">
                      {phonenumberError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-2 space-y-2">
                  <Label htmlFor="name">Password</Label>
                  <Input
                    name="password"
                    id="Password"
                    className="p-5 bg-gray-200"
                    placeholder="Enter Your Password.."
                  />
                  {passwordError && (
                    <p className="text-red-700 text-left text-sm font-semibold">
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-2 space-y-2">
                  <Label htmlFor="name">Confirm Password</Label>
                  <Input
                    name="confirmpassword"
                    id="ConfirmPassword"
                    className="p-5 bg-gray-200"
                    placeholder="Confirm Your Password.."
                  />
                  {confirmError && (
                    <p className="text-red-700 text-left text-sm font-semibold">
                      {confirmError}
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
      <div className="h-screen">
        <Image
          src={`https://source.unsplash.com/random/?tech&q=100&t=${Date.now()}`}
          className="h-full object-cover"
          width={900}
          height={490}
          alt="Images"
        />
      </div>
    </div>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
