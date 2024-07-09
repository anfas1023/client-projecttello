import React, { useState, ChangeEvent, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiDocumentArrowUp } from "react-icons/hi2";

export function AttachementPreview({
  attachement,
  orginalName,
}: {
  attachement: string;
  orginalName: string;
}) {
  const renderPreview = (attachment: string, orginalName: string) => {
    if (orginalName.endsWith(".pdf")) {
      // console.log("here");

      return (
        <embed
          src={attachment}
        
          type="application/pdf"
          width="500px"
          height="400px"
          className="rounded-lg ml-48"
        />
      );
    } else {
      return (
        <img
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
        {/* <Button variant="outline">Edit Profile</Button> */}
        {/* <img height={40} width={40} alt="Image" src={attachement} /> */}
        <div className="flex gap-2 mt-3  rounded-md cursor-pointer border h-10 w-4/5">
  <HiDocumentArrowUp />
  <p className="text-white">{orginalName}</p>
</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[985px] bg-chat">
        <DialogHeader>
          {/* <DialogTitle>Preview</DialogTitle> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <img
            alt="Preview"
            src={attachement}
            width={550}
            height={550}
            className=""
          /> */}
          {renderPreview(attachement, orginalName)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
