import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentAccount, logout } from '@/lib/appwrite';
import type { Users } from '@/types/appwrite.d';

type AuthState = {
  user: Users | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: Users | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      initializeAuth: async () => {
        try {
          set({ isLoading: true, error: null });
          const account = await getCurrentAccount();
          if (account) {
            set({ user: account as Users, isAuthenticated: true });
          }
        } catch (error) {
          console.log('Not authenticated');
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        try {
          await logout();
          set({ user: null, isAuthenticated: false, error: null });
        } catch (error) {
          set({ error: 'Failed to sign out' });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
