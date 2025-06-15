import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '@/types/user';

interface UserState {
  user: UserResponse | null;
  isLoaded: boolean;
  isRefreshing: boolean;
  isLoggedIn: boolean;

  setUser: (user: UserResponse) => void;
  clearUser: () => void;
  startRefresh: () => void;
  endRefresh: () => void;
  setLoaded: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoaded: false,
      isRefreshing: false,

      setUser: (user) => set({ user, isLoggedIn: true }),
      clearUser: () => set({ user: null, isLoggedIn: false }),
      startRefresh: () => set({ isRefreshing: true }),
      endRefresh: () => set({ isRefreshing: false }),
      setLoaded: () => set({ isLoaded: true }),
    }),
    {
      name: 'user',
      onRehydrateStorage: () => () => {
        useUserStore.getState().setLoaded();
      },
    },
  ),
);
