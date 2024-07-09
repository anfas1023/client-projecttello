import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
type MemeberProps={
    email: string;
    role: string;
    userId: string;
    userName: string;
}

  const WorkspaceMemberDeatails=({member,workspaceId}:{member:MemeberProps,workspaceId:string})=>{
return (
    <Table>
  <TableCaption>List Of memebers</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Username</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">change role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">{member.userName}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>{member.role}</TableCell>
      <TableCell className="text-right">Change</TableCell>
    </TableRow>
  </TableBody>
</Table>

)
  }

  export default WorkspaceMemberDeatails