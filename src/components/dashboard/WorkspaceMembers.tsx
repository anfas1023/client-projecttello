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
import { WorkspaceStore } from "@/store";
import { MdOutlineOpenInNew } from "react-icons/md";
import WorkspaceMemberDeatails from "./MembersDeatils";

export function MemberDetails({ workspaceId }: { workspaceId: string }) {
  const Workspace = WorkspaceStore((state) => state.workspaces);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdOutlineOpenInNew
          size={30}
          className=" text-lime-600 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Workspace Members</DialogTitle>
          <DialogDescription>
            Here You can view Workspace Members and change the role
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Workspace.filter(
            (workspace) => workspace.workspaceId === workspaceId
          ).map((workspace) =>
            workspace.inviteMembers.map((member, index) => (
              <div className="flex flex-col   items-center">
                <WorkspaceMemberDeatails
                  member={member}
                  workspaceId={workspaceId}
                />
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
