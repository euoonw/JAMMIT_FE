import { cancelParticipateGathering } from '@/lib/gatherings/gatherings';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelParticipateGatheringMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gatheringId,
      participantId,
    }: {
      gatheringId: number;
      participantId: number;
    }) => cancelParticipateGathering(gatheringId, participantId),
    onSuccess: (data) => {
      useToastStore.getState().show(data.message);
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', data.gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', data.gatheringId],
      });
    },
    onError: (error) => {
      // console.error('참여 취소 실패:', error);
      handleAuthApiError(error, '참여 취소 중 문제가 발생했습니다.', {
        section: 'gather',
        action: 'cancel_gather',
      });
    },
  });
};
