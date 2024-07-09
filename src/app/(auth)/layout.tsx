"use client";

import { Toaster } from "@/components/ui/sonner";
import useBearerStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  let setuserId = useBearerStore((state) => state.setuserId);
  


  const userId = localStorage.getItem("email");
    setuserId(userId as string);
  useEffect(() => {
    if (userId) {
      console.log("onlayout",userId);   
      
      router.push("/dashboard");
    }
  }, [userId,router]); 

  return (
    <>
      {!userId ? (
        <>
          {children}
          <Toaster />
        </>
      ) : null}
    </>
  );
}
