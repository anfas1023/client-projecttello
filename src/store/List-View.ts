import { create } from 'zustand';

interface Assigne {
  userName: string;
  email: string;
  userId: string;
  role: string;
}

export type TaskType = {
  status: string;
  assigne: Assigne[];
  startDate: string;
  endDate: string;
  priority: string;
  owner_id: string;
  taskname: string;
};

export type UseTaskType = {
  task: TaskType;
  setStatus: (status: string) => void;
  addAssigne: (assigne: Assigne) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setPriority: (priority: string) => void;
  setOwnerId: (owner_id: string) => void;
  setTaskName: (taskname: string) => void;
};

const useListTaskStore = create<UseTaskType>((set) => ({
  task: {
    status: '',
    assigne: [],
    startDate: '',
    endDate: '',
    priority: '',
    owner_id: '',
    taskname: '',
  },
  setStatus: (status) => set((state) => ({ task: { ...state.task, status } })),
  addAssigne: (assigne) => set((state) => ({ task: { ...state.task, assigne: [...state.task.assigne, assigne] } })),
  setStartDate: (startDate) => set((state) => ({ task: { ...state.task, startDate } })),
  setEndDate: (endDate) => set((state) => ({ task: { ...state.task, endDate } })),
  setPriority: (priority) => set((state) => ({ task: { ...state.task, priority } })),
  setOwnerId: (owner_id) => set((state) => ({ task: { ...state.task, owner_id } })),
  setTaskName: (taskname) => set((state) => ({ task: { ...state.task, taskname } })),
}));

export default useListTaskStore;
