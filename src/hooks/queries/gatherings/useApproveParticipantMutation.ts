import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveParticipant } from '@/lib/gatherings/gatherings';

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
      alert('참가가 승인되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', gatheringId],
      });
    },
    onError: (error) => {
      console.error('참가 승인 실패:', error);
      alert('참가 승인 중 오류가 발생했습니다.');
    },
  });
};
