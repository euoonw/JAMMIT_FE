import { putUpdateProfileImage } from '@/lib/mypage/updateprofileimage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../queryKeys';

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
};
