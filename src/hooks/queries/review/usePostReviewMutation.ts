import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/lib/review/review';
import { PostReviewRequest } from '@/types/review';

export const usePostReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewRequest) => postReview(data),
    onSuccess: () => {
      alert('리뷰가 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['getReviewWrite'] });
    },
    onError: (error) => {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록 중 문제가 발생했어요.');
    },
  });
};
