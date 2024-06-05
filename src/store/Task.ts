import { create } from 'zustand';

export type taskType = {
  status: string;
  assigne: string[];
  startDate: Date;
  endDate: Date;
  priority: string;
  owner_id: string;
  taskname: string;
};



export type useTaskType = {
  task: taskType;
  setStatus: (status: string) => void;
  setAssigne: (assigne: string) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setPriority: (priority: string) => void;
  setOwnerId: (owner_id: string) => void;
  setTaskName: (taskname: string) => void;
};

const useTaskStore = create<useTaskType>((set) => ({
  task: {
    status: '',
    assigne: [],
    startDate: new Date(),
    endDate: new Date(),
    priority: '',
    owner_id: '',
    taskname: '',
  },
  setStatus: (status) => set((state) => ({ task: { ...state.task, status } })),
  setAssigne: (email) => set((state) => {
    const assigne = state.task.assigne.includes(email)
      ? state.task.assigne.filter((assignedEmail) => assignedEmail !== email)
      : [...state.task.assigne, email];
    return { task: { ...state.task, assigne } };
  }),
  setStartDate: (startDate) => set((state) => ({ task: { ...state.task, startDate } })),
  setEndDate: (endDate:Date) => set((state) => ({ task: { ...state.task, endDate } })),
  setPriority: (priority) => set((state) => ({ task: { ...state.task, priority } })),
  setOwnerId: (owner_id) => set((state) => ({ task: { ...state.task, owner_id } })),
  setTaskName: (taskname) => set((state) => ({ task: { ...state.task, taskname } })),
}));

export default useTaskStore;
