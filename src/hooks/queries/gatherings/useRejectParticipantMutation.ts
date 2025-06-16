import { rejectParticipant } from '@/lib/gatherings/gatherings';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRejectParticipantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gatheringId,
      participantId,
    }: {
      gatheringId: number;
      participantId: number;
    }) => rejectParticipant(gatheringId, participantId),
    onSuccess: (data, { gatheringId }) => {
      useToastStore.getState().show('참가 거절 처리되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', gatheringId],
      });
    },
    onError: (error) => {
      // console.error('참가 거절 실패:', error);
      handleAuthApiError(error, '참가 거절 중 오류가 발생했습니다.', {
        section: 'gather',
        action: 'refuse_gather',
      });
    },
  });
};
