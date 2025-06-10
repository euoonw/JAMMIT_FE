import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGathering } from '@/lib/gatherings/gatherings';

export const useDeleteGatheringMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGathering(id),
    onSuccess: (_, id) => {
      alert('모임이 성공적으로 취소되었습니다.');
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
      console.error('모임 취소 실패:', error);
      alert('모임 취소 중 오류가 발생했습니다.');
    },
  });
};
