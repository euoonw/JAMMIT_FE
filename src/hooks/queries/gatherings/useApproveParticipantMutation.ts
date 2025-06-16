import { approveParticipant } from '@/lib/gatherings/gatherings';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApproveParticipantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gatheringId,
      participantId,
    }: {
      gatheringId: number;
      participantId: number;
    }) => approveParticipant(gatheringId, participantId),
    onSuccess: (data, { gatheringId }) => {
      useToastStore.getState().show('참가가 승인되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
    onError: (error) => {
      // console.error('참가 승인 실패:', error);
      handleAuthApiError(error, '참가 승인 실패했습니다.', {
        section: 'gather',
        action: 'approval_gather',
      });
    },
  });
};
