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
import { ImageBlock } from "@blocknote/core"
import Image from 'next/image'
export function ImagePreviewTask({previewImage}:{previewImage:string}) {
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
      <Image alt="Preview" src={previewImage} width={100} height={100} className="" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] bg-custom-zinc">
        <DialogHeader>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <Image alt="Preview" src={previewImage} width={550} height={550} className="" />
          
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
