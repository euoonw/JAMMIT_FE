import { postParticipateGatherings } from '@/lib/gatherings/gatherings';
import { BandSessionType } from '@/types/tags';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ParticipateGatheringParams {
  id: number;
  bandSession: BandSessionType;
  introduction: string;
}

export const useParticipateGatheringMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bandSession,
      introduction,
    }: ParticipateGatheringParams) =>
      postParticipateGatherings(id, bandSession, introduction),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['gatheringDetail', data.gatheringId],
      });
      queryClient.invalidateQueries({
        queryKey: ['gatheringParticipants', data.gatheringId],
      });
    },
    onError: (error) => {
      console.error('모임 참여 신청 실패:', error);
      alert('모임 참여 신청 중 문제가 발생했어요.');
    },
  });
};
