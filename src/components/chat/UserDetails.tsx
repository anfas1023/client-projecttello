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
import Image from "next/image";
import Avatar from "../../../public/images/man.png";
<Image alt="" src={Avatar} width={40} height={40} className="rounded-full" />;
export function UserDetails({ user }: { user: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">{user?.email}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chat">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            User Profile
          </DialogTitle>
          {/* <DialogDescription>Details of the selected user</DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            {user?.profilePhoto ? (
              <img
                src={user?.profilePhoto}
                alt="User Profile"
                className="rounded-full w-24 h-24"
              />
            ) : (
              <Image
                alt=""
                src={Avatar}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
          <div className="text-center">
            <p className="text-lg text-white font-semibold">
              Username:{user?.username}
            </p>
            <p className="text-white">Email:{user?.email}</p>
            <p className="text-white">PhoneNumber:{user?.phonenumber}</p>
          </div>
        </div>
        <DialogFooter>
          {/* Uncomment and add functionality if needed */}
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
