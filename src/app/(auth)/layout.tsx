"use client";

import { Toaster } from "@/components/ui/sonner";
import useBearerStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userId = useBearerStore((state) => state.config.id);
  let setuserId = useBearerStore((state) => state.setuserId);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("email");
    setuserId(userId as string);
  }, []);

  useEffect(() => {
    if (userId) {
      router.push("/dashboard");
    }
  }, [userId]);

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
