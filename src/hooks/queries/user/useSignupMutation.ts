import { signup } from '@/utils/authService';
import { useMutation } from '@tanstack/react-query';

export const useSignupMutation = () =>
  useMutation({
    mutationFn: signup,
  });
