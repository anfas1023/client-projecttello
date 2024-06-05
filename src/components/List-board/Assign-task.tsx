import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useUserStore from "@/store/allUser";
import axios from "axios";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox";
import useTaskStore from "@/store/Task";

export function AssignTask() {
  const addUser = useUserStore((state) => state.addUser);
  const user = useUserStore((store) => store.user);
  const assigne = useTaskStore((state) => state.task.assigne);
  const setAssignedTasks = useTaskStore((state) => state.setAssigne);
  const handleAllUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/workspace/allUser`
      );
      // console.log("response.data", response.data);

      if (response) {
        response.data.forEach((user: any) => {
          console.log(user.email);
          addUser(user.email);
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error");
      }
    }
  };

  const handleAssign = (
    email: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    // console.log("isChecked", isChecked);
    if (isChecked) {
      setAssignedTasks(email);
    } else {
      setAssignedTasks(email);
    }
  };

  // console.log("assigne",assigne);

  // console.log("user", user);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p onClick={handleAllUsers}>
          <AiOutlineUsergroupAdd className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-center leading-none">
              Available Users Add
            </h4>
            {user.map((user: { email: string }, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox" 
                  onChange={(event) => handleAssign(user.email, event)}
                />
                <p className="text-black"> {user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
