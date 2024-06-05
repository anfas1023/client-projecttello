"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation"

export default function Otp() {
  const router=useRouter()
  const [timer, setTimer] = useState<number>(30);
  const [otpValue, setOtpValue] = useState<string>("");

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleReset = async(e: React.MouseEvent<HTMLButtonElement>) => {
    setTimer(30);
    const email = localStorage.getItem("email");

    try{
  const response=await axios.post(`http://localhost:5000/resendotp`,{email})
  if(response){
    toast.success("Resend Otp Send To Mail", {
      position: "top-left",
    });
  }
  
    }catch(error){
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" })
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }

  };

  const handleCheckOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(otpValue);

    const email = localStorage.getItem("email");
    // console.log("email", email);
    let otp = otpValue;

    const data = {
      email,
      otp,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/otpverification`,
        data,{
          withCredentials:true
        }
      );

      if (response) {
        toast.success("OTP Verification completed login ", {
          position: "top-left",
        });

        localStorage.removeItem("email")

        router.push('/login')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpValue(e.target.value);
    // console.log(otpValue);
  };



  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="font-bold text-red-700 capitalize text-2xl text-center">
                ProjectTello
              </CardTitle>
              <CardDescription className="text-center py-6 text-xl">
                OTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroup>
    <InputOTPSlot onChange={(e) => handleChangeOtp(e)} index={0} />
    <InputOTPSlot onChange={(e) => handleChangeOtp(e)} index={1} />
    <InputOTPSlot onChange={(e) => handleChangeOtp(e)} index={2} />
    <InputOTPSlot onChange={(e) => handleChangeOtp(e)} index={3} />
  </InputOTPGroup>
</InputOTP> */}

              <input
                className=" border-black border-2"
                onChange={(e) => handleChangeOtp(e)}
                type="text"
              ></input>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-5 items-center">
              <Button onClick={handleCheckOtp} className="px-28 bg-blue-900">
                Verify
              </Button>
            </CardFooter>
            <div className="flex items-center justify-center">
              {timer > 0 ? (
                <p className="mb-5">OTP Timer :{timer}</p>
              ) : (
                <Button
                  onClick={handleReset}
                  className="px-20 bg-blue-900 mb-5"
                >
                  Resend
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
