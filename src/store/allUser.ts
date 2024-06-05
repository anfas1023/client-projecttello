import { create } from 'zustand';

type User = {
  email: string;
};

type UserStore = {
  user: User[];
  addUser: (email: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: [],
  addUser: (email) =>
    set((state) => {
      // Check if the user already exists
      const userExists = state.user.some((user) => user.email === email);
      // If user doesn't exist, add it
      if (!userExists) {
        return { user: [...state.user, { email }] };
      }
      // If user already exists, return the existing state without modification
      return state;
    }),
}));

export default useUserStore;
