import { log } from "util";
import { create } from "zustand";

export type taskType = {
  _id: string;
  status: string;
  assignee: string[];
  startDate: string;
  endDate: string;
  priority: string;
  owner_id: string;
  taskName: string;
  attachments: string[];
  description:string
};

export type useTaskType = {
  Viewtask: taskType[];
  setStatus: (taskId: string, status: string) => void;
  setAssigne: (taskId: string, assigne: string[]) => void;
  setStartDate: (taskId: string, startDate: string) => void;
  setEndDate: (taskId: string, endDate: string) => void;
  setPriority: (taskId: string, priority: string) => void;
  setOwnerId: (taskId: string, owner_id: string) => void;
  setTaskName: (taskId: string, taskname: string) => void;
  addTask: (task: taskType) => void;
  removeTask: (taskId: string) => void;
  setTasks: (tasks: taskType[]) => void;
  addAttachments: (taskId: string, attachment: string) => void;
  setDescription:(taskId:string,description:string) =>void
};

const useSetTask = create<useTaskType>((set) => ({
  Viewtask: [],
  setStatus: (taskId, status) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, status } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setAssigne: (taskId, assigne) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, assigne } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setStartDate: (taskId, startDate) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, startDate } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setEndDate: (taskId, endDate) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, endDate } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setPriority: (taskId, priority) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, priority } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setOwnerId: (taskId, owner_id) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, owner_id } : task
      );
      return { Viewtask: updatedTasks };
    }),
  setTaskName: (taskId, taskname) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === taskId ? { ...task, taskname } : task
      );
      return { Viewtask: updatedTasks };
    }),
  addTask: (task) => set((state) => ({ Viewtask: [...state.Viewtask, task] })),
  removeTask: (taskId) =>
    set((state) => {
      const updatedTasks = state.Viewtask.filter((task) => task._id !== taskId);
      return { Viewtask: updatedTasks };
    }),
  setTasks: (tasks) => set(() => ({ Viewtask: tasks })),
  addAttachments: (taskId, attachment) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) => {
        if (task._id === taskId) {
          return {
           ...task,
            attachments: [attachment,...task.attachments],
          };
        } else {
          return task;
        }
      });
  
      console.log("Before state update:", state);
      console.log("updatedTasks", updatedTasks);
  
      const newState = { Viewtask: updatedTasks };
  
      console.log("New state:", newState);
  
      return newState;
    }),

    setDescription :(taskId, description) =>
      set((state) => {
        const updatedTask=state.Viewtask.map((task)=>{
          if(task._id===taskId){
            return {
              ...task,description
            }
          }else{
            return task
          }
        })

        return {Viewtask:updatedTask}
      }),
  
}));

export default useSetTask;
