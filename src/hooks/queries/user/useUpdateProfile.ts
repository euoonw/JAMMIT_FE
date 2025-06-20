import { putUpdateProfile } from '@/lib/mypage/updateprofile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../queryKeys';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
};
