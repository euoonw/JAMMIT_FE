import { useToastStore } from '@/stores/useToastStore';

export const handleAuthApiError = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) {
    useToastStore.getState().show(error.message);
  } else {
    useToastStore.getState().show(fallbackMessage);
  }
};
