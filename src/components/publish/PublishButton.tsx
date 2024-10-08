import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import publish from "../../../public/images/document.png";
import copyIcon from "../../../public/images/copy.png";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";

export function PublishButton({
  workspaceId,
  folderId,
  boardId,
}: {
  workspaceId: string;
  folderId: string;
  boardId: string;
}) {

  const [isPublished, setIsPublished] = useState(false);
  const copyToClipboard = useCallback(() => {
    const url = `https://www.work-way.site/preview/${workspaceId}/${folderId}/${boardId}`
    navigator.clipboard
      .writeText(url)
      .then(() => {
    toast.success("Link copy To clipboard",{position:"top-right",  className: "my-custom-toast-class"})
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, [workspaceId, folderId, boardId]);

  const handlePublish = () => {
    setIsPublished(true);


    toast.success("Published",{position:"bottom-left"})
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
             <button className="rounded-lg text-white px-4 py-2 hover:bg-sky-200 hover:text-black flex items-center">
          {isPublished ? "Copy Link" : "Publish"}
          <Image
            className="ml-2"
            src={publish}
            alt="publish"
            width={20}
            height={20}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-chat border-0">
        <DialogHeader>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src={publish} height={30} className="mx-auto" width={30} alt="" />
          <p className="text-white font-bold font-sans text-center">Publish This Note</p>
          <p className="text-white font-medium text-center">You can share your work</p>
          <div className="mx-auto mb-4">
            {isPublished ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`http://localhost:3000/preview/${workspaceId}/${folderId}/${boardId}`}
                  className="text-black px-2 py-1 border rounded-lg w-full"
                />
                <button onClick={copyToClipboard} className="bg-white p-2 rounded-lg">
                 <FaRegCopy />
                </button>
              </div>
            ) : (
              <button
                className="text-black font-normal bg-white px-[120px] py-2 rounded-lg"
                onClick={handlePublish}
              >
                Publish
              </button>
            )}
          </div>
        </div>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
