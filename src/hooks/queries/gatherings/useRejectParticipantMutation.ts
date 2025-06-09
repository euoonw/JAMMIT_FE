import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectParticipant } from '@/lib/gatherings/gatherings';

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
      alert('참가 거절 처리되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', gatheringId],
      });
    },
    onError: (error) => {
      console.error('참가 거절 실패:', error);
      alert('참가 거절 중 오류가 발생했습니다.');
    },
  });
};
