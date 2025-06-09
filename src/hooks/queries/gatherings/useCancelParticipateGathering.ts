import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelParticipateGathering } from '@/lib/gatherings/gatherings';

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
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', data.gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', data.gatheringId],
      });
    },
    onError: (error) => {
      console.error('참여 취소 실패:', error);
      alert('참여 취소 중 문제가 발생했습니다.');
    },
  });
};
