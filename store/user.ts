import { create } from 'zustand';
import { Users } from '../types/appwrite.d';

type UserState = {
  user: Users;
  setUser: (user: Users) => void;
};

export const useUser = create<UserState>(set => ({
  user: {} as Users,
  setUser: user => set({ user }),
}));
