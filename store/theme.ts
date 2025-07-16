import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'dark',
      toggleTheme: () => set({ currentTheme: get().currentTheme === 'dark' ? 'light' : 'dark' }),
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
