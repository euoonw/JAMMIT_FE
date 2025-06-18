import { deleteGathering } from '@/lib/gatherings/gatherings';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteGatheringMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGathering(id),
    onSuccess: (_, id) => {
      useToastStore.getState().show('모임이 성공적으로 취소되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['gatheringDetail', id] });
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', id],
      });
      queryClient.invalidateQueries({ queryKey: ['me', 'created'] });
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
    onError: (error) => {
      handleAuthApiError(error, '모임 삭제 중 오류가 발생했습니다.', {
        section: 'meeting',
        action: 'cancel_meeting',
      });
    },
  });
};
