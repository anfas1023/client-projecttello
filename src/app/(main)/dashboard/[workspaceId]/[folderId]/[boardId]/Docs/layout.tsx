
import "../../../../../../../components/TextEditor/Editor.module.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Liveblocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

  <>
      <Toaster />
        <Suspense>{children}</Suspense>
        </>
  );
}