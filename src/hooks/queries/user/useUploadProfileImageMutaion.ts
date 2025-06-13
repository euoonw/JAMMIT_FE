import { uploadProfileImage } from '@/lib/user/user';
import { useMutation } from '@tanstack/react-query';

export const useUploadProfileImageMutation = () => {
  return useMutation({
    mutationFn: ({ userId, file }: { userId: number; file: File }) =>
      uploadProfileImage(userId, file),
  });
};
