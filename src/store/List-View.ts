import { create } from 'zustand';

export type taskType = {
  status: string;
  assigne: string[];
  startDate: string;
  endDate: string;
  priority: string;
  owner_id: string;
  taskname: string;
};



export type useTaskType = {
  task: taskType;
  setStatus: (status: string) => void;
  setAssigne: (assigne: string[]) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setPriority: (priority: string) => void;
  setOwnerId: (owner_id: string) => void;
  setTaskName: (taskname: string) => void;
};

const useListTaskStore = create<useTaskType>((set) => ({
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
  setAssigne: (emails) => set((state) => {
    const assigne = Array.isArray(emails) ? emails : [emails];
    return { task: { ...state.task, assigne } };
  }),
  setStartDate: (startDate) => set((state) => ({ task: { ...state.task, startDate } })),
  setEndDate: (endDate) => set((state) => ({ task: { ...state.task, endDate } })),
  setPriority: (priority) => set((state) => ({ task: { ...state.task, priority } })),
  setOwnerId: (owner_id) => set((state) => ({ task: { ...state.task, owner_id } })),
  setTaskName: (taskname) => set((state) => ({ task: { ...state.task, taskname } })),
}));

export default useListTaskStore;
