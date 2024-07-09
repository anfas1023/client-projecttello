import { create } from "zustand";

interface Attachment {
  attachment: string;
  originalName: string;
}

interface Assigne {
  userName: string;
  email: string;
  userId: string;
  role: string;
}

export type taskType = {
  _id: string;
  status: string;
  assignee: Assigne[];
  startDate: string;
  endDate: string;
  priority: "high" | "medium" | "low";
  owner_id: string;
  taskName: string;
  attachments:Attachment[];
  description: string;
  comments:{senderId:string,comment:string,commentId:string}[]
  randomId:string;
};

export type useTaskType = {
  Viewtask: taskType[];
  setStatus: (taskId: string, status: string) => void;
  setAssigne: (taskId: string, assigne: Assigne[]) => void;
  setStartDate: (taskId: string, startDate: string) => void;
  setEndDate: (taskId: string, endDate: string) => void;
  setPriority: (taskId: string, priority: "high" | "medium" | "low") => void;
  setOwnerId: (taskId: string, owner_id: string) => void;
  setTaskName: (taskId: string, taskname: string) => void;
  addTask: (task: taskType) => void;
  setTasks: (tasks: taskType[]) => void;
  addAttachments: (taskId: string, attachment: Attachment) => void;
  setDescription: (taskId: string, description: string) => void;
  updateTask: (task: taskType) => void;
  removeTask: (taskId: string) => void;
  sortTasksByPriority: (status:string) => void;
  sortByDueDate :(status:string) => void
  filterTasksByNameAndStatus: (searchString: string, status: string) => void;
  addComment:(data:{senderId:string,comment:string,commentId:string}[],taskId:string) => void;
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
  setTasks: (tasks) => set(() => ({ Viewtask: tasks })),
  addAttachments: (taskId: string, attachment: Attachment) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            attachments: [attachment, ...task.attachments],
          };
        } else {
          return task;
        }
      });
  
      return { Viewtask: updatedTasks };
    }),

  setDescription: (taskId, description) =>
    set((state) => {
      const updatedTask = state.Viewtask.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            description,
          };
        } else {
          return task;
        }
      });

      return { Viewtask: updatedTask };
    }),

  updateTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.Viewtask.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      );
      return { Viewtask: updatedTasks };
    }),

  removeTask: (taskId) =>
    set((state) => {
      const updatedTasks = state.Viewtask.filter((task) => task._id !== taskId);
      return { Viewtask: updatedTasks };
    }),

    sortTasksByPriority: (status) =>
      set((state) => {
        const priorityOrder = {
          high: 1,
          medium: 2,
          low: 3,
        };
  
        const filteredTasks = state.Viewtask.filter(task => task.status === status);
        const otherTasks = state.Viewtask.filter(task => task.status !== status);
  
        const sortedFilteredTasks = filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
        return { Viewtask: [...sortedFilteredTasks, ...otherTasks] };
      }),

      sortByDueDate: (status) =>
        set((state) => {
          const filteredTasks = state.Viewtask.filter((task) => task.status === status);
          const otherTasks = state.Viewtask.filter((task) => task.status !== status);
    
          const sortedFilteredTasks = filteredTasks.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    
          return { Viewtask: [...sortedFilteredTasks, ...otherTasks] };
        }),


        filterTasksByNameAndStatus: (searchString, status) =>
          set((state) => {
            const filteredTasks = state.Viewtask.filter(
              (task) =>
                task.status === status && task.taskName.toLowerCase().startsWith(searchString.toLowerCase())
            );
      
            const nonFilteredTasks = state.Viewtask.filter(
              (task) => task.status !== status
            );
      
            console.log("filteredTasks", filteredTasks);
            console.log("nonFilteredTasks", nonFilteredTasks);
      
            const allTasks = [...filteredTasks, ...nonFilteredTasks];
            return { Viewtask: allTasks };
          }),

          addComment:(comments,taskId) =>
            
            set((state)=>{
              console.log("commen",comments,taskId);
              const updatedTask = state.Viewtask.map((task) => {
                if (task._id === taskId) {
                  return {
                    ...task,
                    comments,
                  };
                } else {
                  return task;
                }
              });
        
              return { Viewtask: updatedTask };
            })
}));

export default useSetTask;
