"use client";

import { Toaster } from "@/components/ui/sonner";
import useBearerStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setuserId = useBearerStore((state) => state.setuserId);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("email");
    userIdRef.current = userId;
    if (userId) {
      setuserId(userId);
      console.log("onlayout", userId);
      router.push("/dashboard");
    }
  }, [setuserId, router]);

  return (
    <>
      {!userIdRef.current ? (
        <>
          {children}
          <Toaster />
        </>
      ) : null}
    </>
  );
}
