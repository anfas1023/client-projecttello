import React from "react";
import { HiDocumentArrowUp } from "react-icons/hi2";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";

export function AttachementPreview({
  attachement,
  orginalName,
}: {
  attachement: string;
  orginalName: string;
}) {
  const renderPreview = (attachment: string, orginalName: string) => {
    if (orginalName.endsWith(".pdf")) {
      return (
        <embed
          src={attachment}
          width="500px"
          height="400px"
          className="rounded-lg ml-48"
        />
      );
    } else {
      return (
        <Image 
          alt="Preview"
          src={attachment}
          width={500}
          height={400}
          className="ml-48"
        />
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 mt-3 rounded-md cursor-pointer border h-10 w-4/5">
          <HiDocumentArrowUp />
          <p className="text-white">{orginalName}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[985px] bg-chat">
        <DialogHeader>{/* <DialogTitle>Preview</DialogTitle> */}</DialogHeader>
        <div className="grid gap-4 py-4">
          {renderPreview(attachement, orginalName)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
