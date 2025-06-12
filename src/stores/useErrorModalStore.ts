import { create } from 'zustand';

interface ErrorModalState {
  message: string;
  isOpen: boolean;
  open: (message: string) => void;
  close: () => void;
}

export const useErrorModalStore = create<ErrorModalState>((set) => ({
  message: '',
  isOpen: false,
  open: (message) => set({ message, isOpen: true }),
  close: () => set({ message: '', isOpen: false }),
}));
