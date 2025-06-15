import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/lib/review/review';
import { PostReviewRequest } from '@/types/review';

export const usePostReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewRequest) => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
    },
  });
};
