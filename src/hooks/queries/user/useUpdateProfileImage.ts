import { putUpdateProfileImage } from '@/lib/mypage/updateprofileimage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });
};
